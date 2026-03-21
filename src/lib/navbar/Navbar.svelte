<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { resolve } from '$app/paths';
	import { ChevronLeft, Menu } from '@lucide/svelte';
	import BecomeAMember from '$lib/components/BecomeAMember.svelte';
	import { c } from '../../utils/classes';
	import ThemeToggle from './ThemeToggle.svelte';
	import LanguageSwapper from '$lib/components/LanguageSwitcher.svelte';

	let data = ['events' as const];

	let menuOpen = $state(false);
</script>

<nav
	class="top-0 left-0 gap-2 px-4 py-2 md:px-10 md:py-6 sticky z-50 flex w-full items-center justify-between bg-(--background)"
>
	<div class="flex w-full items-center justify-between">
		<a href={resolve('/')}>
			<img class="w-16 dark:hidden" src="/images/logo.webp" alt="logo" width="959" height="959" />
			<img
				class="w-16 hidden dark:block"
				src="/images/logo_darkmode.webp"
				alt="logo"
				width="959"
				height="959"
			/>
		</a>
		<button
			class="rounded-md px-3 py-2 text-lg md:hidden cursor-pointer
                    text-nowrap text-(--color-red)
                    transition-colors duration-200 hover:bg-(--color-red)/10 active:bg-(--color-red)/40"
			onclick={() => (menuOpen = true)}
		>
			<Menu />
		</button>
	</div>

	<ul class="gap-1 md:flex hidden list-none items-center">
		<li>
			<ThemeToggle />
		</li>
		<LanguageSwapper />
		{#each data as item (item)}
			<li>
				<a
					href={resolve(`/${item}`)}
					class="rounded-md px-3 py-2 text-lg flex text-nowrap
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
			'top-0 right-0 bottom-0 left-0 bg-black md:hidden fixed cursor-default border-none opacity-25',
			!menuOpen && 'hidden'
		)}
		onclick={() => (menuOpen = false)}
	></button>
	<div
		class={c(
			'top-0 px-3 py-5 md:hidden fixed left-full z-50 h-dvh bg-(--background) transition-transform',
			menuOpen && 'transform-[translateX(-100%)]'
		)}
	>
		<ul class="min-w-60 gap-2 p-4 flex list-none flex-col items-start">
			<li class="mb-4 gap-1 flex w-full items-center justify-between">
				<button
					class="rounded-md py-2 pr-5 pl-2 text-lg flex cursor-pointer
                items-center text-(--color-red)
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
						class="rounded-md px-3 py-2 text-lg flex text-nowrap
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
