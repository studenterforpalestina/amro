<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { enhance } from '$app/forms';
	import { X } from '@lucide/svelte';
	import type { Member, AdminActionData } from '$lib/types';
	import FormField from '$lib/components/common/FormField.svelte';

	let {
		member,
		open = $bindable(false),
		form
	}: { member: Member; open: boolean; form: AdminActionData } = $props();

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

	type EditableField = {
		label: string;
		key: 'name' | 'email' | 'phoneNumber' | 'graduationYear' | 'birthYear';
		type: 'text' | 'email' | 'tel' | 'number';
	};
	const formFields: EditableField[] = [
		{ label: $_('common.form.labels.name'), key: 'name', type: 'text' },
		{ label: $_('common.form.labels.email'), key: 'email', type: 'email' },
		{ label: $_('common.form.labels.phone_number'), key: 'phoneNumber', type: 'tel' },
		{ label: $_('common.form.labels.graduation_year'), key: 'graduationYear', type: 'number' },
		{ label: $_('common.form.labels.birth_year'), key: 'birthYear', type: 'number' }
	];
	const errors = $derived(
		form && form.memberId == member.id ? (form.errors as Record<string, string>) : undefined
	);
	const getError = (field: string) => errors?.[field];
</script>

<dialog
	bind:this={dialog}
	class="fixed inset-0 m-auto w-full max-w-md rounded-2xl border border-gray-400/40 bg-(--background) p-6 text-(--body-text) shadow-2xl"
>
	<div class="mb-6 flex items-center justify-between">
		<h3 class="text-xl font-bold">{$_('page.admin.edit')} {member.name}</h3>
		<button
			type="button"
			onclick={close}
			class="rounded-full p-1 transition-colors hover:bg-gray-500/10"
			aria-label="Close edit dialog"
		>
			<X size={20} />
		</button>
	</div>
	{#if getError('form')}
		<p
			class="mb-6 rounded-xl border border-(--contrast-text-red) bg-(--contrast-bg-red)/10 px-4 py-3 text-sm text-(--contrast-text-red)"
		>
			{$_(getError('form') || '')}
		</p>
	{/if}

	<form
		method="POST"
		action="?/editMember"
		use:enhance={() => {
			return async ({ result, update }) => {
				await update({ reset: false });
				if (result.type === 'success') {
					close();
				}
			};
		}}
		class="space-y-4"
	>
		<input type="hidden" name="id" value={member.id} />

		<div class="flex flex-col gap-4">
			{#each formFields as { label, key, type } (key)}
				{@const error = getError(key)}
				<FormField
					id={key}
					name={key}
					{label}
					error={error ? $_(error) : undefined}
					{type}
					value={member[key]}
					step={type === 'number' ? '1' : undefined}
					inputmode={type === 'number' ? 'numeric' : undefined}
					required
					class="border-gray-400/40"
				/>
			{/each}
		</div>

		<div class="flex gap-3 pt-4">
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
				{$_('common.save_changes')}
			</button>
		</div>
	</form>
</dialog>
