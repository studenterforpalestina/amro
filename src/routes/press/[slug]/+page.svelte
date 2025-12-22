<script>
    export let data;
    console.log(data);
</script>

<a href="/press" class="underline rounded-md my-4 mx-8 px-3 py-2 text-lg text-nowrap
                            text-black transition-colors duration-200
                            hover:bg-red-100 hover:text-red-600 active:bg-red-200">
    ← Alle pressemeldinger
</a>

<article class="max-w-3xl mx-auto my-8">
    <date class="text-red-700">{data.date}</date>
    <h1 class="mb-4 text-3xl font-bold text-gray-900">{data.title}</h1>
    <p class="text-lg text-gray-800 whitespace-pre-line">{data.content}</p>
</article>
