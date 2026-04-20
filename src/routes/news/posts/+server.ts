import { fetchBlogPosts } from '$lib/server/fetchPress';
import { newsTags, type NewsTag } from '$lib/types';

export const GET = async ({ url }) => {
	const tag = url.searchParams.get('tag');
	const activeFilter: undefined | NewsTag =
		tag && newsTags.includes(tag as NewsTag) ? (tag as NewsTag) : undefined;
	const posts = await fetchBlogPosts(activeFilter);
	return new Response(JSON.stringify(posts), {
		headers: { 'Content-Type': 'application/json' }
	});
};
