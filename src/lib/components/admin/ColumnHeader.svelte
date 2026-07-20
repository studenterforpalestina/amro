<script lang="ts">
	import { ChevronDown, ChevronUp } from '@lucide/svelte';
	let {
		label,
		columnKey = 'none',
		sortable = false,
		activeSortKey = 'none',
		sortDirection = 1,
		onclick = () => {}
	}: {
		label: string;
		columnKey?: string;
		activeSortKey?: string;
		sortable?: boolean;
		sortDirection?: 1 | -1;
		onclick?: () => void;
	} = $props();
</script>

<th scope="col" class="p-1 md:p-2">
	{#if sortable}
		<button type="button" class="inline-flex cursor-pointer items-center gap-1" {onclick}>
			{label}
			{#if activeSortKey === columnKey}
				<span class="inline-flex align-middle" aria-hidden="true">
					{#if sortDirection === 1}
						<ChevronUp size={14} />
					{:else}
						<ChevronDown size={14} />
					{/if}
				</span>
			{/if}
		</button>
	{:else}
		{label}
	{/if}
</th>
