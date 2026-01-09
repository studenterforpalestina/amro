<script lang="ts">
	export let title: string;
	export let date: Date;
	export let location: string;
	export let description: string;
	export let id: string;

	function getTime(date: Date) {
		return date.toLocaleTimeString(undefined, {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		});
	}

	function getDate(date: Date) {
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		return `${day}.${month}`;
	}

	const urlRegex = /(https?:\/\/[^\s]+)/g;
	export let descriptionParts: string[];
	if (description) {
		descriptionParts = description.split(urlRegex);
	}
	let isExpanded = false;
	const isLongDescription = description && description.length > 400;

</script>

<div
	class="grid grid-cols-[12px_7rem_6fr] items-start gap-2 p-8 md:grid-cols-[12px_7rem_6fr] md:gap-4 md:p-4"
>
	<div class="col-span-2 w-20 self-center">
		<p class="col-span-2 text-3xl font-bold text-red-600 md:text-4xl">{getDate(date)}</p>
	</div>

	<p class="text-xl font-bold md:text-2xl">{title}</p>
	<div class="flex flex-col items-start gap-1">
		<p class="text-sm">🕔</p>
		<p class="text-sm">📍</p>
	</div>
	<div class="flex flex-col items-start gap-1">
		<p class="text-sm font-bold">{getTime(date)}</p>
		<p class="text-sm font-bold wrap-anywhere md:wrap-break-word">{location}</p>
	</div>
	<div>
		{#if description}
			<p class="whitespace-pre-line max-h-48 overflow-hidden text-ellipsis text-sm transition-all duration-300 ease-in-out md:text-base" class:overflow-auto={isExpanded} class:max-h-256={isExpanded}>
			{#each descriptionParts as part}
				{#if urlRegex.test(part)}
					<a
						class="text-red-600 duration-200 hover:opacity-50"
						href="{part}"
						target="_blank"
						rel="noopener noreferrer"
						>{part}</a
					>
				{:else}
					<span>{part}</span>
				{/if}
			{/each}
			</p>
		{/if}
		{#if isLongDescription}
				{#if !isExpanded}
					<span class="text-sm text-gray-500">...</span>
				{/if}
				<button
					class="block text-md font-semibold text-red-600 duration-200 hover:opacity-50"
					on:click={() => isExpanded = !isExpanded}
				>
					{isExpanded ? 'Vis mindre' : 'Vis mer'}
				</button>
		{/if}
		<a
			class="text-lg font-bold text-red-600 duration-200 hover:opacity-50 mt-2 block"
			href="https://www.facebook.com/events/{id}" 
			target="_blank" rel="noopener noreferrer">
			Facebook-event
		</a>
	</div>
</div>

