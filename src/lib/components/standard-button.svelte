<script lang="ts">
    import type { ClassValue } from "svelte/elements";
    import type { WithChildren } from "../../utils/types";
    
    type Href = {
      asLink: true;
      href: string;
    } | {
      asLink?: false;
      href?: null
    };
    export type Size = 'small' | 'medium' | 'large';
    
    export type StandardButtonProps = WithChildren<{
      class?: ClassValue;
      size?: Size
    }> & Href;

    const sizes: Record<Size, string> = {
      small: "scale-80",
      medium: "scale-100",
      large: "scale-125",
    }

    const { children, class: clas, size = 'medium', asLink, ...props }: StandardButtonProps = $props();
    
    const useA = asLink || ("href" in props && !!props?.href);
    if (!asLink && "href" in props && props?.href) console.warn("Don't use the StandardButton with the 'href' attribute without setting asLink to true")

    const classes = [`px-4 py-2 text-(--color-text-light) rounded-lg bg-(--color-red)
        hover:bg-red-800 active:bg-red-900 text-nowrap
        transition-colors duration-200 cursor-pointer w-fit`, sizes[size], clas]
</script>

{#if useA}
  <!-- @ts-ignore -->
  <a {...props} class="w-fit">
    <div class={classes}>
      {@render children?.()}

    </div>
  </a>
{:else}
  <button class={classes} {...props}>
      {@render children?.()}
  </button>
{/if}