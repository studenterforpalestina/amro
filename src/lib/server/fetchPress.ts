import { sql } from 'bun';
import type { NewsTag } from '$lib/types';

export const fetchBlogPosts = async (tag?: NewsTag) => {
	if (tag) {
		return await sql`SELECT * FROM "PressPost" WHERE tag = ${tag} ORDER BY date DESC`;
	}

	return await sql`SELECT * FROM "PressPost" ORDER BY date DESC`;
};
