<script lang="ts">
	import { enhance } from '$app/forms';
	import { Trash2, SquarePen } from '@lucide/svelte';
	import EditMemberModal from '$lib/adminPage/EditMemberModal.svelte';
	import type { Member } from '$lib/types';

	let { member }: { member: Member } = $props();
	let editOpen = $state(false);
</script>

<tr class="border-b border-gray-400/20">
	<td class="p-2">{member.name}</td>
	<td class="p-2">{member.email}</td>
	<td class="p-2">{member.phoneNumber}</td>
	<td class="p-2">{member.graduationYear}</td>
	<td class="p-2">{member.birthYear}</td>

	<td class="flex p-2">
		<button
			onclick={() => (editOpen = true)}
			aria-label="Edit {member.name}"
			class="mx-2 rounded-xl p-2 transition-colors duration-200 hover:bg-(--color-red)/10"
		>
			<SquarePen />
		</button>

		<form method="POST" action="?/softDelete" use:enhance>
			<input type="hidden" name="id" value={member.id} />

			<button
				type="submit"
				class="mx-2 rounded-xl p-2 text-(--color-red) transition-colors duration-200 hover:bg-(--color-red)/10"
			>
				<Trash2 />
			</button>
		</form>
	</td>
</tr>

<EditMemberModal {member} bind:open={editOpen} />
