<script>
  import { getContext, onMount } from "svelte";
  import Footer from "$components/Footer.svelte";
  import YearColor from "$components/files/YearColorSpectrum.svelte";
  import Circle from "$components/files/Circle.svelte";   
  import Belt from "$components/files/Belt.svelte";  
  import data from '$data/analysis-3.json';

  let years = data.stats.article_year_range;
  let numCircles = data.stats.total_clusters;
  let clusters = data.clusters; 
  let shared_facts = data.shared_facts;
  let shared_articles = data.shared_articles;
  let stats = data.stats;

  let width;
  let height;
  let circles = [];
  let yearColors = [];

  onMount(() => {
    width = window.innerWidth * 0.8; 
    height = window.innerHeight * 0.8; 
  });

  function getClusterIds() {
    return clusters.map(cluster => cluster.cluster_id);
  }

  let clusterIds = getClusterIds();
</script>


<YearColor {years} bind:yearColors/>



<svg width={width} height={height}>
<Belt {width} {height} {circles} {shared_articles}/>   

  {#each clusters as cluster (cluster.cluster_id)}
    <Circle {width} {height} {cluster} {circles} {stats} {yearColors} />
  {/each}
</svg>
