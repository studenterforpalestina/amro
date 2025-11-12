<script lang="ts">
    import favicon from "$lib/assets/favicon.svg";
    import Footer from "$lib/footer/footer.svelte";

    const { children } = $props();
    import "../app.css";
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<Footer />

{@render children()}
