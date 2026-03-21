<script lang="ts">
	import { MoonStar, Sun } from '@lucide/svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { darkMode } from '$lib/stores/darkMode';
	import { c } from '../../utils/classes';

	const { class: clas, ...props }: HTMLButtonAttributes = $props();
	function toggleDarkMode() {
		darkMode.update((v) => !v);
		document.documentElement.classList.toggle('dark');
	}
</script>

<button
	class={c(
		`cursor-pointer rounded-md border-0 bg-transparent px-3 py-2
            transition-colors duration-200 hover:bg-(--color-red)/15
            hover:text-(--color-red) active:bg-(--color-red)/40`,
		clas
	)}
	{...props}
	onclick={() => {
		toggleDarkMode();
	}}
>
	{#if $darkMode}
		<MoonStar />
	{:else}
		<Sun />
	{/if}
</button>
