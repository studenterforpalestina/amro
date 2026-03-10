import { sql } from 'bun';
import type { PageServerLoad, Actions, RequestEvent } from './$types';
import { PUBLIC_OAUTH_USERINFO_ENDPOINT } from '$env/static/public';
import { redirect } from '@sveltejs/kit';

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
		const id = formData.get('id');

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

		const id = formData.get('id')?.toString();
		if (!id) return { success: false, message: 'Missing ID' };

		const updates = {
			name: formData.get('name')?.toString(),
			email: formData.get('email')?.toString(),
			phoneNumber: formData.get('phoneNumber')?.toString(),
			birthYear: parseInt(formData.get('birthYear')?.toString() || '0') || null,
			graduationYear: parseInt(formData.get('graduationYear')?.toString() || '0') || null,
			updatedAt: new Date()
		};

		try {
			await sql`
                UPDATE "Member"
                SET ${sql(updates, 'name', 'email', 'phoneNumber', 'birthYear', 'graduationYear', 'updatedAt')}
                WHERE id = ${id}
            `;

			return { success: true };
		} catch (err) {
			console.error('Update failed:', err);
			return { success: false, error: 'Database update failed' };
		}
	}
};
