import { sql } from 'bun';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Post } from '$lib/types';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	const pressRelease = (
		await sql<Post[]>`
		SELECT id, slug, title, date, content, authors
		FROM "PressPost"
		WHERE slug = ${slug}
	`
	)[0];

	if (!pressRelease) {
		throw error(404, 'Press release not found');
	}

	return { post: pressRelease };
};
