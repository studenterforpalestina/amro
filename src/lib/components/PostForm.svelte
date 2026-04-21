<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { newsTags, type NewsTag, type Post } from '$lib/types';
	import { enhance } from '$app/forms';
	let { postData, newPost }: { postData?: Post; newPost: boolean } = $props();

	const inputClass =
		'w-full rounded-xl border border-gray-400/40 bg-transparent p-2.5 transition-all outline-none focus:border-(--color-green) focus:ring-2 focus:ring-(--color-green)';
	const labelClass = 'ml-1 text-sm font-semibold opacity-70';
	let selectedTag = $state<NewsTag>(newsTags[0]);

	onMount(() => {
		selectedTag = postData?.tag ?? newsTags[0];
	});
</script>

<div class="mx-auto max-w-2xl p-8 text-(--body-text)">
	<h1 class="mb-6 text-2xl font-bold md:text-3xl">
		{newPost ? $_('page.news.create_post') : $_('page.news.edit_post')}
	</h1>

	<form class="space-y-4" method="POST" use:enhance>
		<label class="flex flex-col gap-1">
			<span class={labelClass}>{$_('page.news.form.title')}</span>
			<input type="text" name="title" value={postData?.title} required={true} class={inputClass} />
		</label>

		<label class="flex flex-col gap-1">
			<span class={labelClass}>{$_('page.news.form.category')}</span>
			<select name="tag" class={inputClass} bind:value={selectedTag}>
				{#each newsTags as tag (tag)}
					<option value={tag}>
						{$_(`page.news.tags.${tag}`)}
					</option>
				{/each}
			</select>
		</label>

		<label class="flex flex-col gap-1" class:hidden={selectedTag !== 'presscoverage'}>
			<span class={labelClass}>{$_('page.news.form.url')}</span>
			<input
				type="url"
				name="url"
				value={postData?.url}
				required={selectedTag === 'presscoverage'}
				class={inputClass}
			/>
		</label>

		<label class="flex flex-col gap-1">
			<span class={labelClass}>{$_('page.news.form.author')}</span>
			<input type="text" name="author" value={postData?.author} class={inputClass} />
		</label>

		<label class="flex flex-col gap-1" class:hidden={selectedTag === 'presscoverage'}>
			<span class={labelClass}>{$_('page.news.form.content')}</span>
			<textarea
				name="content"
				rows="10"
				required={selectedTag !== 'presscoverage'}
				class={`${inputClass} resize-y`}
				>{postData?.content}</textarea
			>
		</label>

		<div class="flex gap-3 pt-2">
			<a
				href={resolve('/news')}
				class="flex-1 rounded-xl border border-gray-500/20 py-2.5 text-center font-medium hover:bg-gray-500/5"
			>
				{$_('common.cancel')}
			</a>
			<button
				type="submit"
				class="flex-1 rounded-xl bg-(--color-red) py-2.5 font-medium text-white shadow-sm hover:brightness-110"
			>
				{$_('common.save_changes')}
			</button>
		</div>
	</form>
</div>
