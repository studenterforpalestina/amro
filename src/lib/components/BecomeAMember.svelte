<script lang="ts">
	import { _ } from 'svelte-i18n';
	import StandardButton, { type Size } from '$lib/components/common/StandardButton.svelte';
	type BecomeAMemberProps = {
		class?: string;
		size?: Size;
		color?: 'red' | 'green';
	};

	const { class: clas, size, color }: BecomeAMemberProps = $props();
</script>

<StandardButton asLink href="/join" class={clas} {size} {color}>
	{$_('components.navbar.join')}
</StandardButton>
