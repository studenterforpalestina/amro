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
	<div class="p-4 grid grid-cols-[1fr_5fr] gap-4 items-start">
		<div class="flex flex-col items-start space-y-1">
			<p class="text-3xl font-bold text-red-600 ">{getDate(date)}</p>
			<p class="text-sm">🕔 {getTime(date)}</p>
			<p class="text-sm">📍 {location}</p>
		</div>

		<div class="flex flex-col space-y-2">
			{#if title}
			<p class="font-bold text-xl">{title}</p>
			{/if}

			{#if description}
			<p>{description}</p>
			{/if}
		</div>
		<div></div>
		<!-- <div>
			<a class="text-red-600" src="/{url}">Facebook-event</a>
		</div> -->
	</div>
</div>
