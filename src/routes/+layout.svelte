<script lang="ts">
	import './layout.css';
	import Footer from '$lib/footer/Footer.svelte';
	import Navbar from '$lib/navbar/Navbar.svelte';
	import '../i18n';
	import { isLoading } from 'svelte-i18n';

	const { children } = $props();

	import '../app.css';
</script>

<svelte:head>
	<title>Studenter for Palestina Trondheim</title>
	<link rel="icon" href="/images/logo.png" />
</svelte:head>

{#if $isLoading}
	<!-- TODO: Loading animation -->
{:else}
	<Navbar />
	{@render children()}
	<Footer />
{/if}
