import { type Event } from '$lib/utils/eventParser';
import type { PageServerLoad } from './$types';
import { getFacebookEvents } from '$lib/utils/cacheFacebookEvents';

const MAX_UPCOMING_EVENTS = 3;

export const load: PageServerLoad = async () => {
	try {
		const { events } = await getFacebookEvents();
		const now = new Date();
		const upcoming = (events as Event[])
			.filter((e) => e.start_time >= now)
			.sort((a, b) => a.start_time.getTime() - b.start_time.getTime())
			.slice(0, MAX_UPCOMING_EVENTS);
		return { events: upcoming };
	} catch (error) {
		console.error(
			'Error loading events for homepage:',
			error instanceof Error ? error.message : error
		);
		return { events: [] as Event[] };
	}
};
