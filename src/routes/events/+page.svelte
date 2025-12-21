<script lang="ts">
	import { _ } from "svelte-i18n";
	import EventCard from "./EventCard.svelte";
	import type { Event } from "$lib/utils/eventParser";
	import type { PageProps } from "./$types";
	let { data }: PageProps = $props();
</script>
<svelte:head>
	<title>{$_('page.events.title')}</title>
	<meta name="description" content={$_('page.events.description')} />
	<link rel="icon" href="/images/logo.png" />
</svelte:head>

<div class="max-w-5xl mx-auto p-4 md:p-8 font-sans">
	<h1 class="text-3xl md:text-7xl font-bold mb-4 text-gray-900">
		{$_('page.events.header')}
	</h1>

	<div class="max-w-3xl mx-auto space-y-6">
		{#if data.events.length > 0}
		{#each data.events as event}
		<EventCard
			title={event.name}
			date={event.start_time}
			location={event.place ?? ""}
			description={event.description ?? ""}
			id={event.id}
		/>
		{/each}
		{:else}
		<div class="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
			<p class="text-lg text-gray-500">
				Ingen kommende arrangementer for øyeblikket. Sjekk igjen senere!
			</p>
		</div>
		{/if}
	</div>
</div>
