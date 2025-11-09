<script lang="ts">
    import favicon from "$lib/assets/favicon.svg";
    import Navbar from "$lib/Navbar.svelte";

const { children } = $props();
import "../app.css";
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<Navbar />

<slot />
