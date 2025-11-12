export type CalendarEvent = {
	uid: string;
	summary: string;
	description: string;
	location: string;
	start: Date;
	end: Date;
	url: string;
	organizer?: string;
	lastModified?: Date;
};

function parseICalDate(dateStr: string): Date {
	try {
		const year = dateStr.substring(0, 4);
		const month = dateStr.substring(4, 6);
		const day = dateStr.substring(6, 8);
		const hour = dateStr.substring(9, 11);
		const minute = dateStr.substring(11, 13);
		const second = dateStr.substring(13, 15);
		const isUTC = dateStr.endsWith("Z");

		let isoStr = `${year}-${month}-${day}T${hour}:${minute}:${second}`;
		if (isUTC) {
			isoStr += "Z";
		}

		return new Date(isoStr);
	} catch (e) {
		console.error("Failed to parse date:", dateStr, e);
		return new Date(); // Return current date as a fallback
	}
}

export function parseICS(ics: string): CalendarEvent[] {
	const events: CalendarEvent[] = [];
	const lines = ics
		.replace(/\r/g, "") // Remove carriage returns
		.split("\n")
		.reduce<string[]>((acc, line) => {
			if (line.startsWith(" ") || line.startsWith("\t")) {
				acc[acc.length - 1] += line.trim();
			} else {
				acc.push(line.trim());
			}
			return acc;
		}, []);

	let current: Partial<CalendarEvent> = {};
	let insideEvent = false;

	for (const line of lines) {
		if (line === "BEGIN:VEVENT") {
			insideEvent = true;
			current = {};
			continue;
		}
		if (line === "END:VEVENT") {
			if (current.uid && current.summary && current.start && current.end)
				events.push(current as CalendarEvent);
			insideEvent = false;
			continue;
		}
		if (!insideEvent) continue;

		const [key, ...rest] = line.split(":");
		const value = rest.join(":");
		if (!value) continue;

		switch (true) {
			case key.startsWith("UID"):
				current.uid = value;
				break;
			case key.startsWith("SUMMARY"):
				current.summary = value;
				break;
			case key.startsWith("DESCRIPTION"):
				// Unescape newlines and backslashes
				current.description = value.replace(/\\n/g, "\n").replace(/\\/g, "");
				break;
			case key.startsWith("LOCATION"):
				current.location = value.replace(/\\/g, "");
				break;
			case key.startsWith("URL"):
				current.url = value;
				break;
			case key.startsWith("DTSTART"):
				// Use the robust date parser
				current.start = parseICalDate(value);
				break;
			case key.startsWith("DTEND"):
				// Use the robust date parser
				current.end = parseICalDate(value);
				break;
			case key.startsWith("ORGANIZER"):
				current.organizer = value;
				break;
			case key.startsWith("LAST-MODIFIED"):
				current.lastModified = parseICalDate(value);
				break;
		}
	}

	return events;
}
