<script lang="ts">
    import PostForm from '$lib/components/PostForm.svelte';
    import type { PageData, ActionData } from './$types';
    
    let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<PostForm postData={data.post} newPost={false} {form} />
