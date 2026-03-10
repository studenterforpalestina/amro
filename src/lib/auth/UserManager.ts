import { UserManager, type UserManagerSettings } from 'oidc-client-ts';
import {
	PUBLIC_OAUTH_CLIENT_AUTHORITY,
	PUBLIC_OAUTH_CLIENT_ID,
	PUBLIC_OAUTH_REDIRECT_URI,
	PUBLIC_OAUTH_POST_LOGOUT_REDIRECT_URI
} from '$env/static/public';

const settings: UserManagerSettings = {
	authority: PUBLIC_OAUTH_CLIENT_AUTHORITY,
	client_id: PUBLIC_OAUTH_CLIENT_ID,
	redirect_uri: PUBLIC_OAUTH_REDIRECT_URI,
	response_type: 'code',
	scope: 'openid profile email',
	post_logout_redirect_uri: PUBLIC_OAUTH_POST_LOGOUT_REDIRECT_URI
};

export const userManager = new UserManager(settings);

export async function login() {
	return userManager.signinRedirect();
}

export async function logout() {
	await userManager.removeUser();
	window.location.href = 'http://localhost/if/flow/default-invalidation-flow/';
}

export async function getUser() {
	return userManager.getUser();
}

userManager.events.addUserLoaded(async (user) => {
	await fetch('/api/auth/session', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ access_token: user.access_token })
	});
});
userManager.events.addAccessTokenExpired(async () => {
	await fetch('/api/auth/session', { method: 'DELETE' });
});
userManager.events.addUserSignedOut(async () => {
	await fetch('/api/auth/session', { method: 'DELETE' });
	window.location.href = '/';
});
