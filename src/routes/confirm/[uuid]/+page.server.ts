import { error, fail } from '@sveltejs/kit';
import { sql } from 'bun';
import type { Actions, PageServerLoad } from './$types';

const CURRENT_YEAR = new Date().getFullYear();

export const load: PageServerLoad = async ({ params }) => {
	const { uuid } = params;

	const [member] = await sql`
		SELECT m.*
		FROM "GraduationConfirmationTokens" gct
		JOIN "Member" m ON m.id = gct."memberId"
		WHERE gct.id = ${uuid}
	`;

	if (!member) {
		throw error(404, 'Confirmation link not found.');
	}

	return { member, uuid };
};

export const actions: Actions = {
	default: async ({ params, request }) => {
		const { uuid } = params;
		const formData = await request.formData();
		const graduationYear = Number(formData.get('graduationYear'));

		if (
			!Number.isInteger(graduationYear) ||
			graduationYear < CURRENT_YEAR + 1 ||
			graduationYear > CURRENT_YEAR + 10
		) {
			return fail(422, {
				graduationYear,
				errors: {
					graduationYear: 'Please enter a valid future graduation year.'
				}
			});
		}

		const [token] = await sql`
			SELECT id, "memberId"
			FROM "GraduationConfirmationTokens"
			WHERE id = ${uuid}
		`;

		if (!token) {
			throw error(404, 'Confirmation link not found.');
		}

		await sql`
			UPDATE "Member" 
			SET "graduationYear" = ${graduationYear}, "isActive" = true, "updatedAt" = now()
			WHERE id = ${token.memberId}
		`;

		await sql`
			DELETE FROM "GraduationConfirmationTokens"
			WHERE id = ${uuid}
		`;

		return {
			success: true,
			graduationYear
		};
	}
};
