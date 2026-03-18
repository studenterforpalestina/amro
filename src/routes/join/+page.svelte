<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { enhance } from '$app/forms';
	import type { HTMLInputAttributes } from 'svelte/elements';
	let { form } = $props();
	let submitting = $state(false);

	type FieldName = 'name' | 'email' | 'phone' | 'birthYear' | 'graduationYear' | 'committees';

	type InputField = {
		kind: 'input';
		id: FieldName;
		name: FieldName;
		inputType: 'text' | 'email' | 'tel' | 'number';
		autocomplete?: HTMLInputAttributes['autocomplete'];
		labelKey: string;
		placeholderKey: string;
		inputmode?: HTMLInputAttributes['inputmode'];
		min?: string;
		max?: string;
	};

	type SelectField = {
		kind: 'select';
		id: FieldName;
		name: FieldName;
		labelKey: string;
		options: { value: string; labelKey: string }[];
	};

	type FormField = InputField | SelectField;

	const fields: FormField[] = [
		{
			kind: 'input',
			id: 'name',
			name: 'name',
			inputType: 'text',
			autocomplete: 'name',
			labelKey: 'common.form.labels.name',
			placeholderKey: 'page.join.name_placeholder'
		},
		{
			kind: 'input',
			id: 'email',
			name: 'email',
			inputType: 'email',
			autocomplete: 'email',
			labelKey: 'common.form.labels.email',
			placeholderKey: 'page.join.email_placeholder'
		},
		{
			kind: 'input',
			id: 'phone',
			name: 'phone',
			inputType: 'tel',
			autocomplete: 'tel',
			labelKey: 'common.form.labels.phone_number',
			placeholderKey: 'page.join.phone_placeholder'
		},
		{
			kind: 'input',
			id: 'birthYear',
			name: 'birthYear',
			inputType: 'number',
			labelKey: 'common.form.labels.birth_year',
			placeholderKey: 'page.join.birth_year_placeholder',
			inputmode: 'numeric',
			min: '1900',
			max: '2100'
		},
		{
			kind: 'input',
			id: 'graduationYear',
			name: 'graduationYear',
			inputType: 'number',
			labelKey: 'common.form.labels.graduation_year',
			placeholderKey: 'page.join.graduation_year_placeholder',
			inputmode: 'numeric',
			min: '1900',
			max: '2100'
		},
		{
			kind: 'select',
			id: 'committees',
			name: 'committees',
			labelKey: 'page.join.committee_label',
			options: [
				{ value: 'none', labelKey: 'page.join.committee_none' },
				{ value: 'event', labelKey: 'page.join.committee_event' },
				{ value: 'design', labelKey: 'page.join.committee_design' },
				{ value: 'it', labelKey: 'page.join.committee_it' },
				{ value: 'writing', labelKey: 'page.join.committee_writing' },
				{ value: 'stand', labelKey: 'page.join.committee_stand' },
				{ value: 'action', labelKey: 'page.join.committee_action' }
			]
		}
	];
	const errors = $derived(form?.errors as Record<string, string> | undefined);
	const getError = (field: string) => errors?.[field];

	const inputClass =
		'w-full rounded-xl border border-gray-400 bg-transparent p-2.5 placeholder-gray-400 transition-all outline-none focus:border-(--color-green) focus:ring-2 focus:ring-(--color-green)';
	const errorInputClass =
		'border-(--color-red) focus:border-(--color-red) focus:ring-(--color-red)';
	let selectedCommittees = $state<string[]>([]);
	let committeeDetailsElement = $state<HTMLDetailsElement | null>(null);

	const onSelectCommittee = (event: Event) => {
		const target = event.currentTarget as HTMLInputElement;

		if (target.value === 'none' && target.checked) {
			selectedCommittees = ['none'];
			return;
		}

		if (target.value !== 'none' && target.checked) {
			selectedCommittees = selectedCommittees.filter((committee) => committee !== 'none');
		}
	};

	$effect(() => {
		const onClickOutside = (event: MouseEvent) => {
			if (
				committeeDetailsElement?.open &&
				event.target instanceof Node &&
				!committeeDetailsElement.contains(event.target)
			) {
				committeeDetailsElement.open = false;
			}
		};

		document.addEventListener('click', onClickOutside);
		return () => document.removeEventListener('click', onClickOutside);
	});
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
			{#each fields as field (field.id)}
				{@const fieldError = getError(field.name)}
				<div
					class={`col-span-1 min-w-0 space-y-2 ${field.kind === 'input' && field.inputmode === 'numeric' ? 'md:col-span-1' : 'md:col-span-2'}`}
				>
					<label for={field.id} class="text-sm font-medium">{$_(field.labelKey)}</label>
					{#if field.kind === 'input'}
						<input
							id={field.id}
							name={field.name}
							type={field.inputType}
							class={`${inputClass} ${fieldError ? errorInputClass : ''}`}
							placeholder={$_(field.placeholderKey)}
							inputmode={field.inputmode}
							min={field.min}
							max={field.max}
							autocomplete={field.autocomplete}
							aria-invalid={fieldError ? 'true' : undefined}
							aria-describedby={fieldError ? `${field.id}-error` : undefined}
							required
							value={form?.[field.name] || ''}
						/>
					{:else}
						<details class="group relative w-full" bind:this={committeeDetailsElement}>
							<summary
								id={field.id}
								class={`${inputClass} ${fieldError ? errorInputClass : ''} flex cursor-pointer list-none items-center justify-between overflow-hidden`}
							>
								<span class="block flex-1 truncate">
									{field.options.filter((option) => selectedCommittees.includes(option.value))
										.length
										? field.options
												.filter((option) => selectedCommittees.includes(option.value))
												.map((option) => $_(option.labelKey))
												.join(', ')
										: 'Select committees (you can select multiple)'}
								</span>
								<span
									class="ml-3 shrink-0 text-sm text-gray-500 transition-transform group-open:rotate-180"
									>▾</span
								>
							</summary>
							<div
								class="absolute z-10 mt-2 w-full rounded-xl border border-gray-400 bg-(--background) p-2 shadow-sm"
							>
								{#each field.options as option (option.value)}
									<label class="flex items-center gap-2 rounded-lg px-2 py-1.5">
										<input
											type="checkbox"
											name={field.name}
											value={option.value}
											bind:group={selectedCommittees}
											onchange={onSelectCommittee}
											class="h-4 w-4 rounded border-gray-400 text-(--color-green) focus:ring-(--color-green)"
										/>
										<span>{$_(option.labelKey)}</span>
									</label>
								{/each}
							</div>
						</details>
					{/if}
					{#if fieldError}
						<p id={`${field.id}-error`} class="text-sm text-(--color-red)">{$_(fieldError)}</p>
					{/if}
				</div>
			{/each}
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
