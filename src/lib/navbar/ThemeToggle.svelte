<script lang="ts">
	import { MoonStar, Sun } from '@lucide/svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { c } from '../../utils/classes';

	const { class: clas, ...props }: HTMLButtonAttributes = $props();

	function toggleDarkMode() {
		const isDark = document.documentElement.classList.toggle('dark');
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	}
</script>

<button
	class={c(
		`rounded-md px-3 py-2 cursor-pointer border-0 bg-transparent
         transition-colors duration-200 hover:bg-(--color-red)/15
         hover:text-(--color-red) active:bg-(--color-red)/40`,
		clas
	)}
	{...props}
	onclick={toggleDarkMode}
	aria-label="Toggle theme"
>
	<div class="contents dark:hidden">
		<Sun />
	</div>

	<div class="contents hidden dark:block">
		<MoonStar />
	</div>
</button>
