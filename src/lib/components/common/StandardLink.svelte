<script lang="ts">
	import type { ExtendHTML } from '$lib/types';

	export type StandardLinkProps = ExtendHTML<
		'a',
		{
			external?: boolean;
			color?: 'red' | 'green';
		}
	>;
	const { href, children, external, color }: StandardLinkProps = $props();
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
	{href}
	class="mt-2 text-lg font-bold text-(--contrast-text-{color
		? color
		: 'red'}) duration-200 hover:opacity-50"
	rel={external ? 'external noopener noreferrer' : undefined}
	target={external ? '_blank' : undefined}
>
	{@render children?.()}
</a>
