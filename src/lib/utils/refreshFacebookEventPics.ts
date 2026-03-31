import { type Event } from '$lib/utils/eventParser';
import { hash } from 'bun';
import sharp from 'sharp';
import { readdir, writeFile, exists, unlink } from 'node:fs/promises';
async function saveFacebookEventImages(events: Event[]) {
	events.forEach(async (event) => {
		const image_url_hash = hash(event?.image_url || '').toString();
		const imageExists = await exists(`$lib/assets/eventpics/${image_url_hash}.jpg`);
		if (event.image_url && !imageExists) {
			try {
				const response = await fetch(event.image_url);
				if (!response.ok) {
					console.error(
						`Failed to fetch image for event ${event.id}:`,
						response.status,
						response.statusText
					);
					return;
				}
				const arrayBuffer = await response.arrayBuffer();
				const buffer = Buffer.from(arrayBuffer);
				const optimizedBuffer = await sharp(buffer)
					.resize({ width: 800, fit: 'inside' })
					.webp({ quality: 80 })
					.toBuffer();
				await writeFile(`$lib/assets/eventpics/${image_url_hash}.webp`, optimizedBuffer);
				event.image_url = `/assets/eventpics/${image_url_hash}.webp`;
			} catch (error) {
				console.error(`Error processing image for event ${event.id}:`, error);
			}
		}
	});
	return events;
}
async function deleteOldEventImages(currentEvents: Event[]) {
	const currentImageHashes = new Set(
		currentEvents.map((event) => hash(event?.image_url || '').toString())
	);
	const files = await readdir('$lib/assets/eventpics');
	for (const file of files) {
		const fileHash = file.split('.')[0];
		if (!currentImageHashes.has(fileHash)) {
			try {
				await unlink(`$lib/assets/eventpics/${file}`);
			} catch (error) {
				console.error(`Error deleting old image ${file}:`, error);
			}
		}
	}
}

export async function refreshFacebookEventPictures(data: { events: Event[] }) {
	const refreshedEvents = await saveFacebookEventImages(data.events);
	await deleteOldEventImages(data.events);
	return { events: refreshedEvents };
}
