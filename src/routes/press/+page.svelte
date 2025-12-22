<script>
	import { resolve } from '$app/paths';
	export let data;
</script>

<svelte:head>
	<title>Press</title>
	<meta name="description" content="Read recent press releases from Students for Palestine" />
</svelte:head>
<div class="mx-auto max-w-5xl p-4 font-sans md:p-8">
	<h1 class="mb-8 text-3xl font-bold text-gray-900 md:text-7xl">Pressemeldinger</h1>
	<p class="mb-12 text-lg text-gray-800 md:text-xl">
		Her finner du alle våre pressemeldinger. <br />
		Presse kan kontakte oss på
		<a
			href="mailto:styret@studenterforpalestina.no"
			class="200 text-red-600 underline transition hover:text-red-800"
		>
			styret@studenterforpalestina.no
		</a>
	</p>
	{#each data.posts as post (post.slug)}
		<div class="mx-8 mb-8 max-w-2xl md:max-w-3xl">
			<date class="text-red-600">{post.date}</date>
			<a
				href={resolve(`/press/${post.slug}`)}
				class="mb-6 block cursor-pointer rounded-md
            text-black transition-colors
        duration-200 hover:text-red-600 active:bg-red-200"
			>
				<h2 class="text-3xl font-semibold">{post.title}</h2>
				<p class="mt-2 text-lg text-gray-800 duration-200 hover:text-gray-500">Les mer</p>
			</a>
		</div>
	{/each}
</div>
