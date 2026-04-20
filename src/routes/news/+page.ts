import type { PageLoad } from './$types';
import { newsTags, type NewsTag, type Post } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ fetch, url, parent }) => {
	const { authorized } = await parent();
	const tag = url.searchParams.get('tag');
	const activeFilter: 'none' | NewsTag =
		tag && newsTags.includes(tag as NewsTag) ? (tag as NewsTag) : 'none';

	const endpoint = activeFilter === 'none' ? '/news/posts' : `/news/posts?tag=${activeFilter}`;
	const response = await fetch(endpoint);
	if (!response.ok) {
		throw error(response.status, `Could not load news posts: ${response.statusText}`);
	}
	const posts = (await response.json()) as Post[];
	return {
		authorized,
		posts,
		activeFilter
	};
};
