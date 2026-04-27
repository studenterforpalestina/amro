<script>
	import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$_('page.about.title')}</title>
	<meta name="description" content={$_('page.about.description')} />
	<link rel="icon" href="/images/logo.png" />
</svelte:head>

<div class="mx-auto max-w-3xl p-4 font-sans md:max-w-4xl md:p-8">
	<h1 class="mb-8 text-3xl font-bold md:text-7xl">{$_(`page.about.header`)}</h1>
	<p class="text-md whitespace-pre-line md:text-lg">
		{$_(`components.homepage.about_us_paragraph_1`)}
	</p>
	<p class="text-md mt-4 whitespace-pre-line md:text-lg">
		{$_(`components.homepage.about_us_paragraph_2`)}
	</p>
	<h2 class="mt-12 text-2xl font-bold md:text-4xl">
		{$_(`page.about.history_header`)}
	</h2>
	<p class="text-md mt-4 whitespace-pre-line md:text-lg">
		{$_(`page.about.history`)}
	</p>
	<h3 class="mt-6 text-xl font-bold md:text-2xl">{$_('page.about.encampment_subtitle')}</h3>
	<p class="text-md mt-4 whitespace-pre-line md:text-lg">
		{$_(`page.about.encampment`)}
	</p>
	<h3 class="mt-6 text-xl font-bold md:text-2xl">{$_('page.about.actions_subtitle')}</h3>
	<p class="text-md mt-4 whitespace-pre-line md:text-lg">
		{$_(`page.about.actions`)}
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
	<a
		href="https://drive.google.com/drive/u/0/folders/1KmFsa8f2CcaXcEd8AwuQqCWF5yLmlLoT"
		class="mt-2 block text-lg font-bold text-(--color-red) duration-200 hover:opacity-50"
		rel="external noopener noreferrer"
		target="_blank"
	>
		{$_('page.about.drive')}
	</a>
</div>
