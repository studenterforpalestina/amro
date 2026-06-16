import { sql } from 'bun';
const FB_APP_ID = '1897990914127322';
const FB_APP_SECRET = process.env.FB_APP_SECRET;
if (!FB_APP_SECRET) {
	throw new Error('FB_APP_SECRET environment variable is not set');
}
const [{ token: FB_TOKEN }] = await sql`
	SELECT token
	FROM "FacebookToken"
	WHERE id = 1
`;
if (!FB_TOKEN) {
	throw new Error(
		'No existing token found in database. Please run the migration script to create the "FacebookToken" table and insert the initial token.'
	);
}

const url = new URL('https://graph.facebook.com/v25.0/oauth/access_token');
url.search = new URLSearchParams({
	grant_type: 'fb_exchange_token',
	client_id: FB_APP_ID,
	client_secret: FB_APP_SECRET ?? '',
	fb_exchange_token: FB_TOKEN
}).toString();

const res = await fetch(url, {
	headers: {
		Accept: 'application/json'
	}
});
if (!res.ok) {
	const error = await res.json();
	console.error('Error refreshing Facebook token:', error);
	throw new Error(error.error?.message ?? res.statusText);
}

const { access_token, expires_in } = await res.json();
console.log(`New token expires in ${expires_in} seconds`);
await sql`
		UPDATE "FacebookToken"
  		SET token = ${access_token},
    		"updatedAt" = now()
  		WHERE id = 1
	`;
console.log('Token refreshed successfully');
