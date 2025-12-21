<script lang="ts">
	export let title: string;
	export let date: Date;
	export let location: string;
	export let description: string;

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
	<div class="p-4 grid grid-cols-[5px_6rem_6fr] gap-4 items-start">
		<div class="col-span-2 w-20">
			<p class="text-3xl font-bold text-red-600 col-span-2">{getDate(date)}</p>
		</div>
		
		<p class="font-bold text-2xl">{title}</p>
		<div class ="flex flex-col items-start gap-1 pr-2 max-w-px">
			<p class="text-sm">🕔</p>
			<p class="text-sm">📍</p>
		</div>
		<div class ="flex flex-col items-start gap-1">
			<p class="text-sm">{getTime(date)}</p>
			<p class="text-sm whitespace-pre-line wrap-break-word">{location}</p>
		</div>
		{#if description}
			<p class="whitespace-pre-line">{description}</p>
			{/if}
		<!-- <div>
			<a class="text-red-600" src="/{url}">Facebook-event</a>
		</div> -->
	</div>
</div>
