<script lang="ts">
    import { ChevronLeft, Menu } from "@lucide/svelte";
    import BecomeAMember from "$lib/components/become-a-member.svelte";
    import { c } from "../../utils/classes";
    import ThemeToggle from "./theme-toggle.svelte";
    import { darkMode } from "$lib/stores/darkmode";
	let data = [
		{ url: "events", string: "Hva skjer?" },
		{ url: "groups", string: "Komiteer" },
	];
    let menuOpen = $state(false);
</script>

<nav class="flex items-center justify-between px-10 py-6 gap-2">
    <div class="flex w-full justify-between items-center">
        <a href="/">
           {#if $darkMode}
                <img class="w-16" src="/images/logo_darkmode.png" alt="logo" />
            {:else}
            <img class="w-16" src="/images/logo.png" alt="logo" />
            {/if}
        </a>
        <button class="cursor-pointer text-(--color-red) text-lg px-3 py-2 rounded-md
                    hover:bg-(--color-red)/10 active:bg-(--color-red)/40
                    transition-colors duration-200 text-nowrap sm:hidden"
            onclick={() => menuOpen = true}
        >
            <Menu />
        </button>
    </div>

    <ul class="list-none items-center gap-1 hidden sm:flex">
        <li>
            <ThemeToggle />
        </li>
        {#each data as item}
            <li>
                <a
                    href={item.url}
                    class="flex text-lg px-3 py-2 rounded-md
                            hover:text-(--color-red) hover:bg-(--color-red)/10 active:bg-(--color-red)/40
                            transition-colors duration-200 text-nowrap"
                >
                    {item.string}
                </a>
            </li>
        {/each}
        <li>
            <BecomeAMember />
        </li>
    </ul>
    <div class={c("fixed top-0 left-0 right-0 bottom-0 bg-black opacity-25 sm:hidden", !menuOpen && "hidden")} onclick={() => menuOpen = false} />
    <div class={c('transition-transform fixed top-0 left-full h-dvh bg-(--background) px-3 py-5 sm:hidden', menuOpen && 'transform-[translateX(-100%)]')}>
        <ul class="list-none flex flex-col items-start p-4 gap-2 min-w-60">
            <li class="flex w-full justify-between items-center gap-1 mb-4">
                <button class="cursor-pointer text-(--color-red) text-lg pl-2 pr-5 py-2 rounded-md
                hover:bg-(--color-red)/10 active:bg-(--color-red)/40
                transition-colors duration-200 flex items-center"
                    onclick={() => menuOpen = false}
                >
                    <ChevronLeft />
                    Tilbake
                </button>
                <ThemeToggle />

            </li>
            {#each data as item}
                <li>
                    <a
                        onclick={() => menuOpen = false}
                        href={item.url}
                        class="flex text-lg px-3 py-2 rounded-md
                                hover:text-(--color-red) hover:bg-(--color-red)/20 active:bg-(--color-red)/50
                                transition-colors duration-200 text-nowrap"
                    >
                        {item.string}
                    </a>
                </li>
            {/each}
            <li class="mt-8">
                <BecomeAMember />
            </li>
        </ul>

    </div>
</nav>
