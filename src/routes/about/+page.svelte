<script>
	import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$_('page.about.title')}</title>
	<meta name="description" content={$_('page.about.description')} />
	<link rel="icon" href="/images/logo.png" />
</svelte:head>

<div class="mx-auto max-w-5xl p-4 font-sans md:p-8">
	<h1 class="mb-8 text-3xl font-bold md:text-7xl">{$_(`page.about.header`)}</h1>
	<p class="text-md whitespace-pre-line md:text-lg">
		{$_(`page.about.lead`)}
	</p>
	<h2 class="mt-12 text-2xl font-bold md:text-4xl">
		{$_(`page.about.history_header`)}
	</h2>
	<p class="text-md mt-4 whitespace-pre-line md:text-lg">
		{$_(`page.about.history`)}
	</p>
	<h2 class="mt-12 text-2xl font-bold md:text-4xl">
		{$_(`page.about.other_resources`)}
	</h2>
	<a
		href="https://wiki.studenterforpalestina.no"
		class="mt-2 block text-lg font-bold text-(--color-red) duration-200 hover:opacity-50"
		rel="external noopener noreferrer"
		target="_blank"
	>
		{$_(`page.about.wiki_link`)}
	</a>
	<a
		href=""
		class="mt-2 block text-lg font-bold text-(--color-red) duration-200 hover:opacity-50"
		rel="external noopener noreferrer"
		target="_blank"
	>
		{$_(`page.about.bylaws`)}
	</a>
</div>
