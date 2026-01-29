<script lang="ts">
	import { locale } from 'svelte-i18n';

	// Ensures we don't have to fetch the full language file for every locale
	const languages = [
		{ code: 'en-US', name: 'English' },
		{ code: 'no-NB', name: 'Norsk bokmål' }
	];
</script>

<select
	class="cursor-pointer rounded-md border-0 pl-3 py-2 text-lg
  transition-colors duration-200 hover:bg-red-100 hover:text-red-600 active:bg-red-200"
	bind:value={$locale}
	on:change={(e) => {
		if (e?.currentTarget?.value) $locale = e.currentTarget.value;
	}}
>
	{#each languages as { code, name } (code)}
		<option class="bg-red-400" value={code}>{name}</option>
	{/each}
</select>
