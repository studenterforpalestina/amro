<script>
	import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$_('page.groups.title')}</title>
	<meta name="description" content={$_('page.groups.description')} />
</svelte:head>
<div>
	<h1 class="text-5xl font-bold p-8">{$_('page.groups.header')}</h1>
	<div class="flex gap-4 m-8">
		<div>
	<p class="text-xl p-4 bg-(--color-red) rounded-xl text-white"> Action Committee </p>
	<p class="p-4"> The action committee organize and coordinate actions and demonstrations. </p>
	</div>
	<div>
	<p class="text-xl p-4 bg-(--color-red) rounded-xl text-white"> Design and Social Media </p>
	<p class="p-4"> Design and Social Media are responsible for all our graphic designs and all posts on our different platforms LINK TO DIFF PLATFORMS HERE ?? </p>
	</div>
	<div>
	<p class="text-xl p-4 bg-(--color-red) rounded-xl text-white"> Events Committee  </p>
	<p class="p-4"> The events committee are responsible for planning events, both social and cultural. </p>
	</div>
	<div>
	<p class="text-xl p-4 bg-(--color-red) rounded-xl text-white"> IT Committee </p>
	<p class="p-4"> The IT committee work with managing and developing the digital solutions of the organization. </p>
	</div>
	<div>
	<p class="text-xl p-4 bg-(--color-red) rounded-xl text-white"> Stand Committee </p>
	<p class="p-4"> The stand committee are responsible for stands, posters, and recruitment on campus.</p>
	</div>
	<div>
	<p class="text-xl p-4 bg-(--color-red) rounded-xl text-white"> Writing Group </p>
	<p class="p-4"> The writing group are tasked with writing texts, opinion pieces and other works of similar nature.  </p>
	</div>
</div>
</div>