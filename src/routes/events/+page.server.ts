import { type Event, parseEvents } from "$lib/utils/eventParser";
import type { PageServerLoad } from "./$types";
import { FB_ACCESS_TOKEN } from "$env/static/private";

export const load: PageServerLoad = async () => {
  const pageID = 109908495259354;
  const accessToken = FB_ACCESS_TOKEN;
  const apiURL = `https://graph.facebook.com/v24.0/${pageID}/events?access_token=${accessToken}&limit=10`;

  try {
    const res = await fetch(apiURL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch events:", res.status, res.statusText);
      throw new Error("Failed to fetch events");
    }

    const data = await res.json();
    console.log("Fetched event data:", data);
    const events: Event[] = parseEvents(data);

    // Sort events by start date, earliest first
    events.sort((a, b) => a.start_time.getTime() - b.start_time.getTime());

    // Filter out events that have already passed
    const upcomingEvents = events.filter(
      (event) =>
        event.start_time >= new Date() ||
        (event.end_time && event.end_time >= new Date()),
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
