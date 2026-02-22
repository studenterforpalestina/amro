<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { getUser, logout, login } from '$lib/auth/UserManager';
	import type { User } from 'oidc-client-ts';
	import MemberRow from '$lib/adminPage/MemberRow.svelte';

	export let data;

	let user: User | null = null;
	let loading = true;

	onMount(async () => {
		try {
			user = await getUser();
			if (!user) {
				await login();
			} else {
				loading = false;
				console.log('Fetched Members:', data.members);
			}
		} catch (err) {
			console.error('Auth check failed:', err);
		}
	});
</script>

<svelte:head>
	<title>{$_('Admin page')}</title>
</svelte:head>

{#if loading}
	<div>
		<p>Verifying permissions...</p>
	</div>
{:else}
	<div class="mx-24 p-4 md:p-8">
		<div class="flex flex-row items-baseline">
			<h1 class="text-5xl font-bold">ADMIN PAGE</h1>

			<div class="ml-auto flex items-center">
				<p class="mr-3 py-3">Logged in as: {user?.profile.preferred_username}</p>

				<button
					on:click={logout}
					class="max-w-24 rounded-md bg-(--color-red) px-2 py-2 text-sm text-nowrap
		text-white transition-colors duration-200 hover:bg-red-800 active:bg-red-900"
				>
					Logg out
				</button>
			</div>
		</div>

		<div
			class="mt-5 grid grid-cols-[1fr_1fr_1fr_0.8fr_0.8fr_0.5fr] rounded-md bg-(--color-red) p-2 font-bold text-gray-100"
		>
			<h3 class="">Name</h3>
			<h3>Email</h3>
			<h3>Number</h3>
			<h3>Graduation</h3>
			<h3>Birthyear</h3>
			<h3>Action</h3>
		</div>

		{#if data.members && data.members.length > 0}
			<ul class="divide-y divide-gray-400/20 overflow-auto">
				{#each data.members as member (member.id)}
					<MemberRow {member} />
				{/each}
			</ul>
		{:else}
			<p>No members found.</p>
		{/if}
	</div>
{/if}
