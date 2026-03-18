<script lang="ts">
	import { _ } from 'svelte-i18n';
	import StandardButton, { type StandardButtonProps } from './StandardButton.svelte';
	const props: StandardButtonProps = $props();
</script>

<StandardButton {...props} asLink href="/join">
	{$_('components.navbar.join')}
</StandardButton>
