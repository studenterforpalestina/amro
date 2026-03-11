<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { logout, login } from '$lib/auth/UserManager';
	import MemberRow from '$lib/adminPage/MemberRow.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let loading = $derived(!data.authenticated);

	onMount(async () => {
		if (!data.authenticated) {
			await login();
		}
	});
</script>

<svelte:head>
	<title>{$_('page.admin.title')}</title>
</svelte:head>

{#if loading}
	<div class="flex h-screen items-center justify-center">
		<p>{$_('page.admin.loading')}</p>
	</div>
{:else}
	<div class="mx-24 p-4 md:p-8">
		<div class="flex flex-row items-baseline">
			<h1 class="text-5xl font-bold">{$_('page.admin.title')}</h1>

			<div class="ml-auto flex items-center">
				<p class="mr-3 py-3">{$_('page.admin.logged_in')}: {data.user?.preferred_username}</p>

				<button
					onclick={logout}
					class="max-w-24 rounded-md bg-(--color-red) px-2 py-2 text-sm text-nowrap
		text-white transition-colors duration-200 hover:bg-red-800 active:bg-red-900"
				>
					{$_('page.admin.logout')}
				</button>
			</div>
		</div>

		<table class="mt-5 w-full table-auto border-collapse border-spacing-20">
			<thead class="m-200 text-left font-bold text-(--color-red)">
				<tr>
					<th scope="col" class="p-2">{$_('page.admin.name')}</th>
					<th scope="col" class="p-2">{$_('page.admin.email')}</th>
					<th scope="col" class="p-2">{$_('page.admin.phone_number')}</th>
					<th scope="col" class="p-2">{$_('page.admin.graduation_year')}</th>
					<th scope="col" class="p-2">{$_('page.admin.birth_year')}</th>
					<th scope="col" class="p-2">{$_('page.admin.action')}</th>
				</tr>
			</thead>
			<tbody>
				{#if data.members && data.members.length > 0}
					{#each data.members as member (member.id)}
						<MemberRow {member} />
					{/each}
				{:else}
					<tr>
						<td colspan="6" class="p-2 text-center">
							{$_('page.admin.no_members_found')}
						</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
{/if}
