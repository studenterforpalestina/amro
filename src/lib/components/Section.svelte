<script lang="ts">
	import type { ExtendHTML } from '../../utils/types';

	export type SectionProps = ExtendHTML<
		'div',
		{
			green?: boolean;
			fullHeight?: boolean;
		}
	>;
	const { class: clas, green, fullHeight, children }: SectionProps = $props();
</script>

<section
	class={[
		'flex items-center justify-center px-8 py-12 md:py-24',
		fullHeight && 'h-lvh',
		green && 'bg-(--color-green)/80 text-(--color-text-light)'
	]}
>
	<div class={['w-[90svw] max-w-300 md:w-[80svw]', clas]}>
		{@render children?.()}
	</div>
</section>
