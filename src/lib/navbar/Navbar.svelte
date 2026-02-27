<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { resolve } from '$app/paths';
	import { ChevronLeft, Menu } from '@lucide/svelte';
	import BecomeAMember from '$lib/components/BecomeAMember.svelte';
	import { c } from '../../utils/classes';
	import ThemeToggle from './ThemeToggle.svelte';
	import LanguageSwapper from '$lib/components/LanguageSwitcher.svelte';

	let data = ['events' as const, 'groups' as const, 'press' as const];

	let menuOpen = $state(false);
</script>

<nav
	class="sticky top-0 left-0 z-50 flex w-full items-center justify-between gap-2 bg-(--background) px-4 py-2 md:px-10 md:py-6"
>
	<div class="flex w-full items-center justify-between">
		<a href={resolve('/')}>
			<img class="w-16 dark:hidden" src="/images/logo.webp" alt="logo" width="959" height="959" />
			<img
				class="hidden w-16 dark:block"
				src="/images/logo_darkmode.webp"
				alt="logo"
				width="959"
				height="959"
			/>
		</a>
		<button
			class="cursor-pointer rounded-md px-3 py-2 text-lg text-nowrap
                    text-(--color-red) transition-colors
                    duration-200 hover:bg-(--color-red)/10 active:bg-(--color-red)/40 md:hidden"
			onclick={() => (menuOpen = true)}
		>
			<Menu />
		</button>
	</div>

	<ul class="hidden list-none items-center gap-1 md:flex">
		<li>
			<ThemeToggle />
		</li>
		<LanguageSwapper />
		{#each data as item (item)}
			<li>
				<a
					href={resolve(`/${item}`)}
					class="flex rounded-md px-3 py-2 text-lg text-nowrap
                            transition-colors duration-200
                            hover:bg-(--color-red)/10 hover:text-(--color-red) active:bg-(--color-red)/40"
				>
					{$_(`components.navbar.${item}`)}
				</a>
			</li>
		{/each}
		<li>
			<BecomeAMember />
		</li>
	</ul>
	<button
		type="button"
		aria-label="Close menu"
		class={c(
			'fixed top-0 right-0 bottom-0 left-0 cursor-default border-none bg-black opacity-25 md:hidden',
			!menuOpen && 'hidden'
		)}
		onclick={() => (menuOpen = false)}
	></button>
	<div
		class={c(
			'fixed top-0 left-full z-50 h-dvh bg-(--background) px-3 py-5 transition-transform md:hidden',
			menuOpen && 'transform-[translateX(-100%)]'
		)}
	>
		<ul class="flex min-w-60 list-none flex-col items-start gap-2 p-4">
			<li class="mb-4 flex w-full items-center justify-between gap-1">
				<button
					class="flex cursor-pointer items-center rounded-md py-2 pr-5 pl-2
                text-lg text-(--color-red)
                transition-colors duration-200 hover:bg-(--color-red)/10 active:bg-(--color-red)/40"
					onclick={() => (menuOpen = false)}
				>
					<ChevronLeft />
					Tilbake
				</button>
				<ThemeToggle />
			</li>
			<LanguageSwapper />
			{#each data as item (item)}
				<li>
					<a
						onclick={() => (menuOpen = false)}
						href={resolve(`/${item}`)}
						class="flex rounded-md px-3 py-2 text-lg text-nowrap
                                transition-colors duration-200
                                hover:bg-(--color-red)/20 hover:text-(--color-red) active:bg-(--color-red)/50"
					>
						{$_(`components.navbar.${item}`)}
					</a>
				</li>
			{/each}
			<li class="mt-8">
				<BecomeAMember />
			</li>
		</ul>
	</div>
</nav>
