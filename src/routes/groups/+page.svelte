<script>
	import { page } from '$app/state';
	import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$_('page.groups.title')}</title>
	<meta name="description" content={$_('page.groups.description')} />
</svelte:head>
<div>
	<h1 class="text-5xl font-bold p-8">{$_('page.groups.header')}</h1>
	<div class="flex gap-4 m-24">
		<div>
	<p class="text-xl p-4 bg-green-400 dark:bg-lime-600 rounded-xl text-white"> {$_('page.groups.action.title')}</p>
	<p class="p-4"> {$_('page.groups.action.description')} </p>
	</div>
	<div>
	<p class="text-xl p-4 bg-green-400 dark:bg-lime-600 rounded-xl text-white"> {$_("page.groups.design.title")}</p>
	<p class="p-4"> {$_("page.groups.design.description")} </p>
	</div>
	<div>
	<p class="text-xl p-4 bg-green-400 dark:bg-lime-600 rounded-xl text-white"> {$_("page.groups.events.title")}  </p>
	<p class="p-4"> {$_("page.groups.events.description")} </p>
	</div>
	<div>
	<p class="text-xl p-4 bg-green-400 dark:bg-lime-600 rounded-xl text-white"> {$_("page.groups.it.title")} </p>
	<p class="p-4"> {$_("page.groups.it.description")} </p>
	</div>
	<div>
	<p class="text-xl p-4 bg-green-400 dark:bg-lime-600 rounded-xl text-white"> {$_("page.groups.stand.title")} </p>
	<p class="p-4"> {$_("page.groups.stand.description")}</p>
	</div>
	<div>
	<p class="text-xl p-4 bg-green-400 dark:bg-lime-600 rounded-xl text-white"> {$_("page.groups.writing.title")} </p>
	<p class="p-4"> {$_("page.groups.writing.description")} </p>
	</div>
</div>
</div>