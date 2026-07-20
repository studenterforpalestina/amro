import type { Snippet } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';

export const newsTags = ['pressrelease', 'presscoverage', 'article', 'speech'] as const;
export type NewsTag = (typeof newsTags)[number];

export interface Post {
	id: string;
	slug: string;
	title: string;
	date: Date;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	tag: NewsTag;
	url?: string;
	author: string;
}
export type { ActionData as AdminActionData } from '../routes/admin/$types';
export interface Member {
	id: string;
	name: string;
	email: string;
	phoneNumber: string;
	graduationYear: number;
	createdAt: Date;
	school: 'NTNU' | 'DMMH' | 'BI' | 'Fotofagskolen' | 'other';
	birthYear: number;
	isActive: boolean;
}

type ValidKeys = keyof SvelteHTMLElements;
export type HTML<T extends ValidKeys> = SvelteHTMLElements[T];

export type ExtendHTML<T extends ValidKeys, Props extends Record<string, unknown>> = HTML<T> &
	Props;

export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

export type Intersection<A, B> = {
	[K in keyof A]: K extends keyof B ? (A[K] extends B[K] ? A[K] : never) : never;
};

export type WithChildren<T> = T & {
	children?: Snippet<[]>;
};
