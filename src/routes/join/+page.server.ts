import { sql } from 'bun';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const PHONE_REGEX = /^[+0-9() -]{8,20}$/;
const CURRENT_YEAR = new Date().getFullYear();

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString().trim() ?? '';
		const email = formData.get('email')?.toString().trim() ?? '';
		const phone = formData.get('phone')?.toString().trim() ?? '';
		const birthYear = Number(formData.get('birthYear'));
		const graduationYear = Number(formData.get('graduationYear'));
		const newsletter = formData.get('newsletter') === 'on';
		const errors: Record<string, string> = {};

		const formState = { name, email, phone, birthYear, graduationYear, newsletter };

		if (!name || !email || !phone || Number.isNaN(birthYear) || Number.isNaN(graduationYear)) {
			return fail(422, {
				...formState,
				errors: { form: 'page.join.errors.required_fields' }
			});
		}

		if (!EMAIL_REGEX.test(email)) {
			errors.email = 'page.join.errors.email_invalid';
		}

		if (!PHONE_REGEX.test(phone)) {
			errors.phone = 'page.join.errors.phone_invalid';
		}

		if (birthYear < 1900 || birthYear > CURRENT_YEAR) {
			errors.birthYear = 'page.join.errors.birth_year_invalid';
		}

		if (graduationYear < 1900 || graduationYear > CURRENT_YEAR + 10) {
			errors.graduationYear = 'page.join.errors.graduation_year_invalid';
		}

		if (Object.keys(errors).length > 0) {
			return fail(422, {
				...formState,
				errors
			});
		}

		try {
			await sql`
                INSERT INTO "Member" (name, email, "phoneNumber", "birthYear", "graduationYear", "isActive")
                VALUES (${name}, ${email}, ${phone}, ${birthYear}, ${graduationYear}, true)
            `;
		} catch (error: unknown) {
			const code = (error as { code?: string })?.code;
			if (code === '23505') {
				console.log('Duplicate email detected:', error);
				return fail(422, {
					...formState,
					email: '',
					errors: {
						email: 'page.join.errors.email_exists'
					}
				});
			}
			console.error('Error inserting member:', error);
			return fail(422, {
				...formState,
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
