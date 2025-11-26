<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import CustomFooter from "$lib/footer/CustomFooter.svelte";
	import Navbar from "$lib/navbar/Navbar.svelte";

	const { children } = $props();
	import "../app.css";
</script>

<svelte:head>
	<link rel="icon" href={favicon}>
</svelte:head>

<Navbar/>
<CustomFooter/>

{@render children()}
