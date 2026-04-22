import { sql } from 'bun';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import type { NewsTag } from '$lib/types';

const createBaseSlug = (title: string): string => {
	const firstThreeWords = title.trim().split(/\s+/).slice(0, 3).join(' ');

	const slug = firstThreeWords
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
	return slug;
};

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;
	if (!user) {
		throw redirect(302, '/news');
	}
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

		const baseSlug = createBaseSlug(title);
		let createdSlug: string | null = null;

		try {
			for (let attempt = 0; attempt < 100; attempt++) {
				const slug = attempt === 0 ? baseSlug : `${baseSlug}-${attempt + 1}`;

				const [inserted] = await sql<{ slug: string }[]>`
					INSERT INTO "PressPost"(slug, title, date, content, author, tag, url)
					VALUES(${slug}, ${title}, now(), ${storedContent}, ${author}, ${tag}, ${storedUrl})
					ON CONFLICT (slug) DO NOTHING
					RETURNING slug
				`;

				if (inserted?.slug) {
					createdSlug = inserted.slug;
					break;
				}
			}
		} catch (err) {
			console.error(err);
			return fail(500, {
				errors: { form: 'common.form.errors.update_failed' }
			});
		}

		if (!createdSlug) {
			return fail(500, {
				errors: { form: 'common.form.errors.update_failed' }
			});
		}

		throw redirect(303, `/news/${createdSlug}`);
	}
};
