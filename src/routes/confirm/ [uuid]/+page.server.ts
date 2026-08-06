import { sql } from 'bun';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { uuid } = params;

	const [memberid] = await sql`
        SELECT "memberId" AS id
        FROM "GraduationConfirmationTokens"
        WHERE id = ${uuid}`;
	const [member] = await sql`
        SELECT *
        FROM "Member"
        WHERE id = ${memberid}`;
	return { member };
};

export const actions: Actions = {
	confirm: async ({ params }) => {
		const { uuid } = params;
		console.log('Confirming graduation for member with UUID:', uuid);
	}
};
