import { GET as curlGET } from './curl/+server';
import type { RequestEvent } from '@sveltejs/kit';

export const GET = async (event: RequestEvent) => {
	const ua = event.request.headers.get('user-agent') ?? '';

	if (ua.includes('curl')) {
		return curlGET(event as Parameters<typeof curlGET>[0]);
	}

	return new Response('Homepage');
};
