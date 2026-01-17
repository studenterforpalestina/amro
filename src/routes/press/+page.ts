import type { PageLoad } from './$types';
export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('/press/posts');
	if (!response.ok) {
		return {
			status: response.status,
			error: new Error(`Could not load press posts: ${response.statusText}`)
		};
	}
	const posts = await response.json();
	return {
		posts
	};
};
