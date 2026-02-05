import { sql } from 'bun';
import { fetchFacebookEvents } from './fetchFacebookEvents';
import { type Event } from '$lib/utils/eventParser';
const CACHE_KEY = 'events';
const TTL_MS = 60 * 60 * 1000; // 60 minutes

export async function getFacebookEvents() {
	const now = Date.now();
	const cached = await sql`
        SELECT payload, "fetchedAt"
        FROM "EventsCache"
        WHERE key = ${CACHE_KEY}
    `.then((res) => res[0]);

	if (cached) {
		const fetchedAt = new Date(cached.fetchedAt).getTime();
		if (now - fetchedAt < TTL_MS) {
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
