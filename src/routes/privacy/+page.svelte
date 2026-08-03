<script>
	import { _ } from 'svelte-i18n';
	import StandardParagraph from '$lib/components/common/StandardParagraph.svelte';
	import PageWrapper from '$lib/components/common/PageWrapper.svelte';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import PageMeta from '$lib/components/common/PageMeta.svelte';
	import StandardLink from '$lib/components/common/StandardLink.svelte';
</script>

<PageMeta pagename="privacy" />

<PageWrapper>
	<PageHeader>{$_('page.privacy.header')}</PageHeader>

	<StandardParagraph>
		{$_(`page.privacy.introduction`)}
	</StandardParagraph>
	<StandardParagraph>
		<span class="font-bold">{$_('page.privacy.summary_header')}</span>
		{$_(`page.privacy.summary`)}
		<StandardLink href="mailto:styret@studenterforpalestina.no" color="green">
			styret@studenterforpalestina.no
		</StandardLink>.
		{$_(`page.privacy.details_below`)}
	</StandardParagraph>
	<h2 class="mt-12 text-2xl font-bold md:text-4xl">
		{$_(`page.privacy.data_collection`)}
	</h2>
	<StandardParagraph>
		{$_(`page.privacy.data_collection_details`)}
	</StandardParagraph>
	<ul class="text-md mt-2 ml-4 list-inside list-disc md:text-lg">
		<li>{$_(`common.form.labels.name`)}</li>
		<li>{$_(`common.form.labels.email`)}</li>
		<li>{$_(`common.form.labels.phone_number`)}</li>
		<li>{$_(`common.form.labels.birth_year`)}</li>
		<li>{$_(`common.form.labels.graduation_year`)}</li>
		<li>{$_(`page.join.school_label`)}</li>
	</ul>
	<h2 class="mt-6 text-2xl font-bold md:text-4xl">{$_('page.privacy.data_handling')}</h2>
	<StandardParagraph>
		{$_(`page.privacy.data_handling_details_1`)}
	</StandardParagraph>
	<StandardParagraph>
		{$_(`page.privacy.data_handling_details_2`)}
	</StandardParagraph>
	<h2 class="mt-6 text-2xl font-bold md:text-4xl">{$_('page.privacy.your_rights')}</h2>
	<StandardParagraph>
		{$_(`page.privacy.your_rights_details`)}
	</StandardParagraph>
	<ul class="text-md mt-2 ml-4 list-inside list-disc md:text-lg">
		<li>{$_(`page.privacy.rights.access`)}</li>
		<li>{$_(`page.privacy.rights.correction`)}</li>
		<li>{$_(`page.privacy.rights.deletion`)}</li>
		<li>{$_(`page.privacy.rights.restriction`)}</li>
		<li>{$_(`page.privacy.rights.objection`)}</li>
	</ul>
	<StandardParagraph>
		{$_(`page.privacy.rights.contact`)}
		<StandardLink href="mailto:styret@studenterforpalestina.no" color="green">
			styret@studenterforpalestina.no
		</StandardLink>
	</StandardParagraph>
</PageWrapper>
