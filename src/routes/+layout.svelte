<script lang="ts">
    import favicon from "$lib/assets/favicon.svg";
    import Navbar from "$lib/Navbar.svelte";
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<Navbar />

<slot />
