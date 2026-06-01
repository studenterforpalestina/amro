<script lang="ts">
	import { _ } from 'svelte-i18n';
	let { pagename }: { pagename: string } = $props();
</script>

<svelte:head>
	<title>{$_(`page.${pagename}.title`)}</title>
	<meta name="description" content={$_(`page.${pagename}.description`)} />
</svelte:head>
