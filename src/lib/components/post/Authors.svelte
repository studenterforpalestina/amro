<script lang="ts">
	export let author: string;
	import { _ } from 'svelte-i18n';

	$: displayAuthor = author?.trim() ? author : $_('common.sfp');
</script>

<p class="mb-4">
	<span>{displayAuthor}</span>
</p>
