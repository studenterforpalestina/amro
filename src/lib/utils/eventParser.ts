export type Event = {
	id: string;
	name: string;
	start_time: Date;
	end_time?: Date;
	description?: string;
	place?: string;
};
interface ApiResponse {
	data: EventData[];
}
interface EventData {
	id: string;
	name: string;
	start_time: string;
	end_time?: string;
	description?: string;
	place?: {
		name?: string;
	};
}

export function parseEvents(json: ApiResponse): Event[] {
	return json.data.map((event) => ({
		id: event.id,
		name: event.name,
		start_time: new Date(event.start_time),
		end_time: event.end_time ? new Date(event.end_time) : undefined,
		description: event.description,
		place: event.place?.name
	}));
}
