import { sql } from 'bun';

export const fetchBlogPosts = async () => {
	return await sql`SELECT * FROM "PressPost" ORDER BY date DESC`.then((results) => results);
};
