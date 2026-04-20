<script lang="ts">
	import PostForm from '$lib/components/PostForm.svelte';
	import type { PageData } from '../$types';
	let { data }: { data: PageData } = $props();
</script>

<PostForm postData={data.post} newPost={false} />
