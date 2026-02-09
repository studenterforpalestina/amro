import { FB_ACCESS_TOKEN } from '$env/static/private';
import { type Event, parseEvents } from '$lib/utils/eventParser';
const FB_PAGE_ID = '109908495259354';
const EVENTS_LIMIT = 10;

export async function fetchFacebookEvents() {
	if (!FB_ACCESS_TOKEN) {
		console.error('Missing Facebook access token.');
		return { events: [] };
	}
	const apiURL = new URL(`https://graph.facebook.com/v24.0/${FB_PAGE_ID}/events`);
	apiURL.search = new URLSearchParams({
		access_token: FB_ACCESS_TOKEN,
		fields: 'id,name,description,start_time,end_time,place',
		limit: EVENTS_LIMIT.toString()
	}).toString();

	try {
		const res = await fetch(apiURL, {
			headers: {
				Accept: 'application/json'
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

		// Filter out events that have passed, allowing an hour grace period
		const upcomingEvents = events.filter(
			(event) =>
				event.start_time >= new Date(now.getTime() + 60 * 60 * 1000) ||
				(event.end_time && event.end_time >= now)
		);

		return {
			events: upcomingEvents
		};
	} catch (error) {
		const err = error instanceof Error ? error : new Error('Unknown error while loading events');
		console.error('Error loading events:', err.message);
		return {
			events: []
		};
	}
}
