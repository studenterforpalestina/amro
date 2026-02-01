<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { userManager } from '$lib/auth/UserManager';

	onMount(async () => {
		try {
			await userManager.signinRedirectCallback();
			goto('/admin');
		} catch (error) {
			console.error('Authentication callback failed:', error);
			goto('/');
		}
	});
</script>

<div class="flex h-screen items-center justify-center">
	<p>Completing login...</p>
</div>
