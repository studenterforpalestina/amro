<script lang="ts">
	import { resolve } from '$app/paths';
	import { _ } from 'svelte-i18n';
	import Delete from '$lib/components/post/Delete.svelte';
	import EditButton from '$lib/components/post/EditButton.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{$_('page.press.title')}</title>
	<meta name="description" content={$_('page.press.description')} />
	<link rel="icon" href="/images/logo.png" />
</svelte:head>
<div class="mx-auto max-w-5xl p-4 font-sans md:p-8">
	<h1 class="mb-8 text-3xl font-bold md:text-7xl">{$_(`page.press.header`)}</h1>
	<p class="mb-12 text-lg whitespace-pre-line md:text-xl">
		{$_(`page.press.lead`)}
		<a
			href="mailto:styret@studenterforpalestina.no"
			class="200 text-(--color-red) transition hover:text-(--color-dark-red)"
		>
			styret@studenterforpalestina.no
		</a>
	</p>
	<div>
		{#each data.posts as post (post.slug)}
			<div class="mx-8 max-w-2xl py-8 md:max-w-3xl">
				<time class="text-(--color-red)">{new Date(post.date).toLocaleDateString()}</time>
				<a
					href={resolve(`/press/${post.slug}`)}
					class="mb-6 block cursor-pointer rounded-md
             transition-colors
        duration-200 hover:text-(--color-red) active:bg-(--color-red)/40"
				>
					<h2 class="text-3xl font-semibold">{post.title}</h2>
				</a>
				<div class="my-2 flex items-baseline gap-4">
					<EditButton slug={post.slug} />
					<Delete id={post.id} />
				</div>
			</div>
		{/each}
	</div>
</div>
