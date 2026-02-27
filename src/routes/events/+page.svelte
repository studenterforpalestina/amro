<script lang="ts">
	import { _ } from 'svelte-i18n';
	import EventCard from './EventCard.svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{$_('page.events.title')}</title>
	<meta name="description" content={$_('page.events.description')} />
</svelte:head>

<div class="max-w-5xl p-4 font-sans md:p-8 mx-auto">
	<h1 class="mb-4 text-3xl font-bold md:mb-8 md:text-7xl">
		{$_('page.events.header')}
	</h1>

	<div class="max-w-3xl space-y-6 mx-auto">
		{#if data.events.length > 0}
			{#each data.events as event (event.id)}
				<EventCard {event} />
			{/each}
		{:else}
			<div class="rounded-lg border-gray-200 bg-gray-50 p-8 border text-center">
				<p class="text-lg text-gray-500">
					{$_('page.events.no_events')}
				</p>
			</div>
		{/if}
	</div>
</div>
