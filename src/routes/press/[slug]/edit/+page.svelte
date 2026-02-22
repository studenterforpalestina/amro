<script lang="ts">
	import type { PageData } from './$types';
	import StandardButton from '$lib/components/StandardButton.svelte';

	export let data: PageData;
</script>

<div class="mx-auto max-w-2xl p-8">
	<h1 class="mb-6 text-2xl font-bold">Rediger innlegg</h1>

	<form class="flex flex-col gap-4">
		<label class="flex flex-col gap-1">
			<span class="font-medium">Tittel</span>
			<input type="text" name="title" value={data.title} class="rounded border p-2 text-black" />
		</label>

		<label class="flex flex-col gap-1">
			<span class="font-medium">Innhold</span>
			<textarea name="content" rows="10" class="rounded border bg-white p-2 text-black"
				>{data.content}</textarea
			>
		</label>

		<div class="flex gap-2 pt-2">
			<button type="button" class="rounded bg-(--color-green) px-4 py-2 text-white"> Lagre </button>
			<StandardButton asLink={true} href="/press" size="medium">Avbryt</StandardButton>
		</div>
	</form>
</div>
