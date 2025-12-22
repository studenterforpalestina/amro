interface PressPost {
	title: string;
	date: string;
	content: string;
}
export const fetchBlogPosts = async () => {
	const postFiles = import.meta.glob('/src/routes/press/*.json');
	const iterablePostFiles = Object.entries(postFiles);
	const posts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const post = (await resolver()) as PressPost;
			const slug = path.replace('/src/routes/press/', '').replace('.json', '');
			return {
				slug: slug,
				title: post.title,
				date: post.date
			};
		})
	);

	// Sort posts by date in descending order
	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return posts;
};
