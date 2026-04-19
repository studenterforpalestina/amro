<script lang="ts">
	import { resolve } from '$app/paths';
	import { _ } from 'svelte-i18n';
	import type { Post } from '$lib/types';

	export let post: Post;
</script>

<div class="mx-8 max-w-2xl py-8 md:max-w-3xl">
	<time class="text-(--color-red)">{new Date(post.date).toLocaleDateString()}</time>
	<a
		href={resolve(`/news/${post.slug}`)}
		class="mb-6 block cursor-pointer rounded-md
             transition-colors
        duration-200 hover:text-(--color-red) active:bg-(--color-red)/40"
	>
		<h2 class="text-3xl font-semibold">{post.title}</h2>
	</a>
	<p class="text-md whitespace-pre-line md:text-lg">
		{$_(`page.news.tags.${post.tag}`)}
	</p>
</div>
