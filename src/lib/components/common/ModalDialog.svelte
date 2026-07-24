<script lang="ts">
	import { X } from '@lucide/svelte';

	let { children, title, open = $bindable(false) } = $props();

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
		<h3 class="text-xl font-bold">{title}</h3>
		<button
			type="button"
			onclick={close}
			class="rounded-full p-1 transition-colors hover:bg-gray-500/10"
			aria-label="Close edit dialog"
		>
			<X size={20} />
		</button>
	</div>
	{@render children?.()}
</dialog>
