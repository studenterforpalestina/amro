<script lang="ts">
	import { _ } from 'svelte-i18n';

	import { enhance } from '$app/forms';
	import { X } from '@lucide/svelte';
	import type { Member } from '$lib/types';

	let { member, open = $bindable(false) }: { member: Member; open: boolean } = $props();

	let dialog: HTMLDialogElement;

	$effect(() => {
		if (open && !dialog.open) {
			dialog.showModal();
		} else if (!open && dialog.open) {
			dialog.close();
		}
	});

	function close() {
		open = false;
	}
</script>

<dialog
	bind:this={dialog}
	class="fixed inset-0 m-auto w-full max-w-md rounded-2xl border border-gray-400/40 bg-(--background) p-6 text-(--body-text) shadow-2xl"
>
	<div class="mb-6 flex items-center justify-between">
		<h3 class="text-xl font-bold">{$_('page.admin.delete')} {member.name}?</h3>
		<button
			type="button"
			onclick={close}
			class="rounded-full p-1 transition-colors hover:bg-gray-500/10"
			aria-label="Close delete dialog"
		>
			<X size={20} />
		</button>
	</div>
	<form class="flex gap-3 pt-4" method="POST" action="?/softDelete" use:enhance>
		<input type="hidden" name="id" value={member.id} />
		<button
			type="button"
			onclick={close}
			class="flex-1 rounded-xl border border-gray-500/20 py-2.5 font-medium hover:bg-gray-500/5"
		>
			{$_('common.cancel')}
		</button>
		<button
			type="submit"
			class="flex-1 rounded-xl bg-(--color-red) py-2.5 font-medium text-white shadow-sm hover:brightness-110"
		>
			{$_('page.admin.delete')}
		</button>
	</form>
</dialog>
