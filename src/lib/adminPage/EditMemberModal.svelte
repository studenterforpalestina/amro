<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { enhance } from '$app/forms';
	import { X } from '@lucide/svelte';
	import type { Member, AdminActionData } from '$lib/types';

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

	type FormField = {
		label: string;
		key: keyof Member;
		type: 'text' | 'email' | 'tel' | 'number';
	};
	const formFields: FormField[] = [
		{ label: $_('page.admin.name'), key: 'name', type: 'text' },
		{ label: $_('page.admin.email'), key: 'email', type: 'email' },
		{ label: $_('page.admin.phone_number'), key: 'phoneNumber', type: 'tel' },
		{ label: $_('page.admin.graduation_year'), key: 'graduationYear', type: 'number' },
		{ label: $_('page.admin.birth_year'), key: 'birthYear', type: 'number' }
	];
	const errors = $derived(
		form && form.memberId == member.id ? (form.errors as Record<string, string>) : undefined
	);
	const getError = (field: string) => errors?.[field];
	const inputClass =
		'w-full rounded-xl border border-gray-400/40 bg-transparent p-2.5 transition-all outline-none focus:border-(--color-green) focus:ring-2 focus:ring-(--color-green)';
	const errorInputClass =
		'border-(--color-red) focus:border-(--color-red) focus:ring-(--color-red)';
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
			class="mb-6 rounded-xl border border-(--color-red) bg-(--color-red)/10 px-4 py-3 text-sm text-(--color-red)"
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
				<label class="flex w-full flex-col gap-1">
					<span class="ml-1 text-sm font-semibold opacity-70">{label}</span>
					<input
						name={key}
						{type}
						value={member[key as keyof Member]}
						step={type === 'number' ? '1' : null}
						inputmode={type === 'number' ? 'numeric' : null}
						required={true}
						class={`${inputClass} ${error ? errorInputClass : ''}`}
					/>
					{#if error}
						<span class="mt-1 ml-1 text-sm text-(--color-red)">{$_(error)}</span>
					{/if}
				</label>
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
				class="flex-1 rounded-xl bg-(--color-red) py-2.5 font-medium text-white shadow-sm hover:brightness-110"
			>
				{$_('common.save_changes')}
			</button>
		</div>
	</form>
</dialog>
