<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import type { Event } from '$lib/utils/eventParser';
	export let event: Event;

	const urlRegex = /(https?:\/\/[\S]+)/;

	let isExpanded = false;
	let isOverflowing = false;
	let descriptionElement: HTMLParagraphElement | null = null;
	let descriptionSegments: string[] = [];

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

	function checkOverflow(element: HTMLElement): boolean {
		return element.scrollHeight > element.clientHeight;
	}

	function isUrl(segment: string) {
		return segment.startsWith('http');
	}

	function toggleExpanded() {
		isExpanded = !isExpanded;
	}

	function getFacebookEventUrl(eventId: string) {
		return `https://www.facebook.com/events/${eventId}`;
	}

	onMount(() => {
		if (descriptionElement) {
			isOverflowing = checkOverflow(descriptionElement);
		}
	});

	$: descriptionSegments = event.description ? event.description.split(urlRegex) : [];
	$: if (descriptionElement) {
		isOverflowing = checkOverflow(descriptionElement);
	}
</script>

<div class="grid grid-cols-[12px_4rem_6fr] items-start gap-2 md:grid-cols-[12px_7rem_6fr] md:gap-4">
	<div class="col-span-2 w-20 self-center">
		<p class="col-span-2 text-2xl font-bold text-(--color-red) md:text-4xl">
			{getDate(event.start_time)}
		</p>
	</div>

	<p class="text-xl font-bold md:text-2xl">{event.name}</p>
	<div class="flex flex-col items-start gap-1">
		<p class="text-xs md:text-sm">🕔</p>
		<p class="text-xs md:text-sm">📍</p>
	</div>
	<div class="flex flex-col items-start gap-1">
		<p class="text-xs font-bold md:text-sm">{getTime(event.start_time)}</p>
		<p class="text-xs font-bold wrap-anywhere md:text-sm md:wrap-break-word">{event.place}</p>
	</div>
	<div>
		{#if event.description}
			<p
				id={'desc-' + event.id}
				bind:this={descriptionElement}
				class="max-h-30 overflow-hidden text-sm text-ellipsis whitespace-pre-line transition-all duration-300 ease-in-out md:text-base"
				class:overflow-auto={isExpanded}
				class:max-h-256={isExpanded}
			>
				{#each descriptionSegments as segment (segment)}
					{#if isUrl(segment)}
						<!-- eslint-disable svelte/no-navigation-without-resolve -->
						<a
							class="text-(--color-red) duration-200 hover:opacity-50"
							href={segment}
							rel="external noopener noreferrer"
							target="_blank"
						>
							{segment}
						</a>
						<!-- eslint-enable svelte/no-navigation-without-resolve -->
					{:else}
						<span>{segment}</span>
					{/if}
				{/each}
			</p>
		{/if}
		{#if isOverflowing}
			<button
				type="button"
				class="text-md block font-semibold text-(--color-red) duration-200 hover:opacity-50"
				aria-expanded={isExpanded}
				on:click={toggleExpanded}
			>
				{isExpanded ? $_(`common.show_less`) : $_('common.show_more')}
			</button>
		{/if}
		<!-- eslint-disable svelte/no-navigation-without-resolve -->

		<a
			href={getFacebookEventUrl(event.id)}
			class="mt-2 block text-lg font-bold text-(--color-red) duration-200 hover:opacity-50"
			rel="external noopener noreferrer"
			target="_blank"
		>
			Facebook-event
		</a>
		<!-- eslint-enable svelte/no-navigation-without-resolve -->
	</div>
</div>
|
