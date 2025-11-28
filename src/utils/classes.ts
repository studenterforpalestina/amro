import { clsx, type ClassValue } from 'clsx';

export function c(...classes: ClassValue[]): string {
	return clsx(classes);
}
