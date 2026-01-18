import { type Event, parseEvents } from '$lib/utils/eventParser';
import type { PageServerLoad } from './$types';
import { FB_ACCESS_TOKEN } from '$env/static/private';

const FB_PAGE_ID = '109908495259354';
const EVENTS_LIMIT = 10;

export const load: PageServerLoad = async () => {
	if (!FB_ACCESS_TOKEN) {
		console.error('Missing Facebook access token.');
		return { events: [] };
	}

	const apiURL = new URL(`https://graph.facebook.com/v24.0/${FB_PAGE_ID}/events`);
	apiURL.search = new URLSearchParams({
		access_token: FB_ACCESS_TOKEN,
		limit: EVENTS_LIMIT.toString()
	}).toString();

	try {
		const res = await fetch(apiURL, {
			headers: {
				Accept: 'application/json',
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
			}
		});

		if (!res.ok) {
			console.error('Failed to fetch events:', res.status, res.statusText);
			throw new Error('Failed to fetch events');
		}

		const data = await res.json();
		const events: Event[] = parseEvents(data);
		const now = new Date();

		// Sort events by start date, earliest first
		events.sort((a, b) => a.start_time.getTime() - b.start_time.getTime());

		// Filter out events that have already passed
		const upcomingEvents = events.filter(
			(event) => event.start_time >= now || (event.end_time && event.end_time >= now)
		);

		return {
			events: upcomingEvents
		};
	} catch (error) {
		const err = error instanceof Error ? error : new Error('Unknown error while loading events');
		console.error('Error loading calendar events:', err.message);
		return {
			events: []
		};
	}
};
