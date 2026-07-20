<script lang="ts">
	const { children } = $props();
</script>

<div class="mx-auto w-[90-svw] max-w-5xl p-4 font-sans md:p-8">
	{@render children()}
</div>
