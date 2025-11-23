<script lang="ts">
    import { MoonStar, Sun } from '@lucide/svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import { c } from '../../utils/classes';


    let dark = $state(false);

    const { class: clas, ...props }: HTMLButtonAttributes = $props();
</script>

<button
    class={c(`bg-transparent border-0 cursor-pointer px-3 py-2 rounded-md
            hover:text-red-600 hover:bg-red-100 active:bg-red-200
            transition-colors duration-200`, clas)}
    {...props}
    onclick={() => (dark = !dark)}
>
    {#if dark}
        <MoonStar />
    {:else}
        <Sun />
    {/if}
</button>