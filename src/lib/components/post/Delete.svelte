<script lang="ts">
	import { enhance } from '$app/forms';

	export let id: string;
</script>

<form method="POST" action="?/softDelete" use:enhance>
	<input type="hidden" name="id" value={id} />

	<button type="submit" class="text-lg text-(--color-red) duration-200 hover:text-(--color-red)/60"
		>Slett</button
	>
</form>
