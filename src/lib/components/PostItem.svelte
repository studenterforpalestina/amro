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
		class="block cursor-pointer rounded-md
             transition-colors
        duration-200 hover:text-(--color-red) active:bg-(--color-red)/40"
	>
		<h2 class="text-2xl font-semibold md:text-4xl">{post.title}</h2>
	</a>
	<p class="text-(--color-red) italic">
		{$_(`page.news.tags.${post.tag}`)}
	</p>
	<a
		href={resolve(`/news/${post.slug}`)}
		class="transition-colors duration-200 hover:text-(--color-red)/80"
	>
		{$_('common.read_more')}
	</a>
</div>
