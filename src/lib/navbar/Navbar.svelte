<script lang="ts">
	import { resolve } from '$app/paths';
	import { ChevronLeft, Menu } from '@lucide/svelte';
	import BecomeAMember from '$lib/components/become-a-member.svelte';
	import { c } from '../../utils/classes';
	import ThemeToggle from './theme-toggle.svelte';

	let data = [
		{ url: '/events' as const, string: 'Hva skjer?' },
		{ url: '/groups' as const, string: 'Komiteer' }
	];
	let menuOpen = $state(false);
</script>

<nav class="flex items-center justify-between gap-2 px-10 py-6">
	<div class="flex w-full items-center justify-between">
		<a href={resolve('/')}>
			<img class="w-16" src="/images/logo.png" alt="logo" />
		</a>
		<button
			class="cursor-pointer rounded-md px-3 py-2 text-lg text-nowrap
                    text-red-600 transition-colors
                    duration-200 hover:bg-red-100 active:bg-red-200 sm:hidden"
			onclick={() => (menuOpen = true)}
		>
			<Menu />
		</button>
	</div>
	<ul class="hidden list-none items-center gap-1 sm:flex">
		<li>
			<ThemeToggle />
		</li>
		{#each data as item (item.url)}
			<li>
				<a
					href={resolve(item.url)}
					class="flex rounded-md px-3 py-2 text-lg text-nowrap
                            text-black transition-colors duration-200
                            hover:bg-red-100 hover:text-red-600 active:bg-red-200"
				>
					{item.string}
				</a>
			</li>
		{/each}
		<li>
			<BecomeAMember />
		</li>
	</ul>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class={c(
			'fixed top-0 right-0 bottom-0 left-0 bg-black opacity-25 sm:hidden',
			!menuOpen && 'hidden'
		)}
		onclick={() => (menuOpen = false)}
	></div>
	<div
		class={c(
			'fixed top-0 left-full h-dvh bg-(--color-bg-light) px-3 py-5 transition-transform sm:hidden',
			menuOpen && 'transform-[translateX(-100%)]'
		)}
	>
		<ul class="flex min-w-60 list-none flex-col items-start gap-2 p-4">
			<li class="mb-4 flex w-full items-center justify-between gap-1">
				<button
					class="flex cursor-pointer items-center rounded-md py-2 pr-5 pl-2
                text-lg text-red-600
                transition-colors duration-200 hover:bg-red-100 active:bg-red-200"
					onclick={() => (menuOpen = false)}
				>
					<ChevronLeft />
					Tilbake
				</button>
				<ThemeToggle />
			</li>
			{#each data as item (item.url)}
				<li>
					<a
						href={resolve(item.url)}
						class="flex rounded-md px-3 py-2 text-lg text-nowrap
                                text-black transition-colors duration-200
                                hover:bg-red-100 hover:text-red-600 active:bg-red-200"
						onclick={() => (menuOpen = false)}
					>
						{item.string}
					</a>
				</li>
			{/each}
			<li class="mt-8">
				<BecomeAMember />
			</li>
		</ul>
	</div>
</nav>
