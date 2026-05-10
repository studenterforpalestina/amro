<script lang="ts">
	import { resolve } from '$app/paths';
	import { _ } from 'svelte-i18n';
	import { newsTags, type NewsTag } from '$lib/types';

	let { activeFilter = 'none' }: { activeFilter?: 'none' | NewsTag } = $props();
</script>

<div class="mb-8 flex flex-row flex-wrap items-start gap-2 md:gap-4">
	<p class="mb-0 basis-1/1 md:text-lg">{$_('page.news.categories')}</p>
	<a
		class={`mt-0 rounded-md px-2 py-1 text-sm text-white transition-colors duration-200 md:px-4 md:py-2 md:text-base ${
			activeFilter === 'none'
				? 'bg-(--color-dark-red)'
				: 'bg-(--color-red) hover:bg-(--color-dark-red)'
		}`}
		href={resolve('/news')}
	>
		{$_('page.news.all')}
	</a>
	{#each newsTags as filter (filter)}
		<a
			class={`rounded-md px-2 py-1 text-sm text-white transition-colors duration-200 md:px-4 md:py-2 md:text-base ${
				activeFilter === filter
					? 'bg-(--color-dark-red)'
					: 'bg-(--color-red) hover:bg-(--color-dark-red)'
			}`}
			href={resolve(`/news?tag=${filter}` as unknown as '/news')}
		>
			{$_(`page.news.tags.${filter}`)}
		</a>
	{/each}
</div>
