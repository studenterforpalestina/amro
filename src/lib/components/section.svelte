<script lang="ts">
	import type { ExtendHTML, HTML } from '../../utils/types';

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
		'flex items-center justify-center px-8 py-24',
		fullHeight && 'h-lvh',
		green && 'bg-(--color-green)/80 text-(--color-text-light)'
	]}
>
	<div class={['w-[80svw] max-w-[1200px]', clas]}>
		{@render children?.()}
	</div>
</section>
