<script>
	import { _ } from 'svelte-i18n';
	import BecomeAMember from '$lib/components/BecomeAMember.svelte';
	import Section from '$lib/components/Section.svelte';
	import { resolve } from '$app/paths';
</script>

<Section class="flex flex-col items-start">
	<div class="flex flex-col items-start">
		<h1 class="text-6xl font-bold md:text-8xl">{$_('components.homepage.join')}</h1>
		<div class="gap-16 xl:flex-row flex flex-col">
			<div class="gap-8 flex flex-col">
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
					fetchpriority="high"
				/>
			</div>
		</div>
	</div>
</Section>
<Section green class="gap-4 lg:flex-row flex flex-col items-center justify-between">
	<h2 class="text-5xl font-bold text-center">{$_('components.navbar.events')}</h2>

	<a
		href={resolve('/events')}
		class="rounded-xl px-10 py-4 text-xl font-bold active:bg-green-900
        bg-(--color-text-light) text-nowrap text-(--color-green)
          transition-colors duration-200 hover:bg-(--color-text-light)/80"
		>{$_('components.homepage.see_events')}</a
	>
</Section>
<Section class="gap-12 lg:flex-row flex flex-col">
	<div class="gap-6 lg:basis-5/12 flex grow-0 flex-col">
		<h2 class="max-w-xl text-5xl font-bold">{$_('components.homepage.about_us')}</h2>
		<p class="text-lg">
			{$_('components.homepage.about_us_paragraph_1')}
		</p>
		<p class="text-lg">
			{$_('components.homepage.about_us_paragraph_2')}
		</p>
	</div>
	<img
		src="/images/hovedbygget_demo.webp"
		alt="Studenter for Palestina på demonstrasjon"
		class="lg:basis-7/12 w-full grow-0"
		width="960"
		height="720"
		decoding="async"
		loading="lazy"
	/>
</Section>
