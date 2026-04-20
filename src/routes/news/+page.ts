import type { PageLoad } from './$types';
import { newsTags, type NewsTag, type Post } from '$lib/types';

export const load: PageLoad = async ({ fetch, url }) => {
	const tag = url.searchParams.get('tag');
	const activeFilter: 'none' | NewsTag =
		tag && newsTags.includes(tag as NewsTag) ? (tag as NewsTag) : 'none';

	const endpoint = activeFilter === 'none' ? '/news/posts' : `/news/posts?tag=${activeFilter}`;
	const response = await fetch(endpoint);
	if (!response.ok) {
		return {
			status: response.status,
			error: new Error(`Could not load news posts: ${response.statusText}`)
		};
	}
	const posts = (await response.json()) as Post[];
	return {
		posts,
		activeFilter
	};
};
