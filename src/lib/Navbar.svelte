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
    <div class="flex items-center justify-between p-4">
        <div class="logo-container">
            <a href="/">
                <img class="w-24" src="/images/logo.png" alt="logo" />
            </a>
        </div>

        <div class="flex">
            <button class="bg-transparent border-0 cursor-pointer" on:click={() => (dark = !dark)}>
                {#if dark}
                    <Moon />
                {:else}
                    <Sun />
                {/if}
            </button>

            <ul class="flex list-none items-center gap-4 m-0 pl-4 p-0">
                {#each data as item}
                    <li>
                        <a href={item.url} class="flex no-underline">
                            <p class="text-black text-lg">{item.string}</p> </a>
                    </li>
                {/each}

                <a href="/" class="p-2.5 text-lg no-underline rounded-md bg-[#c52128] hover:bg-[#91161b]">
                    <p class="text-white">Bli medlem</p>
                </a>
            </ul>
        </div>
    </div>
</nav>
