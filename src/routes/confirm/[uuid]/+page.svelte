<script lang="ts">
	import { enhance } from '$app/forms';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import PageWrapper from '$lib/components/common/PageWrapper.svelte';
	import StandardButton from '$lib/components/common/StandardButton.svelte';
	import StandardParagraph from '$lib/components/common/StandardParagraph.svelte';
	import FormField from '$lib/components/common/FormField.svelte';

	let { data, form } = $props();
	let submitting = $state(false);
	const currentYear = new Date().getFullYear();
	const defaultGraduationYear = data.member.graduationYear + 1;
	const errors = $derived(form?.errors as Record<string, string> | undefined);
	const getError = (field: string) => errors?.[field];
	const graduationYearValue = $derived(form?.graduationYear ?? defaultGraduationYear);
</script>

<svelte:head>
	<title>Confirm membership</title>
</svelte:head>

<PageWrapper>
	<div class="mx-auto max-w-2xl space-y-6 md:p-10">
		<PageHeader>Confirm your membership</PageHeader>

		<StandardParagraph>
			<span class="whitespace-normal">
				Hi {data.member.name}. If you have not graduated yet, enter your new expected graduation
				year to keep your membership active.
			</span>
		</StandardParagraph>

		{#if form?.success}
			<div
				class="rounded-2xl border border-(--contrast-text-green) bg-(--contrast-text-green)/10 px-4 py-3 text-sm font-medium"
			>
				Your membership has been updated.
			</div>
		{/if}

		{#if getError('form')}
			<div
				class="rounded-2xl border border-(--contrast-text-red) bg-(--contrast-bg-red)/10 px-4 py-3 text-sm text-(--contrast-text-red)"
			>
				{getError('form')}
			</div>
		{/if}

		<form
			method="POST"
			use:enhance={() => {
				submitting = true;
				return async ({ update }) => {
					await update({ reset: false });
					submitting = false;
				};
			}}
			class="space-y-5"
		>
			<FormField
				id="graduationYear"
				name="graduationYear"
				label="New expected graduation year"
				type="number"
				min={String(currentYear + 1)}
				max={String(currentYear + 10)}
				inputmode="numeric"
				error={getError('graduationYear')}
				value={graduationYearValue}
				required
			/>

			<StandardButton
				type="submit"
				color="green"
				disabled={submitting}
				class="w-full justify-center"
			>
				Keep me as a member
			</StandardButton>
		</form>
	</div>
</PageWrapper>
