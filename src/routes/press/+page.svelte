<script>
	import { resolve } from '$app/paths';
	export let data;
</script>

<svelte:head>
	<title>Press</title>
	<meta name="description" content="Read recent press releases from Students for Palestine" />
</svelte:head>
<div class="mx-auto max-w-5xl p-4 font-sans md:p-8">
	<h1 class="mb-8 text-3xl font-bold md:text-7xl">Pressemeldinger</h1>
	<p class="mb-12 text-lg md:text-xl">
		Her finner du alle våre pressemeldinger. <br />
		Presse kan kontakte oss på
		<a
			href="mailto:styret@studenterforpalestina.no"
			class="200 text-(--color-red) transition hover:text-(--color-dark-red)"
		>
			styret@studenterforpalestina.no
		</a>
	</p>
	{#each data.posts as post (post.slug)}
		<div class="mx-8 mb-8 max-w-2xl md:max-w-3xl">
			<time class="text-(--color-red)">{post.date}</time>
			<a
				href={resolve(`/press/${post.slug}`)}
				class="mb-6 block cursor-pointer rounded-md
             transition-colors
        duration-200 hover:text-(--color-red) active:bg-(--color-red)/40"
			>
				<h2 class="text-3xl font-semibold">{post.title}</h2>
				<p class="mt-2 text-lg text-(--body-text)/60 duration-200">Les mer</p>
			</a>
		</div>
	{/each}
</div>
