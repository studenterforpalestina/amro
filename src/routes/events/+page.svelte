<script lang="ts">
	import { _ } from "svelte-i18n";
	import EventCard from "./EventCard.svelte";

	type Event = {
		title: string;
		date: Date;
		location?: string;
		description?: string;
		url?: string;
	};

	// Mock events data
	let events: Event[] = [
		{
			title: "Commie Meetup",
			date: new Date("2025-12-01T17:00:00"),
			location: "Close to you",
			description: "We are going to recite Das kapital backwards in german",
			url: "https://facebook.com/event1",
		},
		{
			title: "Wepons Workshop",
			date: new Date("2025-12-01T17:00:00"),
			location: "OmegaV",
			description: ":)",
			url: "https://facebook.com/event2",
		},
		{
			title: "Intifada Celebration",
			date: new Date("2025-12-01T17:00:00"),
			location: "Frode Rinnans veg 24, 7050 Trondheim",
			description: "Celebrate with food and music",
			url: "https://facebook.com/event3",
		},
	];
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

	<div class="max-w-2xl mx-auto h-[600px] overflow-y-auto space-y-6">
		{#if events.length > 0}
		{#each events as event}
		<EventCard
			title={event.title}
			date={event.date}
			location={event.location}
			description={event.description}
			url={event.url}
		/>
		{/each}
		{:else}
		<div class="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
			<p class="text-lg text-gray-500">
				There are no upcoming events at this time.
			</p>
		</div>
		{/if}
	</div>
</div>
