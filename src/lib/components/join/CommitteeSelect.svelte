<script lang="ts">
	import { _ } from 'svelte-i18n';

	type CommitteeOption = {
		value: string;
		labelKey: string;
	};

	let {
		id = 'committees',
		name = 'committees',
		error,
		options,
		selected = $bindable([])
	}: {
		id?: string;
		name?: string;
		error?: string;
		options: CommitteeOption[];
		selected: string[];
	} = $props();

	let detailsElement = $state<HTMLDetailsElement | null>(null);

	const baseClass =
		'w-full rounded-xl border border-gray-400 bg-transparent p-2.5 placeholder-gray-400 transition-all outline-none focus:border-(--contrast-text-green) focus:ring-2 focus:ring-(--contrast-text-green)';
	const errorClass =
		'border-(--contrast-text-red) focus:border-(--contrast-text-red) focus:ring-(--contrast-text-red)';

	const onSelectCommittee = (event: Event) => {
		const target = event.currentTarget as HTMLInputElement;

		if (target.value === 'none' && target.checked) {
			selected = ['none'];
			return;
		}

		if (target.checked) {
			selected = selected.filter((committee) => committee !== 'none');
		}
	};

	$effect(() => {
		const onClickOutside = (event: MouseEvent) => {
			if (
				detailsElement?.open &&
				event.target instanceof Node &&
				!detailsElement.contains(event.target)
			) {
				detailsElement.open = false;
			}
		};

		document.addEventListener('click', onClickOutside);
		return () => document.removeEventListener('click', onClickOutside);
	});
</script>

<details class="group relative w-full" bind:this={detailsElement}>
	<summary
		{id}
		class={`${baseClass} ${error ? errorClass : ''} flex cursor-pointer list-none items-center justify-between overflow-hidden`}
	>
		<span class="block flex-1 truncate">
			{#if options.some((option) => selected.includes(option.value))}
				{options
					.filter((option) => selected.includes(option.value))
					.map((option) => $_(option.labelKey))
					.join(', ')}
			{:else}
				{$_('page.join.committee_placeholder')}
			{/if}
		</span>
		<span class="ml-3 shrink-0 text-sm text-gray-500 transition-transform group-open:rotate-180"
			>▾</span
		>
	</summary>

	<div
		class="absolute z-10 mt-2 w-full rounded-xl border border-gray-400 bg-(--background) p-2 shadow-sm"
	>
		{#each options as option (option.value)}
			<label class="flex items-center gap-2 rounded-lg px-2 py-1.5">
				<input
					type="checkbox"
					{name}
					value={option.value}
					bind:group={selected}
					onchange={onSelectCommittee}
					class="h-4 w-4 rounded border-gray-400 text-(--contrast-text-green) focus:ring-(--contrast-text-green)"
				/>
				<span>{$_(option.labelKey)}</span>
			</label>
		{/each}
	</div>
</details>
