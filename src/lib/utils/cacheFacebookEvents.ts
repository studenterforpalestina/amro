import { sql } from 'bun';
import { dev } from '$app/environment';
import { fetchFacebookEvents } from './fetchFacebookEvents';
import { type Event } from '$lib/utils/eventParser';
import { refreshFacebookEventPictures } from './refreshFacebookEventPics';
const CACHE_KEY = 'events';
const CACHE_LIFETIME_MS = 60 * 60 * 1000; // 60 minutes

export async function getFacebookEvents() {
	if (dev) {
		// Return dummy events
		return {
			events: [
				{
					id: '1',
					name: 'Dummy Event 1',
					description: 'This is a dummy event for development.',
					start_time: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
					end_time: new Date(Date.now() + 25 * 60 * 60 * 1000), // Tomorrow + 1 hour
					place: 'Gløshaugen'
				},
				{
					id: '2',
					name: 'Dummy Event 2',
					description: 'This is another dummy event for development.',
					start_time: new Date(Date.now() + 48 * 60 * 60 * 1000), // Day after tomorrow
					end_time: new Date(Date.now() + 49 * 60 * 60 * 1000), // Day after tomorrow + 1 hour
					place: 'Dragvoll'
				}
			]
		};
	}
	const now = Date.now();
	const [cached] = await sql`
        SELECT payload, "fetchedAt"
        FROM "EventsCache"
        WHERE key = ${CACHE_KEY}
    `;

	if (cached) {
		const fetchedAt = new Date(cached.fetchedAt).getTime();
		if (now - fetchedAt < CACHE_LIFETIME_MS) {
			return {
				events: cached.payload.events.map((event: Event) => ({
					...event,
					start_time: new Date(event.start_time),
					end_time: event.end_time ? new Date(event.end_time) : undefined
				}))
			};
		}
	}
	try {
		const freshData = await fetchFacebookEvents();
		await refreshFacebookEventPictures(freshData);
		await sql`
            INSERT INTO "EventsCache" (key, payload, "fetchedAt")
            VALUES (${CACHE_KEY}, ${freshData}, now())
            ON CONFLICT (key) DO UPDATE
            SET payload = EXCLUDED.payload,
                "fetchedAt" = EXCLUDED."fetchedAt";
        `;
		return freshData;
	} catch (error) {
		console.error('Error fetching fresh Facebook events:', error);
		if (cached) {
			return cached.payload;
		}
		throw new Error('Failed to fetch Facebook events and no valid cache available.');
	}
}
