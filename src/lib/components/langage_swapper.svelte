<script lang="ts">
  import { locale } from 'svelte-i18n';

  
  // Set so we dont need to fetch the entire language file of all locales
  const languages = [
    { code: 'en-US', name: 'English' },
    { code: 'no-NB', name: 'Norsk' }
  ];
</script>

<select
  class="border-0 cursor-pointer px-3 py-2 rounded-md hover:text-red-600
  hover:bg-red-100 active:bg-red-200 transition-colors duration-200 text-lg"
  bind:value={$locale}
  on:change={(e) => {
    if (e?.currentTarget?.value) $locale = e.currentTarget.value
  }}
  >
  {#each languages as { code, name } (code)}
    <option class="bg-red-400" value={code}>{name}</option>
  {/each}
</select>
