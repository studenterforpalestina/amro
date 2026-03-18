<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { enhance } from '$app/forms';
	import CommitteeSelect from '$lib/components/join/CommitteeSelect.svelte';

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

	const inputClass =
		'w-full rounded-xl border border-gray-400 bg-transparent p-2.5 placeholder-gray-400 transition-all outline-none focus:border-(--color-green) focus:ring-2 focus:ring-(--color-green)';
	const errorInputClass =
		'border-(--color-red) focus:border-(--color-red) focus:ring-(--color-red)';
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

<svelte:head>
	<title>{$_('page.join.title')}</title>
	<meta name="description" content={$_('page.join.description')} />
	<link rel="icon" href="/images/logo.png" />
</svelte:head>
<div class="mx-auto max-w-5xl p-4 font-sans md:p-8">
	<h1 class="mb-4 text-3xl font-bold md:mb-8 md:text-7xl">{$_('page.join.header')}</h1>
	<p class="mb-8 text-lg">{$_('page.join.signup_lead')}</p>
	{#if getError('form')}
		<p
			class="mb-6 rounded-xl border border-(--color-red) bg-(--color-red)/10 px-4 py-3 text-sm text-(--color-red)"
		>
			{$_(getError('form') || '')}
		</p>
	{/if}

	{#if form?.success}
		<p
			class="mb-8 rounded-xl border border-(--color-green) bg-(--color-green)/10 px-4 py-3 font-bold"
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
				<div class={`col-span-1 min-w-0 space-y-2 ${field.fullWidth ? 'md:col-span-2' : ''}`}>
					<label for={field.id} class="font-medium">{$_(field.labelKey)}</label>
					<input
						id={field.id}
						name={field.id}
						type={field.type}
						autocomplete={field.autocomplete}
						inputmode={field.inputmode}
						min={field.min}
						max={field.max}
						required
						placeholder={$_(field.placeholderKey)}
						value={fieldValues[field.id]}
						class={`${inputClass} ${error ? errorInputClass : ''}`}
						aria-invalid={error ? 'true' : undefined}
						aria-describedby={error ? `${field.id}-error` : undefined}
					/>
					{#if error}
						<p id={`${field.id}-error`} class="text-sm text-(--color-red)">{$_(error)}</p>
					{/if}
				</div>
			{/each}

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
					<p id="committees-error" class="text-sm text-(--color-red)">
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
				class="mt-1 h-4 w-4 rounded border-gray-400 text-(--color-green) focus:ring-(--color-green)"
			/>
			<span>{$_('page.join.newsletter_label')}</span>
		</label>

		<button
			type="submit"
			disabled={submitting}
			class="w-full rounded-xl bg-(--color-green) px-4 py-2.5 font-medium text-white transition-all hover:bg-(--color-green)/60 disabled:cursor-not-allowed disabled:opacity-50 md:w-30"
		>
			{$_('page.join.submit_button')}
		</button>
		<p class="text-sm text-gray-500">{$_('page.join.consent_label')}</p>
	</form>
</div>
