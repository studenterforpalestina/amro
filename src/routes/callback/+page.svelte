<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { userManager } from '$lib/auth/UserManager';

	onMount(async () => {
		try {
			await userManager.signinRedirectCallback();
			goto(resolve('/admin'));
		} catch (error) {
			console.error('Authentication callback failed:', error);
			goto(resolve('/'));
		}
	});
</script>

<div class="flex h-screen items-center justify-center">
	<p>Completing login...</p>
</div>
