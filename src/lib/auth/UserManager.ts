import { UserManager, type UserManagerSettings } from 'oidc-client-ts';

const settings: UserManagerSettings = {
	authority: 'http://localhost/application/o/sfp-admin/', // SHOULD BE HTTPS IN production
	client_id: 'H05hj25LtVS2HevWxT0Imfk0nABd7phiWSHBvnNo',
	redirect_uri: 'http://localhost:3000/callback',
	response_type: 'code',
	scope: 'openid profile email',
	post_logout_redirect_uri: 'http://localhost:3000/'
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
