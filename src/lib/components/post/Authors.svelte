<script lang="ts">
	export let authors: string[];
	import { _ } from 'svelte-i18n';

	$: displayAuthors = authors && authors.length > 0 ? authors : [$_('common.sfp')];
</script>

<p class="mb-4">
	{#each displayAuthors as author, i (author)}
		<span>{author}</span>{#if i < displayAuthors.length - 1},
		{/if}
	{/each}
</p>
