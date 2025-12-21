export type Event = {
    id: string;
    name: string;
    start_time: Date;
    end_time?: Date;
    description?: string;
    place?: any;
}

export function parseEvents(json: any): Event[] {
    return json.data.map((event: any) => ({
        id: event.id,
        name: event.name,
        start_time: new Date(event.start_time),
        end_time: event.end_time ? new Date(event.end_time) : undefined,
        description: event.description,
        place: event.place,
    }));
}