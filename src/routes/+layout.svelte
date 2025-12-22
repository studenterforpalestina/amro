<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '$lib/footer/Footer.svelte';
	import Navbar from '$lib/navbar/Navbar.svelte';

	const { children } = $props();

	import '../app.css';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />
<Footer />

{@render children()}
