<script lang="ts">
	import PageMeta from './PageMeta.svelte';

	import { _ } from 'svelte-i18n';
	import EventCard from './EventCard.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{$_('page.events.title')}</title>
	<meta name="description" content={$_('page.events.description')} />
	<link rel="icon" href="/images/logo.png" />
</svelte:head>

<PageWrapper>
	<PageHeader>
		{$_('page.events.header')}
	</PageHeader>

	<div class="mx-auto max-w-3xl space-y-6">
		{#if data.events.length > 0}
			{#each data.events as event (event.id)}
				<EventCard {event} />
			{/each}
		{:else}
			<div class="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
				<p class="text-lg text-gray-500">
					{$_('page.events.no_events')}
				</p>
			</div>
		{/if}
	</div>
</PageWrapper>
