import { sql } from 'bun';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const members = await sql`
            SELECT id, name, "phoneNumber", "birthYear", "graduationYear", "isActive", email
            FROM "Member"
            WHERE "isActive" = true
            ORDER BY name ASC
        `;
		return { members };
	} catch (error) {
		console.error('Database fetch failed:', error);
		return { members: [], error: 'Failed to load members' };
	}
};

export const actions: Actions = {
	softDelete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		if (!id) return { success: false };

		try {
			await sql`
                UPDATE "Member"
                SET "isActive" = false, "updatedAt" = now()
                WHERE id = ${id}
            `;
			return { success: true };
		} catch (err) {
			console.error(err);
			return { success: false };
		}
	},
	editMember: async ({ request }) => {
		const formData = await request.formData();

		const id = formData.get('id')?.toString();
		if (!id) return { success: false, message: 'Missing ID' };

		const updates = {
			name: formData.get('name')?.toString(),
			email: formData.get('email')?.toString(),
			phoneNumber: formData.get('phoneNumber')?.toString(),
			birthYear: parseInt(formData.get('birthYear')?.toString() || '0') || null,
			graduationYear: parseInt(formData.get('graduationYear')?.toString() || '0') || null,
			updatedAt: new Date()
		};

		try {
			await sql`
                UPDATE "Member"
                SET ${sql(updates, 'name', 'email', 'phoneNumber', 'birthYear', 'graduationYear', 'updatedAt')}
                WHERE id = ${id}
            `;

			return { success: true };
		} catch (err) {
			console.error('Update failed:', err);
			return { success: false, error: 'Database update failed' };
		}
	}
};
