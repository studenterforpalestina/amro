<script lang="ts">
	import { _ } from 'svelte-i18n';
	import PostItem from '$lib/components/PostItem.svelte';
	import NewsFilter from '$lib/components/NewsFilter.svelte';
	import StandardButton from '$lib/components/StandardButton.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let posts = $derived(data.posts ?? []);
	let totalPages = $derived(data.totalPages ?? 0);
	let page = $derived(data.page ?? 0);
</script>

<svelte:head>
	<title>{$_('page.news.title')}</title>
	<meta name="description" content={$_('page.news.description')} />
	<link rel="icon" href="/images/logo.png" />
</svelte:head>
<div class="mx-auto max-w-5xl p-4 font-sans md:p-8">
	<div class="mb-8 flex items-center justify-between gap-4">
		<h1 class="text-3xl font-bold md:text-7xl">{$_(`page.news.header`)}</h1>
		{#if 'authorized' in data && data.authorized}
			<StandardButton asLink href="/news/new">{$_('page.news.new_post')}</StandardButton>
		{/if}
	</div>
	<p class="mb-4 text-lg whitespace-pre-line md:text-xl">
		{$_(`page.news.lead`)}
		<a
			href="mailto:styret@studenterforpalestina.no"
			class="200 text-(--color-red) transition hover:text-(--color-dark-red)"
		>
			styret@studenterforpalestina.no
		</a>
	</p>
	<div class="flex flex-col-reverse place-content-between">
		<div>
			{#each posts as post (post.slug)}
				<PostItem {post} />
			{/each}
		</div>
		<NewsFilter activeFilter={data.activeFilter} />
	</div>
	{#if totalPages > page + 1 || page > 0}
		<div class="mt-8 flex justify-center gap-4">
			{#if page > 0}
				<StandardButton
					asLink
					href={data.activeFilter
						? `/news?tag=${data.activeFilter}&p=${page - 1}`
						: `/news?p=${page - 1}`}
				>
					← {$_('page.news.newer_posts')}
				</StandardButton>
			{/if}
			{#if totalPages > page + 1}
				<StandardButton
					asLink
					href={data.activeFilter
						? `/news?tag=${data.activeFilter}&p=${page + 1}`
						: `/news?p=${page + 1}`}
				>
					{$_('page.news.older_posts')} →
				</StandardButton>
			{/if}
		</div>
	{/if}
</div>
