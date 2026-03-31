<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { resolve } from '$app/paths';
	import type { Event } from '$lib/utils/eventParser';

	let { events }: { events: Event[] } = $props();

	function getTime(eventDate: Date) {
		return eventDate.toLocaleTimeString(undefined, {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		});
	}

	function getDate(eventDate: Date) {
		const day = String(eventDate.getDate()).padStart(2, '0');
		const month = String(eventDate.getMonth() + 1).padStart(2, '0');
		return `${day}.${month}`;
	}

	function getEventImageSrc(imageUrl?: string | null) {
		const basePath = resolve('/events/image');
		if (!imageUrl) {
			return basePath;
		}
		return `${basePath}?${new URLSearchParams({ url: imageUrl }).toString()}`;
	}
</script>

<h2 class="self-start text-center text-5xl font-bold">{$_('components.navbar.events')}</h2>

{#if events.length > 0}
	<div class="grid gap-2 md:grid-cols-3 lg:gap-4">
		{#each events as event (event.id)}
			<a
				href={`https://www.facebook.com/events/${event.id}`}
				class="block h-full transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
			>
				<div class="h-full bg-(--color-text-light)/10 p-2 backdrop-blur-sm md:p-4">
					<img
						src={getEventImageSrc(event.image_url)}
						alt={event.name}
						class="mb-4 h-36 w-full rounded-md object-cover md:h-36 lg:h-48"
						decoding="async"
						loading="lazy"
					/>
					<p class="font-bold text-(--color-text-light)/60 md:text-lg">
						{getDate(event.start_time)}
					</p>
					<h3 class="mt-1 text-lg font-bold md:text-2xl">{event.name}</h3>
					<div class="mt-3 flex flex-col gap-1 text-sm">
						<p>🕔 {getTime(event.start_time)}</p>
						{#if event.place}
							<p>📍 {event.place}</p>
						{/if}
					</div>
				</div>
			</a>
		{/each}
	</div>
{:else}
	<p class="self-end text-center text-lg opacity-80">{$_('page.events.no_events')}</p>
{/if}
<a
	href={resolve('/events')}
	class="self-end rounded-xl bg-(--color-text-light) px-10 py-4 text-xl
		font-bold text-nowrap text-(--color-green) transition-colors
		  duration-200 hover:bg-(--color-text-light)/80 active:bg-green-900"
	>{$_('components.homepage.see_events')}</a
>
