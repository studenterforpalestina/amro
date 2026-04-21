import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, depends }) => {
	depends('app:auth');
	return {
		authorized: locals.authorized
	};
};
