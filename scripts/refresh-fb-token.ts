import { env } from '$env/dynamic/private';
const FB_PAGE_ID = '109908495259354';
const FB_ACCESS_TOKEN = env.FB_ACCESS_TOKEN;

const url = new URL('https://graph.facebook.com/v19.0/oauth/access_token');
url.search = new URLSearchParams({
	grant_type: 'fb_exchange_token',
	client_id: env.FB_APP_ID,
	client_secret: env.FB_APP_SECRET,
	fb_exchange_token: FB_ACCESS_TOKEN || ''
}).toString();

try {
	const res = await fetch(url, {
		headers: {
			Accept: 'application/json'
		}
	});
	if (!res.ok) {
		const errorPayload = await res.json();
		console.error('API Error Details:', JSON.stringify(errorPayload, null, 2));
		throw new Error(`API Error: ${errorPayload.error?.message || res.statusText}`);
	}
	const data = await res.json();
	process.env.FB_ACCESS_TOKEN = data.access_token;
} catch (error) {
	const err = error instanceof Error ? error : new Error('Unknown error while refreshing token');
	console.error('Error refreshing token:', err.message);
}
