<script>
  import * as d3 from "d3";
  import Facts from "$components/files/Facts.svelte";
  import Title from "$components/files/Title.svelte";
  import tippy, { followCursor } from "tippy.js";
  import TextCircle from "$components/files/TextCircle.svelte";
  import { pack } from "d3-hierarchy";
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";

  export let circles;
  export let cluster;
  export let stats;
  export let width;
  export let height;
  export let yearColors;
  export let action;
  export let sorted_article_ids;
  export let curMergedId;

  let text = "Home schooling is fun!";

  let circle;
  let radius;
  let radius_inner;
  let color;
  let activeArc;
  let factActiveArc;
  let backgroundArc;
  let factBackgroundArc;
  let textArc;
  let centertextArc;
  let usedPercentageArticle;
  let totArticle;
  let totalFacts;
  let numFacts;

  let activeArcId;
  let factActiveArcId;
  let backgroundArcId;
  let textArcId;
  let centerTextArcId;
  const arcHeight = 11;
  const startAngle = -Math.PI / 4;
  const endAngle = Math.PI / 4;

  function getCircleById(clusterId) {
    return circles.find((circle) => circle.id === clusterId);
  }

  const radiusScale = d3
    .scaleLinear()
    .domain([1, stats.max_original_facts]) // max number of original facts
    .range([40, 60]); // Output range (radius size)

  let isReady = false;
  let wordCloud;

  // Circular packing variables
  let packedFacts = [];
  let packLayout;

  onMount(() => {
    // Initialize pack layout once when component mounts
    if (cluster) {
      const facts = cluster.representative_facts;
      const root = d3
        .hierarchy({ children: facts })
        .sum((d) => Math.random() * 15 + 5);

      packLayout = pack()
        .size([radius * 2, radius * 2])
        .padding(3);

      packLayout(root);
      packedFacts = root.descendants().slice(1);
    }
  });

  $: if (cluster && radius && curMergedId) {
    // Update only when cluster or radius changes
    const facts = cluster.representative_facts;
    const root = d3
      .hierarchy({ children: facts })
      .sum((d) => Math.random() * 15 + 5);

    packLayout = pack()
      .size([radius * 2, radius * 2])
      .padding(3);

    packLayout(root);
    packedFacts = root.descendants().slice(1);
  }

  $: isActive = curMergedId?.split("_")[0] === cluster.cluster_id.toString();

  $: if (circles && cluster && width && height && stats && yearColors) {
    wordCloud = cluster.word_cloud;
    text = cluster["representative_facts"][0]["fact_content"];
    circle = getCircleById(cluster.cluster_id);
    if (circle) {
      numFacts = cluster.number_of_original_facts;
      totArticle = stats.total_articles;
      totalFacts = stats["total_original_facts"];
      radius = 100;
      radius_inner = radiusScale(numFacts);
      color = "#1a2e3c";
      usedPercentageArticle = cluster.number_of_articles / totArticle;

      const factPercentage = numFacts / totalFacts;

      activeArcId = `usedArc${circle.id}`;
      factActiveArcId = `factActiveArc${circle.id}`;
      backgroundArcId = `unusedArc${circle.id}`;
      textArcId = `textArc${circle.id}`;
      centerTextArcId = `centerTextArc${circle.id}`;

      activeArc = d3
        .arc()
        .innerRadius(radius + 1)
        .outerRadius(radius + arcHeight + 1)
        .startAngle(startAngle)
        .endAngle(
          -Math.PI / 4 + (Math.PI / 180) * (usedPercentageArticle * 90)
        );

      factActiveArc = d3
        .arc()
        .innerRadius(radius + arcHeight + 1)
        .outerRadius(radius + arcHeight * 2 + 1)
        .startAngle(startAngle)
        .endAngle(-Math.PI / 4 + (Math.PI / 180) * (factPercentage * 90));

      centertextArc = d3
        .arc()
        .innerRadius(radius)
        .outerRadius(radius)
        .startAngle(startAngle)
        .endAngle(
          -Math.PI / 4 +
            (Math.PI / 180) * (usedPercentageArticle * 90) +
            Math.PI / 15
        );

      backgroundArc = d3
        .arc()
        .innerRadius(radius + 1)
        .outerRadius(radius + arcHeight + 1)
        .startAngle(startAngle)
        .endAngle(endAngle);

      factBackgroundArc = d3
        .arc()
        .innerRadius(radius + arcHeight + 1)
        .outerRadius(radius + arcHeight * 2 + 1)
        .startAngle(startAngle)
        .endAngle(endAngle);

      textArc = d3
        .arc()
        .innerRadius(radius)
        .outerRadius(radius)
        .startAngle(startAngle - 0.05)
        .endAngle(endAngle + Math.PI / 15);

      isReady = true;
    } else {
      console.log("No circle found for this cluster.");
      isReady = false;
    }
  }

  function getColor(year) {
    let found = yearColors.find((entry) => entry.year == year);
    return found ? found.color : "#d21890";
  }

  function tooltip(node, articles) {
    articles = d3.sort(articles, (a, b) => d3.ascending(a.year, b.year));
    tippy(node, {
      content: `
      <div class="tooltip-content">
        <div class="tooltip-topic" style="color:#adb2eb">Related Articles: ${
          articles.length
        }/${stats.total_articles}</div>
         ${articles
           .map(
             (article) => `
        <div class="article-card">
          <p class="article-title">${article.title}</p>
          <div class="article-content_">
            <a target="_blank" href="${
              article.url
            }" style="text-decoration: none; color:#1a2633" >
              <div class="article-circle">${
                sorted_article_ids[article.id]
              }</div>
            </a>
            <span class="fact-count_" style="color:${getColor(
              article.year
            )};">${article.year}</span>
          </div>
        </div>
         `
           )
           .join("")}
      </div>
    `,
      allowHTML: true,
      theme: "custom",
      animation: false,
      delay: [0, 0],
      followCursor: true,
      interactive: true,
      placement: "top",
      plugins: [followCursor],
      appendTo: () => document.body,
    });
  }

  function factTooltip(node, factContent) {
    tippy(node, {
      content: factContent,
      allowHTML: true,
      theme: "light",
      placement: "top",
      animation: "fade",
      duration: 200,
    });
    return {
      destroy() {
        node._tippy?.destroy();
      },
    };
  }
