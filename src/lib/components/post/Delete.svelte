<script lang="ts">
	import { _ } from 'svelte-i18n';
	import ModalDialog from '$lib/components/common/ModalDialog.svelte';
	import { enhance } from '$app/forms';

	let { id, title }: { id: string; title: string } = $props();

	let open = $state(false);

	function close() {
		open = false;
	}
</script>

<button
	type="button"
	class="text-lg text-(--contrast-text-red) duration-200 hover:text-(--contrast-text-red)/60"
	onclick={() => (open = true)}>Slett</button
>

<ModalDialog bind:open title={$_('page.admin.delete') + ' ' + title}>
	<form class="flex gap-3 pt-4" method="POST" action="?/delete" use:enhance>
		<input type="hidden" name="id" value={id} />
		<button
			type="button"
			onclick={close}
			class="flex-1 rounded-xl border border-gray-500/20 py-2.5 font-medium hover:bg-gray-500/5"
		>
			{$_('common.cancel')}
		</button>
		<button
			type="submit"
			class="flex-1 rounded-xl bg-(--contrast-bg-red) py-2.5 font-medium text-white shadow-sm hover:brightness-110"
		>
			{$_('page.admin.delete')}
		</button>
	</form>
</ModalDialog>
