<script lang="ts">
	import { resolve } from '$app/paths';
	import { _ } from 'svelte-i18n';
	import { newsTags, type NewsTag } from '$lib/types';

	let { activeFilter = 'none' }: { activeFilter?: 'none' | NewsTag } = $props();
</script>

<div class="flex flex-col items-start gap-4 md:flex-row md:flex-wrap">
	<p class="text-lg">{$_('page.news.categories')}</p>
	<a
		class={`rounded-md px-4 py-2 text-white transition-colors duration-200 ${
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
			class={`rounded-md px-4 py-2 text-white transition-colors duration-200 ${
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
