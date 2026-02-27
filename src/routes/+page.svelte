<script lang="ts">
	import { _ } from 'svelte-i18n';
	import BecomeAMember from '$lib/components/BecomeAMember.svelte';
	import Section from '$lib/components/Section.svelte';
	import { resolve } from '$app/paths';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	function getTime(eventDate: Date) {
		return eventDate.toLocaleTimeString(undefined, {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		});
	}

	function getDate(eventDate: Date) {
		const day = String(eventDate.getDate()).padStart(2, '0');
		const month = String(eventDate.getMonth() + 1).padStart(2, '0');
		return `${day}.${month}`;
	}
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
<Section green class="flex flex-col items-center justify-between gap-4">
	<h2 class="self-start text-center text-5xl font-bold">{$_('components.navbar.events')}</h2>

	{#if data.events.length > 0}
		<div class="grid gap-4 md:grid-cols-3">
			{#each data.events as event (event.id)}
				<div class="bg-(--color-text-light)/10 p-6 backdrop-blur-sm">
					<p class="text-lg font-bold text-(--color-text-light)/60">{getDate(event.start_time)}</p>
					<h3 class="mt-1 text-2xl font-bold">{event.name}</h3>
					<div class="mt-3 flex flex-col gap-1 text-sm">
						<p>🕔 {getTime(event.start_time)}</p>
						{#if event.place}
							<p>📍 {event.place}</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p class="self-end text-center text-lg opacity-80">{$_('page.events.no_events')}</p>
	{/if}
	<a
		href={resolve('/events')}
		class="self-end rounded-xl bg-(--color-text-light) px-10 py-4 text-xl
			font-bold text-nowrap text-(--color-green) transition-colors
			  duration-200 hover:bg-(--color-text-light)/80 active:bg-green-900"
		>{$_('components.homepage.see_events')}</a
	>
</Section>
<Section class="flex flex-col gap-12 lg:flex-row">
	<div class="flex grow-0 flex-col gap-6 lg:basis-5/12">
		<h2 class="max-w-xl text-5xl font-bold">{$_('components.homepage.about_us')}</h2>
		<p class="text-lg">
			{$_('components.homepage.about_us_paragraph_1')}
		</p>
		<p class="text-lg">
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
