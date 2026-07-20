<script>
	import { _ } from 'svelte-i18n';
	import PageWrapper from '$lib/components/common/PageWrapper.svelte';
	import PageMeta from '$lib/components/common/PageMeta.svelte';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
</script>

<PageMeta pagename="about" />

<PageWrapper>
	<PageHeader>
		{$_(`page.about.header`)}
	</PageHeader>
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
		class="mt-2 block text-lg font-bold text-(--contrast-text-red) duration-200 hover:opacity-50"
		rel="external noopener noreferrer"
		target="_blank"
	>
		{$_(`page.about.wiki_link`)}
	</a>
	<a
		href="https://drive.google.com/file/d/1f3i9gIFnyeqBSwiQ753XGKqv8jHai_8M/view"
		class="mt-2 block text-lg font-bold text-(--contrast-text-red) duration-200 hover:opacity-50"
		rel="external noopener noreferrer"
		target="_blank"
	>
		{$_(`page.about.bylaws`)}
	</a>
	<a
		href="https://drive.google.com/drive/u/0/folders/1KmFsa8f2CcaXcEd8AwuQqCWF5yLmlLoT"
		class="mt-2 block text-lg font-bold text-(--contrast-text-red) duration-200 hover:opacity-50"
		rel="external noopener noreferrer"
		target="_blank"
	>
		{$_('page.about.drive')}
	</a>
</PageWrapper>
