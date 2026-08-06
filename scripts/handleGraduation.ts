import { sql } from 'bun';

// This script is intended to be run yearly, to handle members who have graduated and should be removed from the active member list.
async function askGraduationConfirmation() {
	const expectedGraduatedMembers =
		await sql`SELECT id, email FROM "Member" WHERE "graduationYear" = EXTRACT(YEAR FROM CURRENT_DATE)`;
	for (const member of expectedGraduatedMembers) {
		const [confirmationToken] = await sql`
			INSERT INTO "GraduationConfirmationTokens" ("memberId")
			VALUES (${member.id})
			RETURNING id
		`;
		sendGraduationConfirmationEmail(member.email, confirmationToken.id);
	}
}

async function cleanMemberList() {
	const [deletedMembers] =
		await sql`DELETE FROM "Member" WHERE "isActive" = false AND "updatedAt" < NOW() - INTERVAL '1 year' RETURNING id`;
	console.log(`Deleted ${deletedMembers?.length} inactive members.`);
}
async function cleanGraduationConfirmationTokens() {
	const [deletedTokens] =
		await sql`DELETE FROM "GraduationConfirmationTokens" WHERE "createdAt" < NOW() - INTERVAL '1 year' RETURNING id`;
	console.log(`Deleted ${deletedTokens?.length} expired graduation confirmation tokens.`);
}
async function sendGraduationConfirmationEmail(email: string, token: string) {
	// Implement email sending logic here
	console.log(`Sending graduation confirmation email to ${email} with token ${token}`);
}

await cleanGraduationConfirmationTokens();
await askGraduationConfirmation();
await cleanMemberList();
