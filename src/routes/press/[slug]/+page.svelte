<script>
	import { resolve } from '$app/paths';
	export let data;
</script>

<a
	href={resolve('/press')}
	class="mx-8 my-4 rounded-md px-3 py-2 text-lg text-nowrap
                            underline transition-colors duration-200
                            hover:bg-(--color-red)/10 hover:text-(--color-red) active:bg-(--color-red)/40"
>
	← Alle pressemeldinger
</a>

<article class="mx-8 my-8 md:mx-auto md:max-w-3xl">
	<time class="text-(--color-red)">{data.date}</time>
	<h1 class="mb-4 text-2xl font-bold md:text-3xl">{data.title}</h1>
	<p class="text-md whitespace-pre-line md:text-lg">{data.content}</p>
</article>
