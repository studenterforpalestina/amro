<script lang="ts">
	import { resolve } from '$app/paths';
	import { _ } from 'svelte-i18n';
	import type { Post } from '$lib/types';

	export let data: { post: Post };
</script>

<svelte:head>
	<title>{$_('page.news.title')}</title>
	<meta name="description" content={$_('page.news.description')} />
	<link rel="icon" href="/images/logo.png" />
</svelte:head>

<a
	href={resolve('/news')}
	class="mx-8 my-4 rounded-md px-3 py-2 text-lg underline
	       transition-colors duration-200
	       hover:bg-(--color-red)/10 hover:text-(--color-red)"
>
	← Alle nyheter
</a>

<article class="mx-8 my-8 md:mx-auto md:max-w-3xl">
	<time class="text-(--color-red)">
		{new Date(data.post.date).toLocaleDateString()}
	</time>

	<h1 class="text-2xl font-bold md:text-3xl">
		{data.post.title}
	</h1>

	<p class="mb-4 text-lg text-gray-400">
		{$_('page.news.byline')}
		{data.post.author ? data.post.author : $_('common.sfp')}
	</p>

	<p class="text-md whitespace-pre-line md:text-lg">
		{data.post.content}
	</p>
</article>
