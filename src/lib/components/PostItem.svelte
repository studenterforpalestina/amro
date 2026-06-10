<script lang="ts">
	import { resolve } from '$app/paths';
	import { _ } from 'svelte-i18n';
	import type { Post } from '$lib/types';

	export let post: Post;
	const dateOptions: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	};
</script>

<div class="mb-8 max-w-2xl md:max-w-3xl">
	<time class="text-lg font-bold opacity-60"
		>{new Date(post.date).toLocaleDateString('no-NB', dateOptions)}</time
	>
	<a
		href={resolve(`/news/${post.slug}`)}
		class="-m-1 block cursor-pointer rounded-md p-1
             transition-colors
        duration-200 hover:bg-(--contrast-bg-red)/10 hover:text-(--contrast-text-red) active:bg-(--contrast-bg-red)/40"
	>
		<h2 class="text-2xl font-semibold md:text-4xl">{post.title}</h2>
	</a>
	<p class="text-(--contrast-text-red) italic">
		{$_(`page.news.tags.${post.tag}`)}
	</p>
	{#if post.tag == 'presscoverage' && post.url}
		<!-- eslint-disable svelte/no-navigation-without-resolve -->
		<a
			href={`${post.url}`}
			target="_blank"
			rel="external noopener noreferrer"
			class="block transition-colors duration-200 hover:text-(--contrast-text-red)"
		>
			{$_('page.news.originally_posted_on')}
			{new URL(post.url).hostname.replace('www.', '')}
		</a>
		<!-- eslint-enable svelte/no-navigation-without-resolve -->
	{:else}
		<a
			href={resolve(`/news/${post.slug}`)}
			class="transition-colors duration-200 hover:text-(--contrast-text-red)"
		>
			{$_('common.read_more')}
		</a>
	{/if}
</div>
