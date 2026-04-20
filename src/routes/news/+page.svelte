<script lang="ts">
	import { _ } from 'svelte-i18n';
	import PostItem from '$lib/components/PostItem.svelte';
	import NewsFilter from '$lib/components/NewsFilter.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let posts = $derived(data.posts ?? []);
</script>

<svelte:head>
	<title>{$_('page.news.title')}</title>
	<meta name="description" content={$_('page.news.description')} />
	<link rel="icon" href="/images/logo.png" />
</svelte:head>
<div class="mx-auto max-w-5xl p-4 font-sans md:p-8">
	<h1 class="mb-8 text-3xl font-bold md:text-7xl">{$_(`page.news.header`)}</h1>
	<p class="mb-12 text-lg whitespace-pre-line md:text-xl">
		{$_(`page.news.lead`)}
		<a
			href="mailto:styret@studenterforpalestina.no"
			class="200 text-(--color-red) transition hover:text-(--color-dark-red)"
		>
			styret@studenterforpalestina.no
		</a>
	</p>
	<div class="mx-8 flex flex-row place-content-between">
		<div>
			{#each posts as post (post.slug)}
				<PostItem {post} />
			{/each}
		</div>
		<NewsFilter activeFilter={data.activeFilter ?? 'none'} />
	</div>
</div>