</script>

{#if isReady}
  {#if circle}
    <g
      use:action
      id={"circle-" + cluster.cluster_id}
      transform={`translate(${circle.x}, ${circle.y})`}
    >
      <Facts
        {cluster}
        {radius}
        {stats}
        {yearColors}
        {width}
        {height}
        {sorted_article_ids}
        {curMergedId}
      />

      <circle
        cx={0}
        cy={0}
        r={radius ?? 0}
        fill={color}
        class="circle-element hit-area {isActive ? 'active' : ''}"
      />

      {#if !isActive}
        <TextCircle radius={radius ?? 0} {text} />
      {/if}

      {#if isActive}
        {#each packedFacts as node}
          <g transform={`translate(${node.x - radius}, ${node.y - radius})`}>
            <circle
              cx={0}
              cy={0}
              r={node.r ?? 0}
              stroke="#b8ccd6"
              stroke-width="0.5"
              class="circle-element hit-area"
            />
            <TextCircle radius={node.r ?? 0} text={node.data.fact_content} />
          </g>
        {/each}
      {/if}

      <Title {cluster} {radius} />

      <path id={textArcId} class="" d={textArc()} style="display: none;" />
      <path
        id={centerTextArcId}
        class=""
        d={centertextArc()}
        style="display: none;"
      />

      <path
        id={backgroundArcId}
        class="unused-arc ring-element"
        d={backgroundArc()}
        fill="var(--color-background-track)"
      />

      <path
        class="unused-arc ring-element"
        d={factBackgroundArc()}
        fill="var(--color-background-track)"
      />

      <path
        id={activeArcId}
        class="used-arc ring-element"
        style="cursor: pointer;"
        d={activeArc()}
        fill="var(--color-progress-arc-article)"
        use:tooltip={cluster.articles}
      />

      <path
        id={factActiveArcId}
        class="used-arc ring-element"
        style="cursor: pointer;"
        d={factActiveArc()}
        fill="var(--color-progress-arc-fact)"
      />

      <!-- <text class="arc-label" dy="-2">
        <textPath href={`#${textArcId}`} text-anchor="middle"> 0 </textPath>
      </text>
      <text class="arc-label" dy="-15">
        <textPath href={`#${textArcId}`} text-anchor="middle"> 0 </textPath>
      </text> -->
      <text class="arc-label" dy="9">
        <textPath href={`#${activeArcId}`} text-anchor="end" startOffset="35%">
          {cluster.number_of_articles}
        </textPath>
      </text>
      <text class="arc-label" dy="9">
        <textPath
          href={`#${factActiveArcId}`}
          text-anchor="end"
          startOffset="35%"
        >
          {numFacts}
        </textPath>
      </text>
      <text class="arc-label" dy="-3">
        <textPath href={`#${textArcId}`} text-anchor="start" startOffset="45%">
          {stats.total_articles}
        </textPath>
      </text>
      <text class="arc-label" dy="-15">
        <textPath href={`#${textArcId}`} text-anchor="start" startOffset="45%">
          {totalFacts}
        </textPath>
      </text>
    </g>
  {:else}
    <text x="700" y="900" fill="red">
      No circle found for cluster {cluster.cluster_id}
    </text>
  {/if}
{:else}
  <text
    x="50%"
    y="50%"
    fill="orange"
    text-anchor="middle"
    dominant-baseline="middle"
  >
    Waiting for data...
  </text>
{/if}

<style>
  .hit-area {
    pointer-events: all;
    cursor: grab;
    transition: fill 0.3s ease;
  }

  .circle-element {
    fill: #1a2e3c;
  }

  .circle-element.active {
    fill: #2a4e6c;
  }

  .circle-element {
    width: 100%;
    height: 100%;

    stroke: #b8ccd6;
    stroke-width: 1px;
  }

  .ring-element {
    stroke: #b8ccd6;
    stroke-width: 1px;
  }

  .circle-svg {
    position: absolute;
    pointer-events: none;
  }

  .used-arc,
  .unused-arc {
    transition: stroke-dashoffset 0.3s ease;
  }
  .arc-label {
    fill: var(--color-arc-label);
    font-size: 10px;
    font-weight: 200;
    pointer-events: none;
  }

  :focus {
    outline: none;
  }
</style>
