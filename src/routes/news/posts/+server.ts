import { countBlogPosts, fetchBlogPosts } from '$lib/server/fetchPress';
import { newsTags, type NewsTag } from '$lib/types';

export const GET = async ({ url }) => {
	const tag = url.searchParams.get('tag');
	const page = url.searchParams.get('p') || '0';
	const pageSize = 10;
	const activeFilter: undefined | NewsTag =
		tag && newsTags.includes(tag as NewsTag) ? (tag as NewsTag) : undefined;
	const posts = await fetchBlogPosts(activeFilter, page);
	const postCount = await countBlogPosts(activeFilter);
	const totalPages = Math.ceil(Number(postCount) / pageSize);

	return new Response(JSON.stringify({ posts, totalPages }), {
		headers: { 'Content-Type': 'application/json' }
	});
};
