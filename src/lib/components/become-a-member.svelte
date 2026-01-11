<script lang="ts">
  import StandardButton, { type StandardButtonProps } from "./standard-button.svelte";

  const props: StandardButtonProps = $props();
</script>

<StandardButton {...props} asLink href="https://docs.google.com/forms/d/e/1FAIpQLScR_Y7bGd3znYgbsZC6ECHexUsgjfZkyZYIaTvPtE7nsLSukg/viewform">
  Bli medlem
</StandardButton>