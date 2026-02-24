<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { enhance } from '$app/forms';
	import type { HTMLInputAttributes } from 'svelte/elements';
	let { form } = $props();
	let submitting = $state(false);

	type TextField = {
		id: 'name' | 'email' | 'phone';
		name: 'name' | 'email' | 'phone';
		type: 'text' | 'email' | 'tel';
		autocomplete: HTMLInputAttributes['autocomplete'];
		labelKey: string;
		placeholderKey: string;
	};

	type YearField = {
		id: 'birthYear' | 'graduationYear';
		name: 'birthYear' | 'graduationYear';
		labelKey: string;
		placeholderKey: string;
	};

	const textFields: TextField[] = [
		{
			id: 'name',
			name: 'name',
			type: 'text',
			autocomplete: 'name',
			labelKey: 'page.join.name_label',
			placeholderKey: 'page.join.name_placeholder'
		},
		{
			id: 'email',
			name: 'email',
			type: 'email',
			autocomplete: 'email',
			labelKey: 'page.join.email_label',
			placeholderKey: 'page.join.email_placeholder'
		},
		{
			id: 'phone',
			name: 'phone',
			type: 'tel',
			autocomplete: 'tel',
			labelKey: 'page.join.phone_label',
			placeholderKey: 'page.join.phone_placeholder'
		}
	];

	const yearFields: YearField[] = [
		{
			id: 'birthYear',
			name: 'birthYear',
			labelKey: 'page.join.birth_year_label',
			placeholderKey: 'page.join.birth_year_placeholder'
		},
		{
			id: 'graduationYear',
			name: 'graduationYear',
			labelKey: 'page.join.graduation_year_label',
			placeholderKey: 'page.join.graduation_year_placeholder'
		}
	];

	const errors = $derived(form?.errors as Record<string, string> | undefined);
	const getError = (field: string) => errors?.[field];

	const inputClass =
		'w-full rounded-xl border border-gray-400 bg-transparent p-2.5 placeholder-gray-400 transition-all outline-none focus:border-(--color-green) focus:ring-2 focus:ring-(--color-green)';
	const errorInputClass =
		'border-(--color-red) focus:border-(--color-red) focus:ring-(--color-red)';
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
		<p class="mb-8 rounded-xl border border-(--color-green) bg-(--color-green)/10 px-4 py-3 font-bold">
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
		{#each textFields as field}
			{@const fieldError = getError(field.name)}
			<div class="space-y-2">
				<label for={field.id} class="text-sm font-medium">{$_(field.labelKey)}</label>
				<input
					id={field.id}
					name={field.name}
					type={field.type}
					class={`${inputClass} ${fieldError ? errorInputClass : ''}`}
					placeholder={$_(field.placeholderKey)}
					aria-invalid={fieldError ? 'true' : undefined}
					aria-describedby={fieldError ? `${field.id}-error` : undefined}
					autocomplete={field.autocomplete}
					value={form?.[field.name] || ''}
					required
				/>
				{#if fieldError}
					<p id="{field.id}-error" class="text-sm text-(--color-red)">{$_(fieldError)}</p>
				{/if}
			</div>
		{/each}

		<div class="grid gap-5 md:grid-cols-2">
			{#each yearFields as field}
				{@const fieldError = getError(field.name)}
				<div class="space-y-2">
					<label for={field.id} class="text-sm font-medium">{$_(field.labelKey)}</label>
					<input
						id={field.id}
						name={field.name}
						type="number"
						class={`${inputClass} ${fieldError ? errorInputClass : ''}`}
						placeholder={$_(field.placeholderKey)}
						inputmode="numeric"
						min="1900"
						max="2100"
						aria-invalid={fieldError ? 'true' : undefined}
						aria-describedby={fieldError ? `${field.id}-error` : undefined}
						required
						value={form?.[field.name] || ''}
					/>
					{#if fieldError}
						<p id="{field.id}-error" class="text-sm text-(--color-red)">{$_(fieldError)}</p>
					{/if}
				</div>
			{/each}
		</div>

		<label for="newsletter" class="mt-1 flex items-start gap-3">
			<input
				type="checkbox"
				id="newsletter"
				name="newsletter"
				checked={(form as Record<string, unknown>)?.newsletter === true}
				class="mt-1 h-4 w-4 rounded border-gray-400 text-(--color-green) focus:ring-(--color-green)"
			/>
			<span>{$_('page.join.newsletter_label')}</span>
		</label>

		<button
			type="submit"
			disabled={submitting}
			class="w-30 rounded-xl bg-(--color-green) px-4 py-2 text-white transition-all hover:bg-(--color-green)/60 disabled:cursor-not-allowed disabled:opacity-50"
		>
			{$_('page.join.submit_button')}
		</button>
		<p class="text-sm text-gray-500">{$_('page.join.consent_label')}</p>
	</form>
</div>
