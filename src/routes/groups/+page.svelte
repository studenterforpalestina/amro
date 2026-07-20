<script>
	import { _ } from 'svelte-i18n';
	import PageMeta from '$lib/components/common/PageMeta.svelte';
	import PageWrapper from '$lib/components/common/PageWrapper.svelte';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
</script>

<PageMeta pagename="groups" />

<PageWrapper>
	<PageHeader>
		{$_('page.groups.header')}
	</PageHeader>
</PageWrapper>
