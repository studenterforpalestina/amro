import { sql } from 'bun';

// This script is intended to be run yearly, to handle members who have graduated and should be removed from the active member list.
async function askGraduationConfirmation() {
	const expectedGraduatedMembers = await sql`
		SELECT id, email
		FROM "Member"
		WHERE "graduationYear" = EXTRACT(YEAR FROM CURRENT_DATE)
		AND "isActive" = true
	`;
	const siteOrigin = new URL(
		process.env.PUBLIC_OAUTH_POST_LOGOUT_REDIRECT_URI ?? 'http://localhost:3000/'
	).origin;
	for (const member of expectedGraduatedMembers) {
		const [confirmationToken] = await sql`
			INSERT INTO "GraduationConfirmationTokens" ("memberId")
			VALUES (${member.id})
			RETURNING id
		`;
		await sql`
			UPDATE "Member"
			SET "isActive" = false, "updatedAt" = now()
			WHERE id = ${member.id}
		`;
		sendGraduationConfirmationEmail(member.email, confirmationToken.id, siteOrigin);
	}
}

async function cleanMemberList() {
	const deletedMembers =
		await sql`DELETE FROM "Member" WHERE "isActive" = false AND "updatedAt" < NOW() - INTERVAL '1 year' RETURNING id`;
	console.log(`Deleted ${deletedMembers.length} inactive members.`);
}
async function cleanGraduationConfirmationTokens() {
	const deletedTokens =
		await sql`DELETE FROM "GraduationConfirmationTokens" WHERE "createdAt" < NOW() - INTERVAL '1 year' RETURNING id`;
	console.log(`Deleted ${deletedTokens.length} expired graduation confirmation tokens.`);
}
async function sendGraduationConfirmationEmail(email: string, token: string, siteOrigin: string) {
	const confirmationUrl = new URL(`/confirm/${token}`, siteOrigin);
	// Implement email sending logic here
	console.log(
		`Sending graduation confirmation email to ${email} with link ${confirmationUrl.toString()}`
	);
}

await cleanGraduationConfirmationTokens();
await askGraduationConfirmation();
await cleanMemberList();
