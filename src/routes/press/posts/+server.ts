import { json, error } from '@sveltejs/kit';
import { fetchBlogPosts } from '$lib/server/fetchPress';

export const GET = async () => {
	try {
		const posts = await fetchBlogPosts();
		return json(posts);
	} catch (e) {
		console.error('Failed to fetch press posts', e);
		throw error(500, 'Failed to fetch press posts');
	}
};
