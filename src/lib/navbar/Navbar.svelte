<script lang="ts">
    import Moon from "./Moon.svelte";
    import Sun from "./Sun.svelte";

    let data = [
        { url: "events", string: "Hva skjer?" },
        { url: "groups", string: "Komiteer" },
    ];
    let dark = false;
</script>

<nav>
    <div class="flex items-center justify-between px-10 py-6">
        <a href="/">
            <img class="w-16" src="/images/logo.png" alt="logo" />
        </a>
        <ul class="flex list-none items-center gap-10">
            <li>
                <button 
                    class="bg-transparent border-0 cursor-pointer px-3 py-2 rounded-md
                           hover:text-red-600 hover:bg-red-100 active:bg-red-200
                           transition-colors duration-200"
                    on:click={() => (dark = !dark)}>
                    {#if dark}
                        <Moon />
                    {:else}
                        <Sun />
                    {/if}
                </button>
            </li>
            {#each data as item}
                <li>
                    <a 
                        href={item.url} 
                        class="flex text-black text-lg px-3 py-2 rounded-md 
                               hover:text-red-600 hover:bg-red-100 active:bg-red-200
                               transition-colors duration-200">
                        {item.string} 
                    </a>
                </li>
            {/each}
            <li>
                <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLScR_Y7bGd3znYgbsZC6ECHexUsgjfZkyZYIaTvPtE7nsLSukg/viewform"
                    class="px-4 py-3 text-lg text-white rounded-lg bg-[var(--color-red)] 
                           hover:bg-red-800 active:bg-red-900
                           transition-colors duration-200">
                    Bli medlem
                </a>
            </li>
        </ul>
    </div>
</nav>
