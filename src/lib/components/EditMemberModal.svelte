<script lang="ts">
	import { enhance } from '$app/forms';
	import { X } from '@lucide/svelte';

	export let member: any;
	let dialog: HTMLDialogElement;

	export function show() {
		dialog.showModal();
	}

	function close() {
		dialog.close();
	}
</script>

<dialog
	bind:this={dialog}
	class="fixed inset-0 m-auto w-full max-w-md rounded-2xl border-none bg-(--background) p-6 text-(--body-text) shadow-2xl"
>
	<div class="mb-6 flex items-center justify-between">
		<h3 class="text-xl font-bold">Edit {member.name}</h3>

		<button
			type="button"
			on:click={close}
			class="rounded-full p-1 transition-colors hover:bg-gray-500/10"
		>
			<X size={20} />
		</button>
	</div>

	<form
		method="POST"
		action="?/editMember"
		use:enhance={() =>
			async ({ update }) => {
				await update();
				close();
			}}
		class="space-y-4"
	>
		<input type="hidden" name="id" value={member.id} />

		<div class="flex flex-col gap-4">
			{#each [['Full Name', 'name', 'text'], ['Email', 'email', 'email'], ['Phone Number', 'phoneNumber', 'tel'], ['Birth Year', 'birthYear', 'number'], ['Graduation Year', 'graduationYear', 'number']] as [label, key, type]}
				<label class="flex w-full flex-col gap-1">
					<span class="ml-1 text-sm font-semibold opacity-70">{label}</span>
					<input
						name={key}
						{type}
						value={member[key]}
						step={type === 'number' ? '1' : null}
						required={key === 'name'}
						class="w-full rounded-xl border border-gray-500/20 bg-transparent p-2.5 transition-all outline-none focus:border-(--color-red) focus:ring-2 focus:ring-red-500/20"
					/>
				</label>
			{/each}
		</div>

		<div class="flex gap-3 pt-4">
			<button
				type="button"
				on:click={close}
				class="flex-1 rounded-xl border border-gray-500/20 py-2.5 font-medium hover:bg-gray-500/5"
			>
				Cancel
			</button>
			<button
				type="submit"
				class="flex-1 rounded-xl bg-(--color-red) py-2.5 font-medium text-white shadow-sm hover:brightness-110"
			>
				Save Changes
			</button>
		</div>
	</form>
</dialog>
