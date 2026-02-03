<script>
	import { _ } from 'svelte-i18n';
	import BecomeAMember from '$lib/components/BecomeAMember.svelte';
	import Section from '$lib/components/Section.svelte';
	import { resolve } from '$app/paths';
</script>

<Section class="flex flex-col items-start">
	<div class="flex flex-col items-start">
		<h1 class="text-6xl font-bold md:text-8xl">{$_('components.homepage.join')}</h1>
		<div class="flex flex-col gap-16 xl:flex-row">
			<div class="flex flex-col gap-8">
				<h1 class="text-6xl font-bold md:text-8xl md:text-nowrap">
					{$_('components.homepage.for_palestina')}
				</h1>
				<BecomeAMember size="large" class="ml-4" />
			</div>
			<div class="mt-8 w-full self-end">
				<img
					src="/images/demo.webp"
					alt="Demonstrasjon på Trondheims Torg"
					class="h-auto w-full grow-0 basis-7/12"
					width="2744"
					height="1822"
					decoding="async"
				/>
			</div>
		</div>
	</div>
</Section>
<Section green class="flex flex-col items-center justify-between gap-4 lg:flex-row">
	<h2 class="text-center text-5xl font-bold">{$_('components.navbar.events')}</h2>

	<a
		href={resolve('/events')}
		class="rounded-xl bg-(--color-text-light) px-10 py-4 text-xl font-bold
        text-nowrap text-(--color-green) transition-colors
          duration-200 hover:bg-(--color-text-light)/80 active:bg-green-900"
		>{$_('components.homepage.see_events')}</a
	>
</Section>
<Section class="flex flex-col gap-12 lg:flex-row">
	<div class="flex grow-0 flex-col gap-6 lg:basis-5/12">
		<h2 class="max-w-xl text-5xl font-bold">{$_('components.homepage.about_us')}</h2>
		<p>
			{$_('components.homepage.about_us_paragraph_1')}
		</p>
		<p>
			{$_('components.homepage.about_us_paragraph_2')}
		</p>
	</div>
	<img
		src="/images/hovedbygget_demo.jpg"
		alt="Studenter for Palestina på demonstrasjon"
		class="w-full grow-0 lg:basis-7/12"
		decoding="async"
		loading="lazy"
	/>
</Section>
