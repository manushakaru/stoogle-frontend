<script>
    import Stoogle from "$components/stoogle/Stoogle.svelte";
    import viewport from "$stores/viewport.js";
    import {  onMount } from 'svelte';

    let viewportHeight;
    let viewportWidth;
    let mounted;

    onMount(() => {
      viewportHeight = $viewport.height;
      viewportWidth = $viewport.width;
      mounted = true;
    })
</script>

{#if mounted}
<Stoogle {viewportHeight} {viewportWidth}/>
{/if}