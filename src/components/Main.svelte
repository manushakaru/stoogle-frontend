<script>
    import Stoogle from "$components/stoogle/Stoogle.svelte";
    import viewport from "$stores/viewport.js";
    import {  onMount } from 'svelte';

    let viewportHeight;
    let mounted;

    onMount(() => {
      viewportHeight = $viewport.height;
      mounted = true;
    })
</script>

{#if mounted}
<Stoogle {viewportHeight}/>
{/if}