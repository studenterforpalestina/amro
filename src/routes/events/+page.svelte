<script lang="ts">
	import { _ } from 'svelte-i18n';
	import PageMeta from '$lib/components/common/PageMeta.svelte';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import PageWrapper from '$lib/components/common/PageWrapper.svelte';

	import EventCard from '../../lib/components/events/EventCard.svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<PageMeta pagename="events" />

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
