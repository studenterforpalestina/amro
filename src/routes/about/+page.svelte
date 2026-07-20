<script>
	import { _ } from 'svelte-i18n';
	import PageWrapper from '$lib/components/common/PageWrapper.svelte';
	import PageMeta from '$lib/components/common/PageMeta.svelte';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import StandardLink from '$lib/components/common/StandardLink.svelte';
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
	<ul class="mt-2 list-none">
		<li>
			<StandardLink href="https://wiki.studenterforpalestina.no" color="red" external>
				{$_(`page.about.wiki_link`)}
			</StandardLink>
		</li>
		<li>
			<StandardLink
				href="https://drive.google.com/file/d/1f3i9gIFnyeqBSwiQ753XGKqv8jHai_8M/view"
				external
				color="red"
			>
				{$_(`page.about.bylaws`)}
			</StandardLink>
		</li>
		<li>
			<StandardLink
				href="https://drive.google.com/drive/u/0/folders/1KmFsa8f2CcaXcEd8AwuQqCWF5yLmlLoT"
				external
				color="red"
			>
				{$_('page.about.drive')}
			</StandardLink>
		</li>
	</ul>
</PageWrapper>
