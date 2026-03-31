import { readFile, exists } from 'node:fs/promises';
import { hash } from 'bun';
import { normalizeUrl } from '$lib/utils/refreshFacebookEventPics';
export const GET = async ({ url }) => {
	const imageUrl = url.searchParams.get('url');
	if (!imageUrl) {
		return new Response("Missing 'url' query parameter", { status: 400 });
	}
	const normalizedUrl = normalizeUrl(imageUrl);
	const imageHash = hash(normalizedUrl).toString();
	const filePath = `/data/eventpics/${imageHash}.webp`;
	if (await exists(filePath)) {
		const imageBuffer = await readFile(filePath);
		return new Response(imageBuffer, {
			headers: {
				'Content-Type': 'image/webp',
				'Cache-Control': 'public, max-age=31536000, immutable'
			}
		});
	} else {
		return new Response('Image not found', { status: 404 });
	}
};
