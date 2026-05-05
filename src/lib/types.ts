export type { ActionData as AdminActionData } from '../routes/admin/$types';
export interface Member {
	id: string;
	name: string;
	email: string;
	phoneNumber: string;
	graduationYear: number;
	school: 'NTNU' | 'DMMH' | 'BI' | 'Fotofagskolen' | 'other';
	birthYear: number;
	isActive: boolean;
}
