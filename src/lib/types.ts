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
export type { ActionData as AdminActionData } from '../routes/admin/$types';
export interface Member {
	id: string;
	name: string;
	email: string;
	phoneNumber: string;
	graduationYear: number;
	birthYear: number;
	isActive: boolean;
}
