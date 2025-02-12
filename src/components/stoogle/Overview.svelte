<script>
  import YearColor from "$components/files/YearColorSpectrum.svelte";
  import CenterPoint from "$components/files/CenterPoints.svelte";
  import Circle from "$components/files/Circle.svelte";
  import Belt from "$components/files/Belt.svelte";

  export let data;
  export let viewportHeight;
  export let viewportWidth;

  let years = data.stats.article_year_range;
  let numCircles = data.stats.totoal_clusters;
  let clusters = data.clusters;
  let shared_facts = data.shared_facts;
  let shared_articles = data.shared_articles;
  let stats = data.stats;

  let width = viewportWidth * 0.8;
  let height = viewportHeight - 100;
  let circles = [];
  let yearColors = [];

  function getClusterIds() {
    return clusters.map((cluster) => cluster.cluster_id);
  }

  let clusterIds = getClusterIds();
</script>

<YearColor {years} bind:yearColors />

<CenterPoint {width} {height} {numCircles} {clusterIds} bind:circles />

<svg {width} {height}>
  <Belt {width} {height} {circles} {shared_articles} />
  {#each clusters as cluster (cluster.cluster_id)}
    <Circle {width} {height} {cluster} {circles} {stats} {yearColors} />
  {/each}
</svg>
