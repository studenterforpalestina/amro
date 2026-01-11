import type { Snippet } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type ValidKeys = keyof SvelteHTMLElements;
export type HTML<T extends ValidKeys> = SvelteHTMLElements[T];

export type ExtendHTML<
	T extends ValidKeys,
	Props extends Record<string, unknown>,
> = HTML<T> & Props;

export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

export type Intersection<A, B> = {
	[K in keyof A]: K extends keyof B
		? A[K] extends B[K]
			? A[K]
			: never
		: never;
};

export type WithChildren<T> = T & {
	children?: Snippet<[]>;
};
