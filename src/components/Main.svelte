<script>
  import Stoogle from "$components/stoogle/Stoogle.svelte";
  import viewport from "$stores/viewport.js";
  import { onMount } from "svelte";
  import ColorTheme from "$components/stoogle/ColorTheme.svelte";

  let viewportHeight;
  let viewportWidth;
  let mounted;

  onMount(() => {
    viewportHeight = $viewport.height;
    viewportWidth = $viewport.width;
    mounted = true;
  });
</script>

{#if mounted}
  <Stoogle {viewportHeight} {viewportWidth} />
  <ColorTheme></ColorTheme>
{/if}
