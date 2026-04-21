<script lang="ts">
	let { slug }: { slug: string } = $props();
	import { resolve } from '$app/paths';
</script>

<a href={resolve(`/news/${slug}/edit`)} class="text-lg duration-200 hover:opacity-60"> Rediger </a>
