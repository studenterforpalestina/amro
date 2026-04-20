<script lang="ts">
	import { _ } from 'svelte-i18n';
	import StandardButton from '$lib/components/StandardButton.svelte';
	import { newsTags, type Post } from '$lib/types';
	import { enhance } from '$app/forms';
	let { postData, newPost }: { postData: Post; newPost: boolean } = $props();
</script>

<div class="mx-auto max-w-2xl p-8">
	<h1 class="mb-6 text-2xl font-bold">
		{newPost ? $_('page.news.create_post') : $_('page.news.edit_post')}
	</h1>

	<form class="flex flex-col gap-4" method="POST" use:enhance>
		<label class="flex flex-col gap-1">
			<span class="font-medium">{$_('page.news.form.title')}</span>
			<input
				type="text"
				name="title"
				value={postData.title}
				class="rounded border p-2 text-black"
			/>
		</label>

		<label class="flex flex-col gap-1">
			<span class="font-medium">{$_('page.news.form.category')}</span>
			<select name="tag" class="rounded border p-2 text-black">
				{#each newsTags as tag (tag)}
					<option value={tag} selected={postData.tag === tag}>
						{$_(`page.news.tags.${tag}`)}
					</option>
				{/each}
			</select>

			<label class="flex flex-col gap-1">
				<span class="font-medium">{$_('page.news.form.author')}</span>
				<input
					type="text"
					name="author"
					value={postData.authors?.join(', ')}
					class="rounded border p-2 text-black"
				/>
			</label>
			<label class="flex flex-col gap-1">
				<span class="font-medium">{$_('page.news.form.content')}</span>
				<textarea name="content" rows="10" class="rounded border bg-white p-2 text-black">
					{postData.content}
				</textarea>
			</label>

			<div class="flex gap-2 pt-2">
				<button
					type="submit"
					class="rounded bg-(--color-green) px-4 py-2 text-white hover:cursor-pointer"
				>
					{$_('common.save_changes')}
				</button>
				<StandardButton asLink={true} href="/news" size="medium">
					{$_('common.cancel')}
				</StandardButton>
			</div>
		</label>
	</form>
</div>
