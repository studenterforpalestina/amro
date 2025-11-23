<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '$lib/footer/Footer.svelte';
	import Navbar from '$lib/navbar/Navbar.svelte';
	import '../i18n';
	import { isLoading } from 'svelte-i18n';

	const { children } = $props();

	import '../app.css';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if $isLoading}
	<!-- TODO: Loading animation -->
{:else}
	<Navbar />
	{@render children()}
	<Footer />
{/if}
