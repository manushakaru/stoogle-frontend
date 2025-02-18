<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import YearColor from "$components/files/YearColorSpectrum.svelte";
  import Circle from "$components/files/Circle.svelte";
  import Belt from "$components/files/Belt.svelte";
  import Stats from "$components/stoogle/Stats.svelte";

  export let data;
  export let viewportHeight;
  export let viewportWidth;

  let years = data.stats.article_year_range;
  let numCircles = data.stats.total_clusters;
  let clusters = data.clusters;
  let shared_facts = data.shared_facts;
  let shared_articles = data.shared_articles;
  let stats = data.stats;

  let width = viewportWidth * 0.8;
  let height = viewportHeight - 100;
  let circles = [];
  let yearColors = [];

  let simulation;

  function getClusterIds() {
    return clusters.map((cluster) => cluster.cluster_id);
  }
  
  let clusterIds = getClusterIds();
  
  const boundaryForce = (alpha) => {
    circles.forEach(d => {
      const xMin = 0 + d.radius + 40;
      const xMax = width - d.radius - 40;
      const yMin = 0 + d.radius + 80;
      const yMax = height - d.radius - 40;

      if (d.x < xMin) d.x = xMin;
      if (d.x > xMax) d.x = xMax;
      if (d.y < yMin) d.y = yMin;
      if (d.y > yMax) d.y = yMax;
    });
  };
  
  onMount(() => {
    if (!clusters.length) return;

    circles = clusters.map((cluster) => ({
      id: cluster.cluster_id,
      x: (0.2 + Math.random() * (0.8 - 0.2)) * width,
      y: (0.2 + Math.random() * (0.8 - 0.2)) * height,
      radius: Math.max(40 + cluster.number_of_facts, cluster.number_of_facts * 4),
    }));

    simulation = d3.forceSimulation(circles)
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().strength(0.2).radius(d => d.radius + 60))
      .force("charge", d3.forceManyBody().strength(5)) 
      .force("boundary", boundaryForce)
      .on("tick", () => circles = [...circles]);
    
    
  });

  function circleAction(node) {
    const circleId = Number(node.id.split("-")[1]); 
    const circle = circles.find(c => c.id === circleId); 
    
    if (!circle) {
      console.error("Circle not found:", circleId);
      return;
    }

    d3.select(node).call(
      d3.drag()
        .on("start", event => dragStarted(event, circle))
        .on("drag", event => dragged(event, circle))
        .on("end", event => dragEnded(event, circle))
    );
  }

  function dragStarted(event, d) {
    console.log("Drag started:", d.id);

    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = event.x; 
    d.fy = event.y;
  }

  function dragged(event, d) {
    d.fx = event.x; 
    d.fy = event.y;
  }

  function dragEnded(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null; 
    d.fy = null;
  }

 
</script>

<Stats {stats} />
<YearColor {years} bind:yearColors />

<svg {width} {height}>
  <g>
    <Belt {width} {height} {circles} {shared_articles} />
    {#each clusters as cluster (cluster.cluster_id)}
      <Circle {width} {height} {cluster} {circles} {stats} {yearColors} action={circleAction} />
    {/each}
  </g>
</svg>
