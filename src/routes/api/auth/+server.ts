import { json } from '@sveltejs/kit';
import { dev } from '$app/environment';
import type { RequestHandler } from './$types';

/** Set the auth cookie after a successful OIDC login */
export const POST: RequestHandler = async ({ request, cookies }) => {
	const body = await request.json();
	const accessToken: string | undefined = body.access_token;

	if (!accessToken) {
		return json({ error: 'Missing access token' }, { status: 400 });
	}

	cookies.set('auth_token', accessToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: !dev,
		maxAge: 60 * 60 * 24 // 24 hours
	});

	return json({ success: true });
};

export const DELETE: RequestHandler = async ({ cookies }) => {
	cookies.delete('auth_token', { path: '/' });
	return json({ success: true });
};
