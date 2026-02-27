<script>
	import { resolve } from '$app/paths';
	export let data;
	import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$_('page.press.title')}</title>
	<meta name="description" content={$_('page.press.description')} />
</svelte:head>
<div class="max-w-5xl p-4 font-sans md:p-8 mx-auto">
	<h1 class="mb-8 text-3xl font-bold md:text-7xl">{$_(`page.press.header`)}</h1>
	<p class="mb-12 text-lg md:text-xl whitespace-pre-line">
		{$_(`page.press.lead`)}
		<a
			href="mailto:styret@studenterforpalestina.no"
			class="200 text-(--color-red) transition hover:text-(--color-dark-red)"
		>
			styret@studenterforpalestina.no
		</a>
	</p>
	{#each data.posts as post (post.slug)}
		<div class="mx-8 mb-8 max-w-2xl md:max-w-3xl">
			<time class="text-(--color-red)">{post.date}</time>
			<a
				href={resolve(`/press/${post.slug}`)}
				class="mb-6 rounded-md block cursor-pointer
             transition-colors
        duration-200 hover:text-(--color-red) active:bg-(--color-red)/40"
			>
				<h2 class="text-3xl font-semibold">{post.title}</h2>
				<p class="mt-2 text-lg text-(--body-text)/60 duration-200">Les mer</p>
			</a>
		</div>
	{/each}
</div>
