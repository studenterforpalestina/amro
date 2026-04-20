import { sql } from 'bun';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

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

	return { post: pressRelease };
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const title = formData.get('title')?.toString();
		const author = formData.get('author')?.toString();
		const tag = formData.get('tag')?.toString();
		const content = formData.get('content')?.toString();

		try {
			await sql`
				UPDATE "PressPost"
				SET title = ${title}, author = ${author}, tag = ${tag}, content = ${content}, "updatedAt" = now()
				WHERE slug = ${event.params.slug}
			`;
			return { success: true, notice: 'page.news.post_updated' };
		} catch (err) {
			console.error(err);
			return fail(500, {
				errors: { form: 'common.form.errors.update_failed' }
			});
		}
	}
};
