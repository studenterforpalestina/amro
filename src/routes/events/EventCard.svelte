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
</script>

<div>
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
				<p class="whitespace-pre-line">{description}</p>
			{/if}
			<a
				class="font-bold text-red-600 duration-200 hover:opacity-50"
				href="https://www.facebook.com/events/{id}">Facebook-event</a
			>
		</div>
	</div>
</div>
