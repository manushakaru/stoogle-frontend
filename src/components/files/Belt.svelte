<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  export let circles;
  export let width;
  export let height;
  export let shared_articles;

  let lineData = [];

  function getCircleById(clusterId) {
    return circles.find((circle) => circle.id === clusterId);
  }

  $: if (circles && width && height && shared_articles) {
    lineData = shared_articles
      .map((article) => {
        const startCircle = getCircleById(article.start_cluster);
        const endCircle = getCircleById(article.end_cluster);

        if (startCircle && endCircle) {
          return {
            start: { x: startCircle.x, y: startCircle.y },
            end: { x: endCircle.x, y: endCircle.y },
            beltWidth: article.count * 3,
          };
        }
        return null;
      })
      .filter((data) => data !== null);
  }

  let curve = d3
    .linkHorizontal()
    .x((d) => d.x)
    .y((d) => d.y);
</script>

{#each lineData as { start, end, beltWidth }}
  <path
    d={curve({ source: start, target: end })}
    fill="none"
    stroke="#495e6e"
    stroke-width={Math.max(beltWidth, 1)}
  />
{/each}

<style>
  path {
    transition: all 0.2s ease-out;
  }
</style>
