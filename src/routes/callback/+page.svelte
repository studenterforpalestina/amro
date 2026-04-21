<script lang="ts">
	import { onMount } from 'svelte';
	import { goto, invalidate } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { userManager } from '$lib/auth/UserManager';

	onMount(async () => {
		try {
			const user = await userManager.signinRedirectCallback();
			await fetch('/api/auth', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ access_token: user.access_token })
			});
			await invalidate('app:auth');
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
