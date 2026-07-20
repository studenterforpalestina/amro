<script>
	import { _ } from 'svelte-i18n';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import PageWrapper from '$lib/components/PageWrapper.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<PageMeta pagename="groups" />

<PageWrapper>
	<PageHeader>
		{$_('page.groups.header')}
	</PageHeader>
</PageWrapper>
