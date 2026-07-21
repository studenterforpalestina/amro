<script lang="ts">
	const { children } = $props();
</script>

<p class="text-md mt-2 leading-[1.45] whitespace-pre-line md:text-lg">
	{@render children?.()}
</p>
