// src/routes/admin/+page.server.ts
import { sql } from 'bun';
import type { PageServerLoad } from './$types';


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
        console.error("Database fetch failed:", error);
        return { members: [], error: "Failed to load members" };
    }
};
