<script lang="ts">
	import { enhance } from '$app/forms';
	import { Trash2, SquarePen } from '@lucide/svelte';
	import EditMemberModal from '$lib/adminPage/EditMemberModal.svelte';
	import type { Member } from '$lib/types';

	export let member: Member;
	let editModal: EditMemberModal;
</script>

<li class="grid grid-cols-[1fr_1fr_1fr_0.8fr_0.8fr_0.5fr] items-center p-2">
	<span>{member.name}</span>
	<span>{member.email}</span>
	<span>{member.phoneNumber}</span>
	<span>{member.graduationYear}</span>
	<span>{member.birthYear}</span>

	<div class=" flex">
		<button
			on:click={() => editModal.show()}
			class="mx-2 rounded-xl p-2 transition-colors duration-200 hover:bg-(--color-red)/40"
		>
			<SquarePen />
		</button>

		<form method="POST" action="?/softDelete" use:enhance>
			<input type="hidden" name="id" value={member.id} />

			<button
				type="submit"
				class="mx-2 rounded-xl p-2 text-(--color-red) transition-colors duration-200 hover:bg-(--color-red)/40"
			>
				<Trash2 />
			</button>
		</form>
	</div>
</li>

<EditMemberModal bind:this={editModal} {member} />
