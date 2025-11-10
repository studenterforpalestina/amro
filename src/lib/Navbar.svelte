<script lang="ts">
    import Moon from "./Moon.svelte";
    import Sun from "./Sun.svelte";

    let data = [
        { url: "events", string: "Hva skjer?" },
        { url: "groups", string: "Komiteer" },
    ];
    let dark = false;
</script>

<style>
.parent{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
}
.right-side{
    display:flex
} 

.logo  {
    width: 64px;
}

ul {
    display: flex;
    list-style-type: none;
    align-items: center;
    gap: 1rem;
    margin: 0px;
    padding: 0px 0px 0px 1em;
}

a {
    display: flex;
    text-decoration: none;
    color:black;
}

.theme-button{
    background-color: transparent;
    border: none;
}

.red-button {
    padding: 10px;
    border-radius: 5px;
    background-color: #C52128;
    color: white;
}
</style>

<nav>
    <div class="flex items-center justify-between px-10 py-6">
        <a href="/">
            <img class="w-16" src="/images/logo.png" alt="logo" />
        </a>
        <ul class="flex list-none items-center gap-10">
            <button class="bg-transparent border-0 cursor-pointer" on:click={() => (dark = !dark)}>
                {#if dark}
                  <Moon />
                {:else}
                  <Sun />
                {/if}
            </button>
            {#each data as item}
                <li>
                    <a href={item.url} class="flex">
                        <p class="text-black text-lg">{item.string}</p> </a>
                </li>
            {/each}

            <a href="https://docs.google.com/forms/d/e/1FAIpQLScR_Y7bGd3znYgbsZC6ECHexUsgjfZkyZYIaTvPtE7nsLSukg/viewform" class="px-4 py-3 text-lg rounded-lg bg-[var(--color-red)] hover:bg-[var(--color-dark-red)] transition-colors duration-300">
                <p class="text-white">Bli medlem</p>
            </a>
        </ul>
    </div>
</nav>
