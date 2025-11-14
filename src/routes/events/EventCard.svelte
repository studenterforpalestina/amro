<script lang="ts">
	export let title: string;
	export let date: Date;
	export let location: string;
	export let description: string;
	export let url: string;

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
	<div class="grid grid-cols-[auto_auto_6fr] gap-2 items-start md:gap-4">
		<date
			datetime={date.toISOString()}
			class="text-3xl col-span-2 font-bold text-red-600 md:text-4xl"
		>
			{getDate(date)}
		</date>
		<h1 class="font-bold text-xl md:text-3xl">{title}</h1>

		<div class="flex flex-col items-start space-y-1">
			<p class="text-sm">🕔</p>
			<p class="text-sm">📍</p>
		</div>
		<div class="flex flex-col items-start space-y-1 w-[60px]">
			<p class="text-sm">{getTime(date)}</p>
			<p class="text-sm">{location}</p>
		</div>
		<p>
			{#if description}
			{description}
			{/if}
			<br>
			{#if url}
			<a
				class="text-red-600 col-start-3"
				href="{url}"
				target="_blank"
				rel="noopener noreferrer"
				>Facebook-event</a
			>
			{/if}
		</p>
	</div>
</div>
