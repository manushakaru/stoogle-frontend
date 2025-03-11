<script>
  import { onMount, onDestroy } from "svelte";
  import * as d3 from "d3";
  import YearColor from "$components/files/YearColorSpectrum.svelte";
  import Circle from "$components/files/Circle.svelte";
  import Belt from "$components/files/Belt.svelte";
  import Articles from "$components/stoogle/Articles.svelte";

  export let data;
  export let viewportHeight;
  export let viewportWidth;
  export let step;
  export let curMergedId;
  export let value;
  export let items = [];
  export let sorted_article_ids;

  let showButton = false;
  let years = data.stats.article_year_range;
  let numCircles = data.stats.total_clusters;
  let clusters = data.clusters;
  let shared_facts = data.shared_facts;
  let shared_articles = data.shared_articles;
  let stats = data.stats;
  let steps = data.steps;
  let articles = data.all_mapped_articles;

  let width = viewportWidth;
  let height = viewportHeight - 100;
  let circles = [];
  let yearColors = [];
  let simulation;

  const boundaryForce = (alpha) => {
    circles.forEach((d) => {
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
      radius: Math.max(
        40 + cluster.number_of_fact_groups,
        cluster.number_of_fact_groups * 4
      ),
    }));

    simulation = d3
      .forceSimulation(circles)
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collide",
        d3
          .forceCollide()
          .strength(0.2)
          .radius((d) => d.radius + 120)
      )
      .force("charge", d3.forceManyBody().strength(5))
      // .force("boundary", boundaryForce)
      .force("x", d3.forceX(width / 2).strength(0.1))
      .force("y", d3.forceY(height / 2).strength(0.1))
      .on("tick", () => (circles = [...circles]));

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("click", handleCircleClick);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  onDestroy(() => {
    document.removeEventListener("click", handleOutsideClick);
    document.removeEventListener("click", handleCircleClick);
  });

  function handleCircleClick(event) {
    const groupElement = event.target.closest('g[id^="circle-"]');
    if (groupElement) {
      const groupId = Number(groupElement.id.replace("circle-", ""));
      const found = steps.find((step) => step.cluster_id === groupId);

      if (found) {
        value = found.start_step;
        jumpToItem(value);
      }
    }
  }

  function handleOutsideClick(event) {
    const groupElement = event.target.closest('g[id^="circle-"]');
    if (event.target.id === "open-button" || event.target.id === "close-button")
      return;
    if (!groupElement && event.target.id === "visBack") {
      resetZoom();
      scrollToTop();
    }
  }

  function resetZoom() {
    const initialTranslation = { x: width / 2, y: height / 2, scale: 1 };
    d3.select("#visBack g")
      .transition()
      .duration(800)
      .attr(
        "transform",
        `translate(${initialTranslation.x - width / 2}, ${
          initialTranslation.y - height / 2 + 40
        }) scale(${initialTranslation.scale})`
      );
  }

  function circleAction(node) {
    const circleId = Number(node.id.split("-")[1]);
    const circle = circles.find((c) => c.id === circleId);

    if (!circle) {
      console.error("Circle not found:", circleId);
      return;
    }

    d3.select(node).call(
      d3
        .drag()
        .on("start", (event) => dragStarted(event, circle))
        .on("drag", (event) => dragged(event, circle))
        .on("end", (event) => dragEnded(event, circle))
    );
  }

  function dragStarted(event, d) {
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

  function stepZoom(step) {
    if (step === undefined) {
      resetZoom();
      return;
    }

    let id = null;
    for (let i = 0; i < steps.length; i++) {
      let { cluster_id, start_step, end_step } = steps[i];

      if (step >= start_step && step <= end_step) {
        id = cluster_id;
      }
    }
    if (id !== null) {
      for (let i = 0; i < circles.length; i++) {
        if (circles[i].id === id) {
          return {
            x: circles[i].x,
            y: circles[i].y,
            scale: (height * 0.7) / (2 * circles[i].radius + 120) / 1.5, // 1.8 is the zoom factor
          };
        }
      }
    }
    return { x: width / 2, y: height / 2, scale: 1 };
  }

  $: {
    const translation = stepZoom(step);
    if (translation) {
      const { x, y, scale } = translation;
      d3.select("#visBack g")
        .transition()
        .duration(800)
        .attr(
          "transform",
          `translate(${-x * scale + (4 * width) / 6 + 80}, ${
            -y * scale + height / 2 + 40
          }) scale(${scale})`
          // change x : 120 for horizontal movement
          // change y : 40 for vertical movement
        );
    }
  }

  const jumpToItem = (index) => {
    if (items[index]) {
      items[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  };

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleScroll() {
    showButton = window.scrollY > 100;
  }
</script>

<YearColor {years} {stats} {articles} bind:yearColors />

<svg id="visBack" {width} {height}>
  <g>
    <Belt
      {width}
      {height}
      {circles}
      {shared_articles}
      {yearColors}
      {sorted_article_ids}
    />
    {#each clusters as cluster (cluster.cluster_id)}
      <Circle
        {width}
        {height}
        {cluster}
        {circles}
        {stats}
        {yearColors}
        action={circleAction}
        {sorted_article_ids}
        {curMergedId}
      />
    {/each}
  </g>
</svg>

<div
  class="fixed bottom-4 z-[1001] right-12 transform -translate-y-1/2"
  class:hidden={!showButton}
>
  <button
    on:click={scrollToTop}
    class="text-white text-1xl p-2 bg-gray-700 rounded-full shadow-lg hover:bg-gray-600 transition duration-300 relative z-50"
  >
    ↑
  </button>
</div>

<Articles {articles} {sorted_article_ids} {yearColors} />
