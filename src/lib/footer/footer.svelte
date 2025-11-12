<script>
    import FacebookIcon from "./social_icons/facebook.svelte"
    import InstagramIcon from "./social_icons/instagram.svelte"
    import MailIcon from "./social_icons/mail.svelte"

    export let instagram = "https://instagram.com/studenterforpalestina.trd"
    export let facebook =
        "https://www.facebook.com/people/Studenter-for-Palestina-Trondheim/100087592323689/"
    export let email = "styret@studenterforpalestina.no"
</script>

<footer class="absolute bottom-0 opacity-70">
    <ul class="flex items-center m-10 p-0 gap-4 list-none">
        <li>
            <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                class="inline-flex items-center justify-center w-10 h-10 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-100 transition-colors duration-200"
            >
                <FacebookIcon />
            </a>
        </li>
        <li>
            <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                class="inline-flex items-center justify-center w-10 h-10 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-100 transition-colors duration-200"
            >
                <InstagramIcon />
            </a>
        </li>
        <li>
            <a
                href={"mailto:" + email}
                aria-label={"Email " + email}
                class="inline-flex items-center justify-center w-10 h-10 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-100 transition-colors duration-200"
            >
                <MailIcon />
            </a>
        </li>
    </ul>
</footer>
