import { sql } from 'bun';
import type { NewsTag } from '$lib/types';

export const fetchBlogPosts = async (tag?: NewsTag, page?: string) => {
	const pageSize = 10;
	const pageNumber = Number.parseInt(page ?? '', 10);
	const hasPagination = Number.isInteger(pageNumber) && pageNumber >= 0;
	const offset = hasPagination ? pageNumber * pageSize : 0;

	if (tag) {
		return await sql`SELECT * FROM "PressPost" WHERE tag = ${tag} ORDER BY date DESC LIMIT ${pageSize} OFFSET ${offset}`;
	}

	return await sql`SELECT * FROM "PressPost" ORDER BY date DESC LIMIT ${pageSize} OFFSET ${offset}`;
};

export const countBlogPosts = async (tag?: NewsTag) => {
	if (tag) {
		const result = await sql`SELECT COUNT(*) FROM "PressPost" WHERE tag = ${tag}`;
		return result[0].count;
	}

	const result = await sql`SELECT COUNT(*) FROM "PressPost"`;
	return result[0].count;
};
