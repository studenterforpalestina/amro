import type { PageLoad } from './$types';
import { newsTags, type NewsTag, type Post } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ fetch, url, parent }) => {
	const { authorized } = await parent();
	const tag = url.searchParams.get('tag');
	const page = url.searchParams.get('p') || '0';
	const activeFilter: undefined | NewsTag =
		tag && newsTags.includes(tag as NewsTag) ? (tag as NewsTag) : undefined;
	const params = new URLSearchParams();
	if (activeFilter) {
		params.set('tag', activeFilter);
	}
	if (page) {
		params.set('p', page);
	}

	const response = await fetch(`/news/posts?${params.toString()}`);
	if (!response.ok) {
		throw error(response.status, `Could not load news posts: ${response.statusText}`);
	}
	const payload = (await response.json()) as { posts: Post[]; totalPages: number };
	return {
		authorized,
		posts: payload.posts,
		activeFilter,
		totalPages: payload.totalPages,
		page: Number.parseInt(page) || 0
	};
};
