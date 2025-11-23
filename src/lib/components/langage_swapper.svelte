<script lang="ts">
	import { locale } from 'svelte-i18n';

	// Set so we dont need to fetch the entire language file of all locales
	const languages = [
		{ code: 'en', name: 'English' },
		{ code: 'no-NB', name: 'Norsk' }
	];
</script>

<select
	class="cursor-pointer rounded-md border-0 px-3 py-2
               text-lg transition-colors duration-200
               hover:bg-red-100 hover:text-red-600 active:bg-red-200"
	bind:value={$locale}
	on:change={(e) => e?.target?.value && locale.set(e.target.value)}
>
	{#each languages as { code, name } (code)}
		<option class="bg-red-400" value={code}>{name}</option>
	{/each}
</select>
