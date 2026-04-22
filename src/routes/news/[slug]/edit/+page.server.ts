import { sql } from 'bun';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import type { NewsTag, Post } from '$lib/types';

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
		const title = formData.get('title')?.toString().trim() ?? '';
		const author = formData.get('author')?.toString().trim() ?? '';
		const tag = (formData.get('tag')?.toString().trim() ?? 'article') as NewsTag;
		const content = formData.get('content')?.toString().trim() ?? '';
		const url = formData.get('url')?.toString().trim() ?? '';

		if (!title || (tag === 'presscoverage' && !url) || (tag !== 'presscoverage' && !content)) {
			return fail(400, {
				errors: { form: 'common.form.errors.required_fields' }
			});
		}

		if (url) {
			try {
				new URL(url);
			} catch {
				return fail(400, {
					errors: { form: 'common.form.errors.required_fields' }
				});
			}
		}

		const storedContent = tag === 'presscoverage' ? '' : content;
		const storedUrl = tag === 'presscoverage' ? url : '';

		try {
			await sql`
				UPDATE "PressPost"
				SET title = ${title}, author = ${author}, tag = ${tag}, content = ${storedContent}, url = ${storedUrl}, "updatedAt" = now()
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
