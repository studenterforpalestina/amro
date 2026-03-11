<script lang="ts">
	import { Trash2, SquarePen } from '@lucide/svelte';
	import EditMemberModal from '$lib/adminPage/EditMemberModal.svelte';
	import DeleteMemberModal from '$lib/adminPage/DeleteMemberModal.svelte';
	import type { Member } from '$lib/types';

	let { member, form }: { member: Member; form: any } = $props();
	let editOpen = $state(false);
	let deleteOpen = $state(false);
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

		<button
			onclick={() => (deleteOpen = true)}
			aria-label="Delete {member.name}"
			class="mx-2 rounded-xl p-2 text-(--color-red) transition-colors duration-200 hover:bg-(--color-red)/10"
		>
			<Trash2 />
		</button>
	</td>
</tr>

<EditMemberModal {member} {form} bind:open={editOpen} />
<DeleteMemberModal {member} bind:open={deleteOpen} />
