import type { Handle } from '@sveltejs/kit';
import { requireAuth } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	const user = await requireAuth(event);
	event.locals.user = user;
	event.locals.authorized = !!user;

	return resolve(event);
};