<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { resolve } from '$app/paths';
	import { enhance } from '$app/forms';
	import PageWrapper from '$lib/components/common/PageWrapper.svelte';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import PageMeta from '$lib/components/common/PageMeta.svelte';
	import CommitteeSelect from '$lib/components/join/CommitteeSelect.svelte';
	import FormField from '$lib/components/common/FormField.svelte';
	import StandardParagraph from '$lib/components/common/StandardParagraph.svelte';
	import StandardButton from '$lib/components/common/StandardButton.svelte';
	import StandardLink from '$lib/components/common/StandardLink.svelte';
	let { form } = $props();
	let submitting = $state(false);

	const committeeOptions = [
		{ value: 'none', labelKey: 'page.join.committee_none' },
		{ value: 'event', labelKey: 'page.join.committee_event' },
		{ value: 'design', labelKey: 'page.join.committee_design' },
		{ value: 'it', labelKey: 'page.join.committee_it' },
		{ value: 'writing', labelKey: 'page.join.committee_writing' },
		{ value: 'stand', labelKey: 'page.join.committee_stand' },
		{ value: 'action', labelKey: 'page.join.committee_action' }
	];
	const schoolOptions = [
		{ value: 'NTNU', label: 'NTNU' },
		{ value: 'DMMH', label: 'DMMH' },
		{ value: 'BI', label: 'BI' },
		{ value: 'Fotofagskolen', label: 'Fotofagskolen' },
		{ value: 'other', label: $_('page.join.school_other') }
	];

	type InputField = {
		id: 'name' | 'email' | 'phone' | 'birthYear' | 'graduationYear';
		type: 'text' | 'email' | 'tel' | 'number';
		labelKey: string;
		placeholderKey: string;
		autocomplete?: 'name' | 'email' | 'tel';
		inputmode?: 'numeric';
		min?: string;
		max?: string;
		fullWidth?: boolean;
		options?: { value: string; labelKey: string }[];
	};

	const inputFields: InputField[] = [
		{
			id: 'name',
			type: 'text',
			labelKey: 'common.form.labels.name',
			placeholderKey: 'page.join.name_placeholder',
			autocomplete: 'name',
			fullWidth: true
		},
		{
			id: 'email',
			type: 'email',
			labelKey: 'common.form.labels.email',
			placeholderKey: 'page.join.email_placeholder',
			autocomplete: 'email',
			fullWidth: true
		},
		{
			id: 'phone',
			type: 'tel',
			labelKey: 'common.form.labels.phone_number',
			placeholderKey: 'page.join.phone_placeholder',
			autocomplete: 'tel',
			fullWidth: true
		},
		{
			id: 'birthYear',
			type: 'number',
			labelKey: 'common.form.labels.birth_year',
			placeholderKey: 'page.join.birth_year_placeholder',
			inputmode: 'numeric',
			min: '1900',
			max: '2100'
		},
		{
			id: 'graduationYear',
			type: 'number',
			labelKey: 'common.form.labels.graduation_year',
			placeholderKey: 'page.join.graduation_year_placeholder',
			inputmode: 'numeric',
			min: '1900',
			max: '2100'
		}
	];

	const errors = $derived(form?.errors as Record<string, string> | undefined);
	const getError = (field: string) => errors?.[field];

	const fieldValues = $derived({
		name: form?.name || '',
		email: form?.email || '',
		phone: form?.phone || '',
		birthYear: form?.birthYear || '',
		graduationYear: form?.graduationYear || ''
	});
	let selectedCommittees = $derived(
		Array.isArray(form?.committees) ? [...(form.committees as string[])] : []
	);
</script>

<PageMeta pagename="join" />
<PageWrapper>
	<PageHeader>
		{$_('page.join.header')}
	</PageHeader>
	<StandardParagraph>
		{$_('page.join.signup_lead')}
	</StandardParagraph>
	{#if getError('form')}
		<p
			class="mb-6 rounded-xl border border-(--contrast-text-red) bg-(--contrast-text-red)/10 px-4 py-3 text-sm text-(--contrast-text-red)"
		>
			{$_(getError('form') || '')}
		</p>
	{/if}

	{#if form?.success}
		<p
			class="mb-8 rounded-xl border border-(--contrast-text-green) bg-(--contrast-text-green)/10 px-4 py-3 font-bold"
		>
			{$_('page.join.success_message')}
		</p>
	{/if}
	<form
		class="mx-auto flex max-w-2xl flex-col gap-5 p-6 md:p-8"
		method="POST"
		use:enhance={() => {
			submitting = true;
			return async ({ update }) => {
				await update({ reset: true });
				submitting = false;
			};
		}}
	>
		<div class="grid grid-cols-1 gap-5 md:grid-cols-2">
			{#each inputFields as field (field.id)}
				{@const error = getError(field.id)}
				<FormField
					id={field.id}
					name={field.id}
					label={$_(field.labelKey)}
					error={error ? $_(error) : undefined}
					fullWidth={field.fullWidth}
					type={field.type}
					autocomplete={field.autocomplete}
					inputmode={field.inputmode}
					min={field.min}
					max={field.max}
					required
					placeholder={$_(field.placeholderKey)}
					value={fieldValues[field.id]}
				/>
			{/each}
			<FormField
				id="school"
				name="school"
				label={$_('page.join.school_label')}
				error={getError('school') ? $_(getError('school') || '') : undefined}
				fullWidth
				type="select"
				options={schoolOptions}
			/>
			<div class="col-span-1 min-w-0 space-y-2 md:col-span-2">
				<label for="committees" class="font-medium">{$_('page.join.committee_label')}</label>
				<CommitteeSelect
					id="committees"
					name="committees"
					options={committeeOptions}
					error={getError('committees')}
					bind:selected={selectedCommittees}
				/>
				{#if getError('committees')}
					<p id="committees-error" class="text-sm text-(--contrast-text-red)">
						{$_(getError('committees') || '')}
					</p>
				{/if}
			</div>
		</div>

		<label for="newsletter" class="mt-1 flex items-start gap-3">
			<input
				type="checkbox"
				id="newsletter"
				name="newsletter"
				checked={form?.newsletter === true}
				class="mt-1 h-4 w-4 rounded border-gray-400 text-(--contrast-text-green) focus:ring-(--contrast-text-green)"
			/>
			<span>{$_('page.join.newsletter_label')}</span>
		</label>

		<StandardButton
			type="submit"
			disabled={submitting}
			class="w-full rounded-xl px-8 md:w-30"
			color="green"
		>
			{$_('page.join.submit_button')}
		</StandardButton>
		<p class="text-sm text-gray-500">
			{$_('page.join.consent_label')}
			<a
				href={resolve('/privacy')}
				class="font-bold text-(--contrast-text-green) duration-100 hover:opacity-50"
				>{$_('page.join.privacy_policy')}</a
			>.
		</p>
	</form>
</PageWrapper>
