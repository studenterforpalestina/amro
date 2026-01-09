import 'dotenv/config';
import { sql } from 'bun';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

type SqlTyped = {
	(strings: TemplateStringsArray, ...params: readonly unknown[]): Promise<unknown[]>;
	unsafe: (query: string, ...params: readonly unknown[]) => Promise<unknown[]>;
};

const sqlTyped = sql as unknown as SqlTyped;

export const db = {
	async rows<T = Record<string, unknown>>(
		query: TemplateStringsArray | string,
		...params: readonly unknown[]
	): Promise<T[]> {
		if (typeof query === 'string') {
			const res = await sqlTyped.unsafe(query, ...params);
			return res as T[];
		} else {
			const res = await sqlTyped(query as TemplateStringsArray, ...params);
			return res as T[];
		}
	}
};
