import { json, error } from '@sveltejs/kit';
import { fetchBlogPosts } from '$lib/server/fetchPress';
import { newsTags, type NewsTag } from '$lib/types';

export const GET = async ({ url }) => {
	const tag = url.searchParams.get('tag');
	const activeFilter: undefined | NewsTag =
		tag && newsTags.includes(tag as NewsTag) ? (tag as NewsTag) : undefined;
	try {
		const posts = await fetchBlogPosts(activeFilter);
		return json(posts);
	} catch (e) {
		console.error('Failed to fetch press posts', e);
		throw error(500, 'Failed to fetch press posts');
	}
};
