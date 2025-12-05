import { writable } from 'svelte/store';

const prefersDark = typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;
if (typeof document !== 'undefined' && prefersDark) {
    document.documentElement.classList.add('dark')
}

export const darkMode = writable(prefersDark);