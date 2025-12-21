<script lang="ts">
	import EventCard from "./EventCard.svelte";
	import type { Event } from "$lib/utils/eventParser";
	import type { PageProps } from "./$types";
	let { data }: PageProps = $props();
</script>

<div class="max-w-5xl mx-auto p-4 md:p-8 font-sans">
	<h1 class="text-3xl md:text-7xl font-bold mb-4 text-gray-900">
		Kommende arrangementer
	</h1>

	<div class="max-w-3xl mx-auto space-y-6">
		{#if data.events.length > 0}
		{#each data.events as event}
		<EventCard
			title={event.name}
			date={event.start_time}
			location={event.place?.name}
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
