import { sql } from 'bun';
import { env } from 'bun';

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
		await sendGraduationConfirmationEmail(member.email, confirmationToken.id, siteOrigin);
		console.log(`Sent graduation confirmation email to ${member.email}`);
	}
	console.log(`Processed ${expectedGraduatedMembers.length} members for graduation confirmation.`);
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

	if (!env.LISTMONK_API_USER || !env.LISTMONK_API_KEY) {
		console.warn('Listmonk API credentials are not set. Newsletter subscriptions will be skipped.');
		return;
	}
	const response = await fetch('https://listmonk.studenterforpalestina.no/api/tx', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `token ${env.LISTMONK_API_USER}:${env.LISTMONK_API_KEY}`
		},

		body: JSON.stringify({
			subscriber_email: email,
			template_id: 9,
			subscriber_mode: 'fallback',
			content_type: 'html',
			data: {
				url: confirmationUrl.toString()
			}
		})
	});
	if (!response.ok) {
		console.error('Failed to send welcome email:', await response.text());
	}
	return response.ok;
}

await askGraduationConfirmation();
await cleanGraduationConfirmationTokens();
await cleanMemberList();
