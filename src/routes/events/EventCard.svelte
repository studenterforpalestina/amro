<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';

	export let title: string;
	export let date: Date;
	export let location: string;
	export let description: string;
	export let id: string;

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

	$: descriptionSegments = description ? description.split(urlRegex) : [];
	$: if (descriptionElement) {
		isOverflowing = checkOverflow(descriptionElement);
	}
</script>

<div class="grid grid-cols-[12px_4rem_6fr] items-start gap-2 md:grid-cols-[12px_7rem_6fr] md:gap-4">
	<div class="col-span-2 w-20 self-center">
		<p class="col-span-2 text-2xl font-bold text-red-600 md:text-4xl">{getDate(date)}</p>
	</div>

	<p class="text-xl font-bold md:text-2xl">{title}</p>
	<div class="flex flex-col items-start gap-1">
		<p class="text-xs md:text-sm">🕔</p>
		<p class="text-xs md:text-sm">📍</p>
	</div>
	<div class="flex flex-col items-start gap-1">
		<p class="text-xs font-bold md:text-sm">{getTime(date)}</p>
		<p class="text-xs font-bold wrap-anywhere md:text-sm md:wrap-break-word">{location}</p>
	</div>
	<div>
		{#if description}
			<p
				id={'desc-' + id}
				bind:this={descriptionElement}
				class="max-h-48 overflow-hidden text-sm text-ellipsis whitespace-pre-line transition-all duration-300 ease-in-out md:text-base"
				class:overflow-auto={isExpanded}
				class:max-h-256={isExpanded}
			>
				{#each descriptionSegments as segment (segment)}
					{#if isUrl(segment)}
						<a
							class="text-red-600 duration-200 hover:opacity-50"
							href={resolve(segment)}
							target="_blank"
							rel="noopener noreferrer">{segment}</a
						>
					{:else}
						<span>{segment}</span>
					{/if}
				{/each}
			</p>
		{/if}
		{#if isOverflowing}
			{#if !isExpanded}
				<span class="text-sm text-gray-500">...</span>
			{/if}
			<button
				type="button"
				class="text-md block font-semibold text-red-600 duration-200 hover:opacity-50"
				aria-expanded={isExpanded}
				on:click={toggleExpanded}
			>
				{isExpanded ? 'Vis mindre' : 'Vis mer'}
			</button>
		{/if}
		<a
			class="mt-2 block text-lg font-bold text-red-600 duration-200 hover:opacity-50"
			href={resolve(getFacebookEventUrl(id))}
			target="_blank"
			rel="noopener noreferrer"
		>
			Facebook-event
		</a>
	</div>
</div>
