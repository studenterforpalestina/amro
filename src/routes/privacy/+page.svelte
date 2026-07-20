<script>
	import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$_('page.privacy.title')}</title>
	<meta name="description" content={$_('page.privacy.description')} />
	<link rel="icon" href="/images/logo.png" />
</svelte:head>

<div class="mx-auto max-w-3xl p-4 font-sans md:max-w-4xl md:p-8">
	<h1 class="mb-8 text-3xl font-bold md:text-7xl">{$_(`page.privacy.header`)}</h1>
	<p class="text-md whitespace-pre-line md:text-lg">
		{$_(`page.privacy.introduction`)}
	</p>
	<h2 class="mt-12 text-2xl font-bold md:text-4xl">
		{$_(`page.privacy.data_collection`)}
	</h2>
	<p class="text-md mt-4 whitespace-pre-line md:text-lg">
		{$_(`page.privacy.data_collection_details`)}
	</p>
	<ul class="text-md mt-2 ml-4 list-inside list-disc md:text-lg">
		<li>{$_(`common.form.labels.name`)}</li>
		<li>{$_(`common.form.labels.email`)}</li>
		<li>{$_(`common.form.labels.phone_number`)}</li>
		<li>{$_(`common.form.labels.birth_year`)}</li>
		<li>{$_(`common.form.labels.graduation_year`)}</li>
		<li>{$_(`page.join.school_label`)}</li>
	</ul>
	<h2 class="mt-6 text-2xl font-bold md:text-4xl">{$_('page.privacy.data_handling')}</h2>
	<p class="text-md mt-4 whitespace-pre-line md:text-lg">
		{$_(`page.privacy.data_handling_details_1`)}
	</p>
	<p class="text-md mt-4 whitespace-pre-line md:text-lg">
		{$_(`page.privacy.data_handling_details_2`)}
	</p>
	<h2 class="mt-6 text-2xl font-bold md:text-4xl">{$_('page.privacy.your_rights')}</h2>
	<p class="text-md mt-4 whitespace-pre-line md:text-lg">
		{$_(`page.privacy.your_rights_details`)}
	</p>
	<ul class="text-md mt-2 ml-4 list-inside list-disc md:text-lg">
		<li>{$_(`page.privacy.rights.access`)}</li>
		<li>{$_(`page.privacy.rights.correction`)}</li>
		<li>{$_(`page.privacy.rights.deletion`)}</li>
		<li>{$_(`page.privacy.rights.restriction`)}</li>
		<li>{$_(`page.privacy.rights.objection`)}</li>
		<li>{$_(`page.privacy.rights.data_portability`)}</li>
	</ul>
	<p class="text-md mt-4 whitespace-pre-line md:text-lg">
		{$_(`page.privacy.rights.contact`)}
		<a
			href="mailto:styret@studenterforpalestina.no"
			class="text-(--contrast-text-green) underline hover:no-underline"
		>
			styret@studenterforpalestina.no
		</a>
	</p>
</div>
