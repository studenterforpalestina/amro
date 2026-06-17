import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';
import { getFacebookEvents } from '$lib/utils/cacheFacebookEvents';

const ansi_header = `
                g▄
         r▄  g█████  r▄                
      r███r▌  g█████  r██            Studenter for
    r█████  g██████  r███r▌          Palestina Trondheim
  r██████  g▐g█████  r██████
 r▐r██████  g█████g▌ r▐r███████        Vi er en studentorganisasjon dedikert
 r█████r▌  g██████g▌ r▐r███████r▌       til å øke bevisstheten om det 
 r▐r███r▌ g▐g███████g▌ r▐r███████        palestinske folkets kamp for frihet,
  r▐r███r▌  g██████g▌ r▐r██████         rettferdighet og selvbestemmelse.
    r▐r███  g█████  r█████
      r▐r██  g████  r███
        r▀    g██  r▀  
              g▌
`;

export const GET: RequestHandler = async ({ request }) => {
	const userAgent = request.headers.get('User-Agent') || '';
	if (!userAgent.includes('curl')) {
		redirect(303, '/');
	}
	const ansiLogo = ansi_header
		.replace(/r([█▀▄▌▐]+)/g, '\x1b[31m$1\x1b[0m')
		.replace(/g([█▀▄▌▐]+)/g, '\x1b[32m$1\x1b[0m');
	const { events } = await getFacebookEvents();
	const eventList = events.slice(0, 3);
	const boxWidth = 60;
	let eventsText = '\x1b[32m╭───── Upcoming Events: ───────────────────────────────────╮ \x1b[0m\n';
	if (eventList.length === 0) {
		eventsText +=
			'\x1b[32m│\x1b[0m No upcoming events found. Please check back later! \x1b[32m│\x1b[0m\n';
	} else {
		for (const event of eventList) {
			const dateStr = event.start_time.toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			});
			let eventString = `${dateStr} \x1b[36m•\x1b[0m ${event.name}`;
			eventString = eventString.padEnd(boxWidth + 5, ' ');
			eventsText += `\x1b[32m│\x1b[0m ${eventString} \x1b[32m│\x1b[0m\n`;
			const timeAndPlaceStr = `    \x1b[2m${event.start_time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} at ${event.place || 'TBA'}\x1b[0m`;
			const timeAndPlaceLine = `\x1b[32m│\x1b[0m ${timeAndPlaceStr.padEnd(boxWidth + 4, ' ')} \x1b[32m│\x1b[0m\n`;
			eventsText += timeAndPlaceLine;
		}
	}
	eventsText += '\x1b[32m╰──────────────────────────────────────────────────────────╯\x1b[0m';
	return new Response(`${ansiLogo}\n${eventsText}\n`, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
};
