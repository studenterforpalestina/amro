<script lang="ts">
	import { MoonStar, Sun } from '@lucide/svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { c } from '../../utils/classes';

	let dark = $state(false);

	const { class: clas, ...props }: HTMLButtonAttributes = $props();
</script>

<button
	class={c(
		`cursor-pointer rounded-md border-0 bg-transparent px-3 py-2
        transition-colors duration-200 hover:bg-red-100
        hover:text-red-600 active:bg-red-200`,
		clas
	)}
	{...props}
	onclick={() => (dark = !dark)}
>
	{#if dark}
		<MoonStar />
	{:else}
		<Sun />
	{/if}
</button>
