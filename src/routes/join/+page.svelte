<script>
	import { _ } from 'svelte-i18n';
	let { data, form } = $props();
</script>

<svelte:head>
	<title>{$_('page.join.title')}</title>
	<meta name="description" content={$_('page.join.description')} />
	<link rel="icon" href="/images/logo.png" />
</svelte:head>
<div class="mx-auto max-w-5xl p-4 font-sans md:p-8">
	<h1 class="mb-4 text-3xl font-bold md:mb-8 md:text-7xl">{$_('page.join.header')}</h1>
	<p class="mb-8 text-lg">{$_('page.join.description')}</p>
	{#if form?.errors}
		<p class="mb-8 text-sm text-(--color-red)">{JSON.stringify(form.errors)}</p>
	{/if}
	<form class="mx-auto flex max-w-2xl flex-col gap-5 p-6 md:p-8" method="POST">
		<div class="space-y-2">
			<label for="name" class="text-sm font-medium">{$_('page.join.name_label')}</label>
			<input
				id="name"
				name="name"
				type="text"
				class="w-full rounded-xl border border-gray-400 bg-transparent p-2.5 transition-all outline-none focus:border-(--color-green) focus:ring-2 focus:ring-(--color-green)"
				value={form?.name || ''}
				placeholder={$_('page.join.name_placeholder')}
				required
			/>
		</div>

		<div class="space-y-2">
			<label for="email" class="text-sm font-medium">{$_('page.join.email_label')}</label>
			<input
				id="email"
				name="email"
				type="email"
				class="w-full rounded-xl border border-gray-400 bg-transparent p-2.5 transition-all outline-none focus:border-(--color-green) focus:ring-2 focus:ring-(--color-green)"
				placeholder={$_('page.join.email_placeholder')}
				value={form?.email || ''}
				autocomplete="email"
				required
			/>
		</div>

		<div class="space-y-2">
			<label for="phone" class="text-sm font-medium">{$_('page.join.phone_label')}</label>
			<input
				id="phone"
				name="phone"
				type="tel"
				class="w-full rounded-xl border border-gray-400 bg-transparent p-2.5 transition-all outline-none focus:border-(--color-green) focus:ring-2 focus:ring-(--color-green)"
				placeholder={$_('page.join.phone_placeholder')}
				autocomplete="tel"
				value={form?.phone || ''}
				required
			/>
		</div>

		<div class="grid gap-5 md:grid-cols-2">
			<div class="space-y-2">
				<label for="birthYear" class="text-sm font-medium">{$_('page.join.birth_year_label')}</label
				>
				<input
					id="birthYear"
					name="birthYear"
					type="number"
					class="w-full rounded-xl border border-gray-400 bg-transparent p-2.5 transition-all outline-none focus:border-(--color-green) focus:ring-2 focus:ring-(--color-green)"
					placeholder={$_('page.join.birth_year_placeholder')}
					inputmode="numeric"
					min="1900"
					max="2100"
					value={form?.birthYear || ''}
					required
				/>
			</div>

			<div class="space-y-2">
				<label for="graduationYear" class="text-sm font-medium"
					>{$_('page.join.graduation_year_label')}</label
				>
				<input
					id="graduationYear"
					name="graduationYear"
					type="number"
					class="w-full rounded-xl border border-gray-400 bg-transparent p-2.5 transition-all outline-none focus:border-(--color-green) focus:ring-2 focus:ring-(--color-green)"
					placeholder={$_('page.join.graduation_year_placeholder')}
					inputmode="numeric"
					min="1900"
					max="2100"
					value={form?.graduationYear || ''}
					required
				/>
			</div>
		</div>

		<label for="newsletter" class="mt-1 flex items-start gap-3">
			<input
				type="checkbox"
				id="newsletter"
				name="newsletter"
				class="mt-1 h-4 w-4 rounded border-gray-400 text-(--color-green) focus:ring-(--color-green)"
			/>
			<span>{$_('page.join.newsletter_label')}</span>
		</label>

		<button
			type="submit"
			class="w-30 rounded-xl bg-(--color-green) px-4 py-2 text-white transition-all hover:bg-(--color-green)/60"
		>
			{$_('page.join.submit_button')}
		</button>
		<p class="text-sm text-gray-500">{$_('page.join.consent_label')}</p>
	</form>
</div>
