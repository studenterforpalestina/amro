<script lang="ts">
	export let member: any;
	import { Trash2 } from '@lucide/svelte';
	import { SquarePen } from '@lucide/svelte';

  function softDeleteButton() {
    console.log("LMAO")
	}
</script>

<li class="grid grid-cols-6 items-center p-2 text-center">
	<span>{member.name}</span>
	<span>{member.email}</span>
	<span>{member.phoneNumber}</span>
	<span>{member.graduationYear}</span>
	<span>{member.birthYear}</span>

	<div class="gap-auto mx-auto flex">
		<button on:click={softDeleteButton} 
      class="p-2 mx-2 rounded-xl hover:bg-(--color-red)/40">
				<SquarePen/>
		</button>
		<button on:click={softDeleteButton} 
      class="p-2 mx-2 rounded-xl hover:bg-(--color-red)/40">
				<Trash2/>
		</button>
	</div>
</li>

