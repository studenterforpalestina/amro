import { sql } from 'bun';
import type { PageServerLoad, Actions, RequestEvent } from './$types';
import { PUBLIC_OAUTH_USERINFO_ENDPOINT } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';

const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const PHONE_REGEX = /^[+0-9() -]{8,20}$/;
const CURRENT_YEAR = new Date().getFullYear();

async function requireAuth(event: RequestEvent) {
	const access_token = event.cookies.get('auth_token');
	let user = null;
	if (!access_token) {
		return user;
	}
	try {
		const response = await fetch(PUBLIC_OAUTH_USERINFO_ENDPOINT, {
			headers: {
				Authorization: `Bearer ${access_token}`
			}
		});
		if (!response.ok) {
			throw new Error('Failed to fetch user info');
		}
		user = await response.json();
	} catch (error) {
		console.error('User info fetch failed:', error);
		event.cookies.delete('auth_token', { path: '/' });
		return user;
	}
	if (!user) {
		event.cookies.delete('auth_token', { path: '/' });
		return user;
	}
	return user;
}

export const load: PageServerLoad = async (event) => {
	const user = await requireAuth(event);
	if (!user) {
		return { authenticated: false as const, members: [], user };
	}

	try {
		const members = await sql`
            SELECT id, name, "phoneNumber", "birthYear", "graduationYear", "isActive", email
            FROM "Member"
            WHERE "isActive" = true
            ORDER BY name ASC
        `;
		return { authenticated: true as const, members, user };
	} catch (error) {
		console.error('Database fetch failed:', error);
		return { authenticated: true as const, members: [], user };
	}
};

export const actions: Actions = {
	softDelete: async (event) => {
		const user = await requireAuth(event);
		if (!user) {
			throw redirect(302, '/');
		}
		const formData = await event.request.formData();
		const id = formData.get('id')?.toString();

		if (!id) return { success: false };

		try {
			await sql`
                UPDATE "Member"
                SET "isActive" = false, "updatedAt" = now()
                WHERE id = ${id}
            `;
			return { success: true };
		} catch (err) {
			console.error(err);
			return { success: false };
		}
	},
	editMember: async (event) => {
		const user = await requireAuth(event);
		if (!user) {
			throw redirect(302, '/');
		}
		const formData = await event.request.formData();
		const name = formData.get('name')?.toString() ?? '';
		const email = formData.get('email')?.toString() ?? '';
		const phone = formData.get('phoneNumber')?.toString().trim() ?? '';
		const birthYear = Number(formData.get('birthYear'));
		const graduationYear = Number(formData.get('graduationYear'));
		const errors: Record<string, string> = {};

		if (!name || !email || !phone || Number.isNaN(birthYear) || Number.isNaN(graduationYear)) {
			console.error(
				'Validation failed: Missing required fields',
				!name,
				!email,
				!phone,
				Number.isNaN(birthYear),
				Number.isNaN(graduationYear)
			);
			return fail(422, {
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
		if (Object.keys(errors).length > 0) {
			return fail(422, {
				errors
			});
		}

		const id = formData.get('id')?.toString();
		if (!id) return fail(400, { error: 'Missing member ID' });

		const updates = {
			name,
			email,
			phoneNumber: phone,
			birthYear,
			graduationYear,
			updatedAt: new Date()
		};

		try {
			await sql`
                UPDATE "Member"
                SET ${sql(updates, 'name', 'email', 'phoneNumber', 'birthYear', 'graduationYear', 'updatedAt')}
                WHERE id = ${id}
            `;
		} catch (error: unknown) {
			const errno = (error as { errno?: string })?.errno;
			if (errno === '23505') {
				console.error('Duplicate email detected:', error);
				return fail(422, {
					errors: {
						email: 'common.form.errors.email_exists'
					}
				});
			}
			console.error('Update failed:', error);
			return fail(500, {
				errors: { form: 'common.form.errors.update_failed' }
			});
		}
		return { success: true };
	}
};
