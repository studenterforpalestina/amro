<script>
	import { _ } from 'svelte-i18n';
	import FacebookIcon from './social-icons/Facebook.svelte';
	import InstagramIcon from './social-icons/Instagram.svelte';
	import MailIcon from './social-icons/Mail.svelte';

	export let instagram = 'https://instagram.com/studenterforpalestina.trd';
	export let facebook =
		'https://www.facebook.com/people/Studenter-for-Palestina-Trondheim/100087592323689/';
	export let email = 'styret@studenterforpalestina.no';

	const socialLinks = [
		{ href: facebook, Icon: FacebookIcon, label: $_('common.facebook') },
		{ href: instagram, Icon: InstagramIcon, label: $_('common.instagram') },
		{
			href: `mailto:${email}`,
			Icon: MailIcon,
			label: $_('common.email_address', { values: { email } })
		}
	];
</script>

<footer class="w-full opacity-70">
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
