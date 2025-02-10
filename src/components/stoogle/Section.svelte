<script>
    import ScrollSection from "$components/stoogle/ScrollSection.svelte";
    export let stepHandler; 
    export let viewportHeight;
    export let clusterData;
</script>

<ScrollSection {viewportHeight} {stepHandler}  {clusterData}/>