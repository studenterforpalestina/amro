<script>
    import { onMount } from 'svelte';
    import { _ } from 'svelte-i18n';
    import { getUser, login } from '$lib/auth/UserManager';

    let user = null;
    let loading = true;

    onMount(async () => {
        try {
            // Check if the user is already logged in
            user = await getUser();
            
            if (!user) {
                // If no user session exists, redirect to Authentik
                await login();
            } else {
                // User is authenticated!
                loading = false;
            }
        } catch (err) {
            console.error("Auth check failed:", err);
        }
    });
</script>

<svelte:head>
    <title>{$_('Admin page')}</title>
</svelte:head>

{#if loading}
    <div>
        <p>Verifying permissions...</p>
    </div>
{:else}
    <div>
        <h1>ADMIN PAGE</h1>
        <p>Logged in as: {user?.profile.preferred_username}</p>
    </div>
{/if}
