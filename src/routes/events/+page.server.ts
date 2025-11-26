import { type CalendarEvent, parseICS } from "$lib/utils/cal_parser";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
	const icsUrl =
		"https://www.facebook.com/events/ical/upcoming/?uid=100087592323689&key=HRCIaM2bnjhaBXgd";

	try {
		const res = await fetch(icsUrl, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
			},
		});

		if (!res.ok) {
			console.error("Failed to fetch events:", res.status, res.statusText);
			throw new Error("Failed to fetch events");
		}

		const icsText = await res.text();
		const events: CalendarEvent[] = parseICS(icsText);

		// Sort events by start date, earliest first
		events.sort((a, b) => a.start.getTime() - b.start.getTime());

		// Filter out events that have already passed
		const upcomingEvents = events.filter(
			(event) => event.end.getTime() > Date.now(),
		);

		return {
			events: upcomingEvents,
		};
	} catch (error) {
		console.error("Error loading calendar events:", error);
		return {
			events: [],
		};
	}
};
