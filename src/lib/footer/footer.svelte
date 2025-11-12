<script>
    import FacebookIcon from "./social_icons/facebook.svelte"
    import InstagramIcon from "./social_icons/instagram.svelte"
    import MailIcon from "./social_icons/mail.svelte"

    export let instagram = "https://instagram.com/studenterforpalestina.trd"
    export let facebook =
        "https://www.facebook.com/people/Studenter-for-Palestina-Trondheim/100087592323689/"
    export let email = "styret@studenterforpalestina.no"

    const socialLinks = [
        { href: facebook, Icon: FacebookIcon, label: "Facebook" },
        { href: instagram, Icon: InstagramIcon, label: "Instagram" },
        { href: `mailto:${email}`, Icon: MailIcon, label: `Email ${email}` },
    ]
</script>

<footer class="absolute bottom-0 opacity-70">
    <ul class="flex items-center m-10 p-0 gap-4 list-none">
        {#each socialLinks as { href, Icon, label }}
            <li>
                <a
                    {href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:")
                        ? undefined
                        : "noopener noreferrer"}
                    aria-label={label}
                    class="inline-flex items-center justify-center w-10 h-10 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-100 transition-colors duration-200"
                >
                    <Icon />
                </a>
            </li>
        {/each}
    </ul>
</footer>
