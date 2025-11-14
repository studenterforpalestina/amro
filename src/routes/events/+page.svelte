<script lang="ts">
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
			description:
				"We are going to recite Das kapital backwards in german. Here is a really long description of the event to see what the layout looks like with more text. Das Kapital is a really long book, I wouldn't recommend it as the first book to read about communism, but it is very important nonetheless.",
			url: "https://facebook.com/event1",
		},
		{
			title: "Weapons Workshop",
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

<div
	class="max-w-xl mx-auto px-8 py-4 font-sans md:py-8 md:max-w-3xl lg:max-w-5xl"
>
	<h1
		class="text-3xl md:text-6xl lg:text-center lg:text-7xl font-bold mb-6 text-gray-900 md:mb-12 lg:mb-16"
	>
		Kommende arrangementer
	</h1>

	<div class="mx-auto space-y-6 md:space-y-8 lg:space-y-12 lg:max-w-3xl">
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
