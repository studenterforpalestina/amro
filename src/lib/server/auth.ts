import { PUBLIC_OAUTH_USERINFO_ENDPOINT } from '$env/static/public';
import type { RequestEvent } from '@sveltejs/kit';

export type AuthUser = {
	preferred_username?: string;
	[key: string]: unknown;
};

export async function requireAuth(event: RequestEvent) {
	const access_token = event.cookies.get('auth_token');
	let user: AuthUser | null = null;

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
			throw new Error('Failed to fetch user info: ' + response.statusText);
		}

		user = (await response.json()) as AuthUser;
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
