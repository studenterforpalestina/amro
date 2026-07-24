<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { enhance } from '$app/forms';
	import type { Member, AdminActionData } from '$lib/types';
	import FormField from '$lib/components/common/FormField.svelte';
	import ModalDialog from '$lib/components/common/ModalDialog.svelte';
	let {
		member,
		open = $bindable(false),
		form
	}: { member: Member; open: boolean; form: AdminActionData } = $props();

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

<ModalDialog bind:open title={$_('page.admin.edit') + ' ' + member.name}>
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
</ModalDialog>
