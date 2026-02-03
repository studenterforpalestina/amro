<script lang="ts">
	import { _ } from 'svelte-i18n';
	import StandardButton, { type StandardButtonProps } from './StandardButton.svelte';
	const props: StandardButtonProps = $props();
</script>

<StandardButton
	{...props}
	asLink
	href="https://docs.google.com/forms/d/e/1FAIpQLScR_Y7bGd3znYgbsZC6ECHexUsgjfZkyZYIaTvPtE7nsLSukg/viewform"
>
	{$_('components.navbar.join')}
</StandardButton>
