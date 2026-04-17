import { fetchBlogPosts } from '$lib/server/fetchPress';
export const GET = async () => {
	const posts = await fetchBlogPosts();
	return new Response(JSON.stringify(posts), {
		headers: { 'Content-Type': 'application/json' }
	});
};
