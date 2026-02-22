<script lang="ts">
	export let authors: string[];

	$: displayAuthors = authors && authors.length > 0 ? authors : ['Anonymous'];
</script>

<p class="mb-4">
	Skrevet av
	{#each displayAuthors as author, i}
		<span>{author}</span>{#if i < displayAuthors.length - 1}, {' '}{/if}
	{/each}
</p>
