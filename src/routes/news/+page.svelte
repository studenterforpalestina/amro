<script lang="ts">
	import { _ } from 'svelte-i18n';
	import PostItem from '$lib/components/news/PostItem.svelte';
	import NewsFilter from '$lib/components/news/NewsFilter.svelte';
	import StandardButton from '$lib/components/common/StandardButton.svelte';
	import StandardLink from '$lib/components/common/StandardLink.svelte';
	import PageMeta from '$lib/components/common/PageMeta.svelte';
	import PageWrapper from '$lib/components/common/PageWrapper.svelte';
	import StandardParagraph from '$lib/components/common/StandardParagraph.svelte';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let posts = $derived(data.posts ?? []);
	let totalPages = $derived(data.totalPages ?? 0);
	let page = $derived(data.page ?? 0);
</script>

<PageMeta pagename="news" />
<PageWrapper>
	<div class="mb-8 flex items-center justify-between gap-4">
		<PageHeader>{$_(`page.news.header`)}</PageHeader>
		{#if 'authorized' in data && data.authorized}
			<StandardButton asLink href="/news/new">{$_('page.news.new_post')}</StandardButton>
		{/if}
	</div>
	<StandardParagraph>
		{$_(`page.news.lead`)}
		<StandardLink href="mailto:styret@studenterforpalestina.no" color="red">
			styret@studenterforpalestina.no
		</StandardLink>
	</StandardParagraph>
	<div class="mt-4 flex flex-col-reverse place-content-between">
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
</PageWrapper>
