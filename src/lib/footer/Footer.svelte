<script>
	import FacebookIcon from './social_icons/facebook.svelte';
	import InstagramIcon from './social_icons/instagram.svelte';
	import MailIcon from './social_icons/mail.svelte';

	export let instagram = 'https://instagram.com/studenterforpalestina.trd';
	export let facebook =
		'https://www.facebook.com/people/Studenter-for-Palestina-Trondheim/100087592323689/';
	export let email = 'styret@studenterforpalestina.no';

	const socialLinks = [
		{ href: facebook, Icon: FacebookIcon, label: 'Facebook' },
		{ href: instagram, Icon: InstagramIcon, label: 'Instagram' },
		{ href: `mailto:${email}`, Icon: MailIcon, label: `Email ${email}` }
	];
</script>

<footer class="absolute bottom-0 opacity-70">
	<ul class="m-10 flex list-none items-center gap-4 p-0">
		{#each socialLinks as { href, Icon, label } (href)}
			<li>
				<button
					on:click={() => (window.location.href = href)}
					aria-label={label}
					class="inline-flex h-10 w-10
                           items-center justify-center rounded-md
                           text-gray-700 transition-colors duration-200 hover:bg-(--color-red)/10
                           hover:text-(--color-red) dark:text-gray-100"
				>
					<Icon />
				</button>
			</li>
		{/each}
	</ul>
</footer>
