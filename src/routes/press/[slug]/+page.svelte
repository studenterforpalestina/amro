<script>
	import { resolve } from '$app/paths';
	export let data;
</script>

<a
	href={resolve('/press')}
	class="mx-8 my-4 rounded-md px-3 py-2 text-lg text-nowrap text-black
                            underline transition-colors duration-200
                            hover:bg-red-100 hover:text-red-600 active:bg-red-200"
>
	← Alle pressemeldinger
</a>

<article class="mx-8 my-8 md:mx-auto md:max-w-3xl">
	<date class="text-red-700">{data.date}</date>
	<h1 class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">{data.title}</h1>
	<p class="text-md whitespace-pre-line text-gray-800 md:text-lg">{data.content}</p>
</article>
