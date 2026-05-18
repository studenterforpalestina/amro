<script>
	import { resolve } from '$app/paths';
	export let data;
	import { _ } from 'svelte-i18n';
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
			class="200 text-(--contrast-text-red) transition hover:text-(--color-red-dark)"
		>
			styret@studenterforpalestina.no
		</a>
	</p>
	{#each data.posts as post (post.slug)}
		<div class="mx-8 mb-8 max-w-2xl md:max-w-3xl">
			<time class="text-(--contrast-text-red)">{post.date}</time>
			<a
				href={resolve(`/press/${post.slug}`)}
				class="mb-6 block cursor-pointer rounded-md
             transition-colors
        duration-200 hover:text-(--contrast-text-red) active:bg-(--contrast-bg-red)/40"
			>
				<h2 class="text-3xl font-semibold">{post.title}</h2>
				<p class="mt-2 text-lg text-(--body-text)/60 duration-200">Les mer</p>
			</a>
		</div>
	{/each}
</div>
