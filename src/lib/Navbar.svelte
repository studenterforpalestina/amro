<script lang="ts">
    import data from "../config.json"
    import Sun from "./Sun.svelte"
    import Moon from "./Moon.svelte"

    let dark = false
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
    <div class="parent">
        <div class="logo-container">
            <a href="/" >
                <img class="logo" src="/images/logo.png" alt="logo" />
            </a>
        </div>

        <div class="right-side">
            <button class="theme-button" on:click={() => (dark = !dark)}>
                {#if dark}
                  <Moon />
                {:else}
                  <Sun />
                {/if}
            </button>

            <ul>
                {#each data.navbar as item}
                  <li><a href="/">{item}</a></li>
                {/each}
                  <a class="red-button" href="/">Støtt oss</a>
            </ul>
        </div>
    </div>
</nav>
