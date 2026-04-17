import type { PageLoad } from './$types';
import type { Post } from '$lib/types';
export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('/news/posts');
	if (!response.ok) {
		return {
			status: response.status,
			error: new Error(`Could not load news posts: ${response.statusText}`)
		};
	}
	const posts = (await response.json()) as Post[];
	return {
		posts
	};
};
