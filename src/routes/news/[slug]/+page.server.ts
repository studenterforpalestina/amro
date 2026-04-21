import { sql } from 'bun';
import { error, redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import type { Post } from '$lib/types';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	const pressRelease = (
		await sql<Post[]>`
		SELECT *
		FROM "PressPost"
		WHERE slug = ${slug}
	`
	)[0];

	if (!pressRelease) {
		throw error(404, 'Press release not found');
	}

	if (pressRelease.tag === 'presscoverage' && pressRelease.url) {
		throw redirect(302, pressRelease.url);
	}

	return { post: pressRelease };
};

export const actions: Actions = {
	delete: async (event) => {
		const user = event.locals.user;
		if (!user) {
			throw redirect(302, '/');
		}
		const formData = await event.request.formData();
		const id = formData.get('id')?.toString();

		try {
			await sql`
				DELETE FROM "PressPost"
				WHERE id = ${id}
			`;
			throw redirect(303, '/news');
		} catch (err) {
			if (err.status === 303) {
				throw err;
			}
			console.error('Failed to delete post:', err);
			return fail(500, {
				id: id
			});
		}
	}
};
