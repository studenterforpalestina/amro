<script lang="ts">
	import { resolve } from '$app/paths';
	import { _ } from 'svelte-i18n';
	import Authors from '$lib/components/post/Authors.svelte';
	import type { Post } from '$lib/types';

	export let data: { post: Post };
</script>

<svelte:head>
	<title>{$_('page.press.title')}</title>
	<meta name="description" content={$_('page.press.description')} />
	<link rel="icon" href="/images/logo.png" />
</svelte:head>

<a
	href={resolve('/press')}
	class="mx-8 my-4 rounded-md px-3 py-2 text-lg underline
	       transition-colors duration-200
	       hover:bg-(--color-red)/10 hover:text-(--color-red)"
>
	← Alle pressemeldinger
</a>

<article class="mx-8 my-8 md:mx-auto md:max-w-3xl">
	<time class="text-(--color-red)">
		{new Date(data.post.date).toLocaleDateString()}
	</time>

	<h1 class="mb-4 text-2xl font-bold md:text-3xl">
		{data.post.title}
	</h1>

	<Authors authors={data.post.authors} />

	<p class="text-md whitespace-pre-line md:text-lg">
		{data.post.content}
	</p>
</article>
