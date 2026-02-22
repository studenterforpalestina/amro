import { sql } from 'bun';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	const pressRelease = (
		await sql`SELECT title, content, date FROM "PressPost" WHERE slug = ${slug}`
	)[0];

	if (!pressRelease) {
		throw error(404, 'Press release not found');
	}

	return {
		title: pressRelease.title,
		content: pressRelease.content,
		date: pressRelease.date
	};
};
