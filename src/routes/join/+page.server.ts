import { sql } from 'bun';
import type { Actions } from './$types';

const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const PHONE_REGEX = /^[+0-9() -]{8,20}$/;

export const actions: Actions = {
	join: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const phone = formData.get('phone') as string;
		const birthYear = formData.get('birthYear') as number;
		const graduationYear = formData.get('graduationYear') as number;
		const newsletter = formData.get('newsletter') === 'on';
		const errors: Record<string, string> = {};

		if (!name) {
			errors.name = 'Name is required.';
		}

		if (!email) {
			errors.email = 'Email is required.';
		} else if (!EMAIL_REGEX.test(email)) {
			errors.email = 'Invalid email format.';
		}

		if (!phone) {
			errors.phone = 'Phone number is required.';
		} else if (!PHONE_REGEX.test(phone)) {
			errors.phone = 'Invalid phone number format.';
		}

		if (!birthYear) {
			errors.birthYear = 'Birth year is required.';
		}

		if (!graduationYear) {
			errors.graduationYear = 'Graduation year is required.';
		}

		if (Object.keys(errors).length > 0) {
			return {
				success: false,
				errors
			};
		}

		try {
			await sql`
                INSERT INTO "Member" (name, email, phone, "birthYear", "graduationYear", newsletter)
                VALUES (${name}, ${email}, ${phone}, ${birthYear}, ${graduationYear}, ${newsletter})
            `;
		} catch (error) {
			console.error('Error inserting member:', error);
			return {
				success: false,
				errors: {
					form: 'An error occurred while processing your membership. Please try again later.'
				}
			};
		}
		if (newsletter) {
			// TODO: Add email to newsletter list
		}

		return {
			success: true
		};
	}
};
