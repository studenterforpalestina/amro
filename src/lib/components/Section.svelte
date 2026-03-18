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
		'px-8 py-24 flex items-center justify-center',
		fullHeight && 'h-lvh',
		green && 'bg-(--color-green)/80 text-(--color-text-light)'
	]}
>
	<div class={['max-w-300 w-[80svw]', clas]}>
		{@render children?.()}
	</div>
</section>
