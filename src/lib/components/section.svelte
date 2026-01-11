<script lang="ts">
  import type { ExtendHTML, HTML } from "../../utils/types";

  export type SectionProps = ExtendHTML<"div", {
    red?: boolean;
    fullHeight?: boolean;
  }>
  const { class: clas, red, fullHeight, children }: SectionProps = $props();
</script>

<section class={["flex justify-center items-center px-8 py-24", fullHeight && "h-lvh", red && "bg-(--color-red) text-(--color-text-light)"]}>
  <div class={["w-[80svw] max-w-[1200px]", clas]}>
    {@render children?.()}
  </div>
</section>