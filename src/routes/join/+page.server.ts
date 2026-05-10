import { sql } from 'bun';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
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

const ALLOWED_SCHOOLS = new Set(['NTNU', 'DMMH', 'BI', 'Fotofagskolen', 'other']);

const parseText = (formData: FormData, key: string) => formData.get(key)?.toString().trim() ?? '';

const parseNumber = (formData: FormData, key: string) => Number(formData.get(key));

const submitToListmonk = async (name: string, email: string, newsletter: boolean) => {
	if (!env.LISTMONK_API_USER || !env.LISTMONK_API_KEY) {
		console.warn('Listmonk API credentials are not set. Newsletter subscriptions will be skipped.');
		return;
	}
	const response = await fetch('https://listmonk.studenterforpalestina.no/api/subscribers', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `token ${env.LISTMONK_API_USER}:${env.LISTMONK_API_KEY}`
		},
		body: JSON.stringify({
			email,
			name,
			status: 'enabled',
			lists: newsletter ? [1, 3] : [3], //List 1 is the newsletter, list 3 is the general list for all members
			preconfirm_subscriptions: true
		})
	});

	if (!response.ok) {
		console.error('Failed to subscribe to newsletter:', await response.text());
	}
};

const inviteToZulip = async (email: string, committees: string[]) => {
	if (!env.ZULIP_API_EMAIL || !env.ZULIP_API_KEY) {
		console.warn('Zulip API credentials are not set. Zulip invitations will be skipped.');
		return;
	}
	const groupIds = committees
		.map((committee) => COMMITTEE_ZULIP_GROUP_IDS[committee])
		.filter((value): value is number => value !== undefined);

	const response = await fetch('https://studenterforpalestina.zulipchat.com/api/v1/invites', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ` + btoa(env.ZULIP_API_EMAIL + ':' + env.ZULIP_API_KEY)
		},
		body: new URLSearchParams({
			invitee_emails: email,
			group_ids: JSON.stringify(groupIds),
			stream_ids: '[]',
			include_realm_default_subscriptions: 'true'
		})
	});
	if (!response.ok) {
		console.error('Failed to invite to Zulip:', await response.text());
	}
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = parseText(formData, 'name');
		const email = parseText(formData, 'email');
		const phone = parseText(formData, 'phone');
		const committees = formData
			.getAll('committees')
			.map((value) => value.toString().trim())
			.filter(Boolean);
		const selectedCommittees = committees.filter((committee) => committee !== 'none');
		const birthYear = parseNumber(formData, 'birthYear');
		const graduationYear = parseNumber(formData, 'graduationYear');
		const school = parseText(formData, 'school');
		const newsletter = formData.get('newsletter') === 'on';
		const errors: Record<string, string> = {};

		const formState = {
			name,
			email,
			phone,
			committees,
			birthYear,
			graduationYear,
			school,
			newsletter
		};

		if (
			!name ||
			!email ||
			!phone ||
			!school ||
			committees.length === 0 ||
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

		if (committees.some((committee) => !ALLOWED_COMMITTEES.has(committee))) {
			errors.committees = 'common.form.errors.required_fields';
		}

		if (!ALLOWED_SCHOOLS.has(school)) {
			errors.school = 'common.form.errors.required_fields';
		}

		if (Object.keys(errors).length > 0) {
			return fail(422, {
				...formState,
				errors
			});
		}

		try {
			await sql`
                INSERT INTO "Member" (name, email, "phoneNumber", "birthYear", "graduationYear", "school", "isActive")
                VALUES (${name}, ${email}, ${phone}, ${birthYear}, ${graduationYear}, ${school}, true)
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
			await Promise.all([
				submitToListmonk(formState.name, formState.email, newsletter),
				inviteToZulip(formState.email, selectedCommittees)
			]);
		}
		return {
			success: true
		};
	}
};
