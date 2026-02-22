export interface Post {
	id: string;
	slug: string;
	title: string;
	date: Date;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	authors: string[];
}
