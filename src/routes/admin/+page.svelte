<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { getUser, login } from '$lib/auth/UserManager';
	import type { User } from 'oidc-client-ts';
	import MemberRow from '$lib/components/MemberRow.svelte';

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
	<div class="p-5">
		<div class="flex flex-row items-baseline">
			<h1 class="text-5xl">ADMIN PAGE</h1>
			<p class="ml-auto">Logged in as: {user?.profile.preferred_username}</p>
		</div>

		<div
			class="my-5 grid grid-cols-6 items-center rounded-lg bg-(--color-red) p-2 text-center font-bold text-white"
		>
			<h3 class="text-xl">Name</h3>
			<h3 class="text-xl">Email</h3>
			<h3 class="text-xl">Number</h3>
			<h3 class="text-xl">Graduation</h3>
			<h3 class="text-xl">Birthyear</h3>
			<h3 class="text-xl">Action</h3>
		</div>

		{#if data.members && data.members.length > 0}
			<ul class=" h-120 divide-y divide-gray-400 overflow-auto">
				{#each data.members as member (member.id)}
					<MemberRow {member} />
				{/each}
			</ul>
		{:else}
			<p>No members found.</p>
		{/if}
	</div>
{/if}
