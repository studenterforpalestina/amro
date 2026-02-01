<script lang="ts">
	import { enhance } from '$app/forms';
	import { Trash2, SquarePen } from '@lucide/svelte';
	import EditMemberModal from '$lib/adminPage/EditMemberModal.svelte';
	import type { Member } from '$lib/types';

	export let member: Member;
	let editModal: EditMemberModal;
</script>

<li class="grid grid-cols-6 items-center p-2 text-center">
	<span>{member.name}</span>
	<span>{member.email}</span>
	<span>{member.phoneNumber}</span>
	<span>{member.graduationYear}</span>
	<span>{member.birthYear}</span>

	<div class="gap-auto mx-auto flex">
		<button on:click={() => editModal.show()} class="mx-2 rounded-xl p-2 hover:bg-(--color-red)/40">
			<SquarePen />
		</button>

		<form method="POST" action="?/softDelete" use:enhance>
			<input type="hidden" name="id" value={member.id} />

			<button type="submit" class="mx-2 rounded-xl p-2 text-(--color-red) hover:bg-red-500/40">
				<Trash2 />
			</button>
		</form>
	</div>
</li>

<EditMemberModal bind:this={editModal} {member} />
