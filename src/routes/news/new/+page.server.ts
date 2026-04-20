import { sql } from 'bun';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import type { NewsTag } from '$lib/types';

const createBaseSlug = (title: string): string => {
	const slug = title
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

	return slug;
};

export const actions: Actions = {
	default: async (event) => {
		console.log('Creating new press post');

		const formData = await event.request.formData();
		const title = formData.get('title')?.toString().trim() ?? '';
		const author = formData.get('author')?.toString().trim() ?? '';
		const tag = (formData.get('tag')?.toString().trim() ?? 'article') as NewsTag;
		const content = formData.get('content')?.toString().trim() ?? '';

		console.log({ title, author, tag, content });
		if (!title || !content) {
			return fail(400, {
				errors: { form: 'common.form.errors.required_fields' }
			});
		}

		const baseSlug = createBaseSlug(title);
		console.log({ baseSlug });

		try {
			for (let attempt = 0; attempt < 100; attempt++) {
				const slug = attempt === 0 ? baseSlug : `${baseSlug}-${attempt + 1}`;

				const [inserted] = await sql<{ slug: string }[]>`
					INSERT INTO "PressPost"(slug, title, date, content, author, tag)
					VALUES(${slug}, ${title}, now(), ${content}, ${author}, ${tag})
					ON CONFLICT (slug) DO NOTHING
					RETURNING slug
				`;

				if (inserted?.slug) {
					throw redirect(303, `/news/${inserted.slug}`);
					return { success: true, notice: 'page.news.post_created', slug: inserted.slug };
				}
			}

			return fail(500, {
				errors: { form: 'common.form.errors.update_failed' }
			});
		} catch (err) {
			if (err.status === 303) {
				throw err;
			}
			console.log('Error creating press post:', err);
			console.error(err);
			return fail(500, {
				errors: { form: 'common.form.errors.update_failed' }
			});
		}
	}
};
