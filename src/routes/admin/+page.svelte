<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { logout, login } from '$lib/auth/UserManager';
	import MemberRow from '$lib/adminPage/MemberRow.svelte';
	import ColumnHeader from '$lib/adminPage/ColumnHeader.svelte';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	let loading = $derived(!data.authenticated);
	let sortKey = $state<'name' | 'email' | 'graduationYear'>('name');
	let sortDirection = $state<1 | -1>(1);

	const members = $derived.by(() => {
		const list = data.members ?? [];
		return [...list].sort((a, b) => {
			let comparison = 0;

			switch (sortKey) {
				case 'name':
					comparison = a.name.localeCompare(b.name);
					break;
				case 'email':
					comparison = a.email.localeCompare(b.email);
					break;
				case 'graduationYear':
					comparison = a.graduationYear - b.graduationYear;
					break;
			}

			return comparison * sortDirection;
		});
	});

	function toggleSort(key: 'name' | 'email' | 'graduationYear') {
		if (sortKey === key) {
			sortDirection = sortDirection * -1;
			return;
		}

		sortKey = key;
		sortDirection = 1;
	}

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
	<div class="mx-4 p-4 md:mx-24 md:p-8">
		<div class="flex flex-row items-baseline">
			<h1 class=" text-3xl font-bold md:text-5xl">{$_('page.admin.title')}</h1>

			<div class="ml-auto flex items-center">
				<p class="mr-3 py-3">{$_('page.admin.logged_in')}: {data.user?.preferred_username}</p>

				<button
					onclick={logout}
					class="max-w-24 rounded-md bg-(--contrast-bg-red) px-2 py-2 text-sm text-nowrap
		text-white transition-colors duration-200 hover:bg-(--color-red-dark) active:bg-(--color-red-dark)"
					aria-label="Logout"
				>
					{$_('page.admin.logout')}
				</button>
			</div>
		</div>
		<h3 class=" text-lg text-(--color-gray)">
			{$_('page.admin.member_count') + ' ' + (data.members ? data.members.length : 0)}
		</h3>

		{#if form?.success && form?.notice}
			<p
				class="mt-4 rounded-xl border border-(--contrast-text-green) bg-(--contrast-text-green)/20 px-4 py-3 text-sm"
			>
				{$_(form.notice)}
			</p>
		{/if}

		<table class="mt-5 w-full table-auto">
			<thead class="m-200 text-left font-bold text-(--contrast-text-red)">
				<tr>
					<ColumnHeader
						label={$_('page.admin.name')}
						columnKey="name"
						activeSortKey={sortKey}
						{sortDirection}
						sortable={true}
						onclick={() => toggleSort('name')}
					/>

					<ColumnHeader
						label={$_('page.admin.email')}
						columnKey="email"
						activeSortKey={sortKey}
						{sortDirection}
						sortable={true}
						onclick={() => toggleSort('email')}
					/>
					<ColumnHeader label={$_('page.admin.phone_number')} sortable={false} />
					<ColumnHeader
						label={$_('page.admin.graduation_year')}
						columnKey="graduationYear"
						activeSortKey={sortKey}
						{sortDirection}
						sortable={true}
						onclick={() => toggleSort('graduationYear')}
					/>
					<ColumnHeader label={$_('page.admin.birth_year')} sortable={false} />
					<ColumnHeader label={$_('page.admin.action')} sortable={false} />
				</tr>
			</thead>
			<tbody>
				{#if members && members.length > 0}
					{#each members as member (member.id)}
						<MemberRow {member} {form} />
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
