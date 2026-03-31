import { type Event } from '$lib/utils/eventParser';
import { hash } from 'bun';
import sharp from 'sharp';
import { readdir, writeFile, exists, unlink } from 'node:fs/promises';

export function normalizeUrl(url: string) {
	try {
		const urlObj = new URL(url);
		return `${urlObj.origin}${urlObj.pathname}`;
	} catch {
		return '';
	}
}

async function saveFacebookEventImages(events: Event[]) {
	await Promise.all(
		events.map(async (event) => {
			const normalizedImageUrl = normalizeUrl(event?.image_url || '');
			if (!normalizedImageUrl) {
				return;
			}

			const image_url_hash = hash(normalizedImageUrl).toString();
			const imageExists = await exists(`./src/lib/assets/eventpics/${image_url_hash}.webp`);
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
					await writeFile(`./src/lib/assets/eventpics/${image_url_hash}.webp`, optimizedBuffer);
				} catch (error) {
					console.error(`Error processing image for event ${event.id}:`, error);
				}
			}
		})
	);
	return events;
}

async function deleteOldEventImages(currentEvents: Event[]) {
	const currentImageHashes = new Set(
		currentEvents.map((event) => hash(normalizeUrl(event?.image_url || '')).toString())
	);
	const files = await readdir('./src/lib/assets/eventpics');
	for (const file of files) {
		const fileHash = file.split('.')[0];
		if (!currentImageHashes.has(fileHash)) {
			try {
				await unlink(`./src/lib/assets/eventpics/${file}`);
			} catch (error) {
				console.error(`Error deleting old image ${file}:`, error);
			}
		}
	}
}

export async function refreshFacebookEventPictures(data: { events: Event[] }) {
	await saveFacebookEventImages(data.events);
	await deleteOldEventImages(data.events);
}
