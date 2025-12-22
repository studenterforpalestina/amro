import type { PageLoad } from './$types';
export const load: PageLoad = async ({ fetch }) => {
	const reponse = await fetch('/press/posts');
	if (!reponse.ok) {
		return {
			status: reponse.status,
			error: new Error(`Could not load press posts: ${reponse.statusText}`)
		};
	}
	const posts = await reponse.json();
	return {
		posts
	};
};
