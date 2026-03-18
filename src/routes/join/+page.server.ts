import { sql } from 'bun';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { LISTMONK_API_KEY } from '$env/static/private';
import { dev } from '$app/environment';

const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const PHONE_REGEX = /^[+0-9() -]{8,20}$/;
const CURRENT_YEAR = new Date().getFullYear();
const ALLOWED_COMMITTEES = new Set(['none', 'event', 'design', 'it', 'writing', 'stand', 'action']);
const COMMITTEE_ZULIP_GROUP_IDS: Record<string, number> = {
	event: 1479776,
	design: 1479778,
	it: 1469866,
	writing: 1479779,
	stand: 1470380,
	action: 1479773
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString().trim() ?? '';
		const email = formData.get('email')?.toString().trim() ?? '';
		const phone = formData.get('phone')?.toString().trim() ?? '';
		const committeesRaw = formData
			.getAll('committees')
			.map((value) => value.toString().trim())
			.filter(Boolean);
		const hasNoneCommittee = committeesRaw.includes('none');
		const committees = hasNoneCommittee
			? committeesRaw.filter((value) => value !== 'none')
			: committeesRaw;
		const birthYear = Number(formData.get('birthYear'));
		const graduationYear = Number(formData.get('graduationYear'));
		const newsletter = formData.get('newsletter') === 'on';
		const errors: Record<string, string> = {};

		const formState = { name, email, phone, committees, birthYear, graduationYear, newsletter };

		if (
			!name ||
			!email ||
			!phone ||
			committeesRaw.length === 0 ||
			Number.isNaN(birthYear) ||
			Number.isNaN(graduationYear)
		) {
			return fail(422, {
				...formState,
				errors: { form: 'common.form.errors.required_fields' }
			});
		}

		if (!EMAIL_REGEX.test(email)) {
			errors.email = 'common.form.errors.email_invalid';
		}

		if (!PHONE_REGEX.test(phone)) {
			errors.phone = 'common.form.errors.phone_invalid';
		}

		if (birthYear < 1900 || birthYear > CURRENT_YEAR) {
			errors.birthYear = 'common.form.errors.birth_year_invalid';
		}

		if (graduationYear < 1900 || graduationYear > CURRENT_YEAR + 10) {
			errors.graduationYear = 'common.form.errors.graduation_year_invalid';
		}

		if (committeesRaw.some((committee) => !ALLOWED_COMMITTEES.has(committee))) {
			errors.committees = 'common.form.errors.required_fields';
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
			const errno = (error as { errno?: string })?.errno;
			if (errno === '23505') {
				console.log('Duplicate email detected:', error);
				return fail(422, {
					...formState,
					email: '',
					errors: {
						email: 'common.form.errors.email_exists'
					}
				});
			}
			console.error('Error inserting member:', error);
			return fail(422, {
				...formState,
				errors: {
					form: 'common.form.errors.submit_failed'
				}
			});
		}
		if (!dev) {
			// Subscribe to newsletter if opted in
			const listmonkResponse = await fetch(
				'https://listmonk.studenterforpalestina.no/api/subscribers',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `token ${LISTMONK_API_KEY}`
					},
					body: JSON.stringify({
						email: formState.email,
						name: formState.name,
						status: 'enabled',
						lists: newsletter ? [1, 3] : [3], //3 is the "All members" list, 1 is the newsletter list
						preconfirm_subscriptions: true
					})
				}
			);
			if (!listmonkResponse.ok) {
				console.error('Failed to subscribe to newsletter:', await listmonkResponse.text());
			}
			// Invite to Zulip
			const zulipResponse = await fetch(
				'https://studenterforpalestina.zulipchat.com/api/v1/invites',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Basic ${`amro-bot:${process.env.ZULIP_API_KEY}`}`
					},
					body: JSON.stringify({
						invitee_emails: [formState.email],
						group_ids: committees.map((committee) => COMMITTEE_ZULIP_GROUP_IDS[committee]),
						stream_ids: [],
						include_realm_default_subscriptions: true
					})
				}
			);
			if (!zulipResponse.ok) {
				console.error('Failed to invite to Zulip:', await zulipResponse.text());
			}
		}
		return {
			success: true
		};
	}
};
