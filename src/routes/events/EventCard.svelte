<script lang="ts">
	export let title: string;
	export let date: Date;
	export let location: string;
	export let description: string;
	export let id: string;

	function getTime(date: Date) {
		return date.toLocaleTimeString(undefined, {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		});
	}

	function getDate(date: Date) {
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		return `${day}.${month}`;
	}
</script>

<div>
	<div class="p-8 md:p-4 grid grid-cols-[12px_7rem_6fr] md:grid-cols-[12px_7rem_6fr] gap-2 md:gap-4 items-start">
		<div class="col-span-2 w-20 self-center">
			<p class="text-3xl md:text-4xl font-bold text-red-600 col-span-2">{getDate(date)}</p>
		</div>
		
		<p class="font-bold text-xl md:text-2xl">{title}</p>
		<div class ="flex flex-col items-start gap-1">
			<p class="text-sm">🕔</p>
			<p class="text-sm">📍</p>
		</div>
		<div class ="flex flex-col items-start gap-1">
			<p class="text-sm font-bold">{getTime(date)}</p>
			<p class="text-sm font-bold wrap-anywhere md:wrap-break-word">{location}</p>
		</div>
		<div>
		{#if description}
			<p class="whitespace-pre-line">{description}</p>
		{/if}
			<a class="text-red-600 font-bold hover:opacity-50 duration-200" href="https://www.facebook.com/events/{id}">Facebook-event</a>
		</div>
	</div>
</div>
