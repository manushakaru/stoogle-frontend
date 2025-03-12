<script>
  import "$styles/app.css";
  import { theme } from "$stores/store.js";
  import Header from "$components/Header.svelte";
</script>

<!-- <Header /> -->
<main id="content" class={$theme}>
  <slot />
</main>
