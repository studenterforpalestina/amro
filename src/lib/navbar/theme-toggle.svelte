<script lang="ts">
    import { MoonStar, Sun } from '@lucide/svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import { c } from '../../utils/classes';
    import { darkMode } from '$lib/stores/darkmode';

    const { class: clas, ...props }: HTMLButtonAttributes = $props();
    function toggleDarkMode() {
        darkMode.update(v => !v);
        document.documentElement.classList.toggle('dark');
    }
</script>

<button
    class={c(`bg-transparent border-0 cursor-pointer px-3 py-2 rounded-md
            hover:text-red-600 hover:bg-red-100 active:bg-red-200
            transition-colors duration-200`, clas)}
    {...props}
    onclick={() => {
        toggleDarkMode();
    }}
>
    {#if $darkMode}
        <MoonStar />
    {:else}
        <Sun />
    {/if}
</button>
