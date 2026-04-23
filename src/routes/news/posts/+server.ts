import { json, error } from '@sveltejs/kit';
import { countBlogPosts, fetchBlogPosts } from '$lib/server/fetchPress';
import { newsTags, type NewsTag } from '$lib/types';

export const GET = async ({ url }) => {
	const tag = url.searchParams.get('tag');
	const page = url.searchParams.get('p') || '0';
	const pageSize = 10;
	const activeFilter: undefined | NewsTag =
		tag && newsTags.includes(tag as NewsTag) ? (tag as NewsTag) : undefined;
	try {
		const posts = await fetchBlogPosts(activeFilter, page);
		const postCount = await countBlogPosts(activeFilter);
		const totalPages = Math.ceil(Number(postCount) / pageSize);
		return json({ posts, totalPages });
	} catch (e) {
		console.error('Failed to fetch press posts', e);
		throw error(500, 'Failed to fetch press posts');
	}
};
