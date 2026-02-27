import { writable } from 'svelte/store';

const prefersDark =
	typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

export const darkMode = writable(prefersDark);
