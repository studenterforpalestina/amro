import { type Event } from '$lib/utils/eventParser';
import type { PageServerLoad } from './$types';
import { getFacebookEvents } from '$lib/utils/cacheFacebookEvents';
export const load: PageServerLoad = async () => {
	try {
		const { events } = await getFacebookEvents();
		return {
			events: events as Event[]
		};
	} catch (error) {
		console.error('Error loading events:', error instanceof Error ? error.message : error);
		return {
			events: []
		};
	}
};
