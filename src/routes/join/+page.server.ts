import { sql } from 'bun';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const PHONE_REGEX = /^[+0-9() -]{8,20}$/;

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const phone = formData.get('phone') as string;
		const birthYearRaw = formData.get('birthYear');
		const birthYear = typeof birthYearRaw === 'string' ? parseInt(birthYearRaw, 10) : null;
		const graduationYearRaw = formData.get('graduationYear');
		const graduationYear =
			typeof graduationYearRaw === 'string' ? parseInt(graduationYearRaw, 10) : null;
		const newsletter = formData.get('newsletter') === 'on';
		const errors: Record<string, string> = {};

		if (!name || !email || !phone || !birthYear || !graduationYear) {
			errors.form = 'page.join.errors.required_fields';
		}

		if (!EMAIL_REGEX.test(email)) {
			errors.email = 'page.join.errors.email_invalid';
		}

		if (!PHONE_REGEX.test(phone)) {
			errors.phone = 'page.join.errors.phone_invalid';
		}

		if (Object.keys(errors).length > 0) {
			return fail(422, {
				name,
				email,
				phone,
				birthYear,
				graduationYear,
				errors
			});
		}

		try {
			await sql`
                INSERT INTO "Member" (name, email, "phoneNumber", "birthYear", "graduationYear", "isActive")
                VALUES (${name}, ${email}, ${phone}, ${birthYear}, ${graduationYear}, true)
            `;
		} catch (error) {
			if (error instanceof Error && error.message.includes('duplicate key value')) {
				console.log('Duplicate email detected:', error);
				return fail(422, {
					name,
					phone,
					birthYear,
					graduationYear,
					errors: {
						email: 'page.join.errors.email_exists'
					}
				});
			}
			console.error('Error inserting member:', error);
			return fail(422, {
				name,
				email,
				phone,
				birthYear,
				graduationYear,
				errors: {
					form: 'page.join.errors.submit_failed'
				}
			});
		}
		if (newsletter) {
			// TODO: Add email to newsletter list
		}

		return {
			success: true
		};
	}
};
