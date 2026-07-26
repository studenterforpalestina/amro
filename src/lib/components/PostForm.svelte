<script lang="ts">
	import { resolve } from '$app/paths';
	import { _ } from 'svelte-i18n';
	import { newsTags, type NewsTag, type Post } from '$lib/types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	interface PostFormActionData {
		success?: boolean;
		errors?: {
			form?: string;
			[key: string]: string | undefined;
		};
	}

	let {
		postData,
		newPost,
		form
	}: {
		postData?: Post;
		newPost: boolean;
		form?: PostFormActionData | null;
	} = $props();

	const inputClass =
		'w-full rounded-xl border border-gray-400/40 bg-transparent p-2.5 transition-all outline-none focus:border-(--color-green) focus:ring-2 focus:ring-(--color-green)';
	const labelClass = 'ml-1 text-sm font-semibold opacity-70';

	let selectedTag = $state<NewsTag>(newsTags[0]);
	let saveTime = $state<string | null>(null);

	$effect(() => {
		if (postData?.tag) {
			selectedTag = postData.tag;
		}
	});

	const handleFormSubmit: SubmitFunction = () => {
		return async ({ update, result }) => {
			await update({ reset: false });

			if (result.type === 'success') {
				saveTime = new Date().toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit',
					hour12: false
				});
			}
		};
	};
</script>
