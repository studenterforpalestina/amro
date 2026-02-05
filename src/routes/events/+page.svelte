<script lang="ts">
	import { _ } from 'svelte-i18n';
	import EventCard from './EventCard.svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{$_('page.events.title')}</title>
	<meta name="description" content={$_('page.events.description')} />
	<link rel="icon" href="/images/logo.png" />
</svelte:head>

<div class="mx-auto max-w-5xl p-4 font-sans md:p-8">
	<h1 class="mb-4 text-3xl font-bold text-gray-900 md:mb-8 md:text-7xl">
		{$_('page.events.header')}
	</h1>

	<div class="mx-auto max-w-3xl space-y-6">
		{#if data.events.length > 0}
			{#each data.events as event (event.id)}
				<EventCard
					title={event.name}
					date={event.start_time}
					location={event.place ?? ''}
					description={event.description ?? ''}
					id={event.id}
				/>
			{/each}
		{:else}
			<div class="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
				<p class="text-lg text-gray-500">
					Ingen kommende arrangementer for øyeblikket. Sjekk igjen senere!
				</p>
			</div>
		{/if}
	</div>
</div>
