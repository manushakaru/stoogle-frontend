<script>
  import * as d3 from "d3";
  import Facts from "$components/files/Facts.svelte";
  import Title from "$components/files/Title.svelte";
  import tippy from "tippy.js";

  export let circles;
  export let cluster;
  export let stats;
  export let width;
  export let height;
  export let yearColors;
  export let action;
  export let sorted_article_ids;

  let circle;
  let radius;
  let radius_inner;
  let color;
  let usedArc;
  let unusedArc;
  let usedPercentageArticle;
  let totArticle;

  let usedArcId;
  let unusedArcId;

  function getCircleById(clusterId) {
    return circles.find((circle) => circle.id === clusterId);
  }

  const radiusScale = d3
    .scaleLinear()
    .domain([1, stats.max_original_facts]) // max number of original facts
    .range([5, 60]); // Output range (radius size)

  let isReady = false;
  let wordCloud; 

  $: if (circles && cluster && width && height && stats && yearColors) {
    wordCloud = cluster.word_cloud;
    circle = getCircleById(cluster.cluster_id);
    if (circle) {
      let nFact = cluster.number_of_original_facts;
      totArticle = stats.total_articles;
      radius = 100;
      radius_inner = radiusScale(nFact);
      color = "#1a2e3c";
      usedPercentageArticle = cluster.number_of_articles / totArticle;

      usedArcId = `usedArc${circle.id}`;
      unusedArcId = `unusedArc${circle.id}`;

      usedArc = d3
        .arc()
        .innerRadius(radius + 1)
        .outerRadius(radius + 11)
        .startAngle(-Math.PI / 4)
        .endAngle(
          -Math.PI / 4 + (Math.PI / 180) * (usedPercentageArticle * 90)
        );

      unusedArc = d3
        .arc()
        .innerRadius(radius + 1)
        .outerRadius(radius + 11)
        .startAngle(
          -Math.PI / 4 + (Math.PI / 180) * (usedPercentageArticle * 90)
        )
        .endAngle(Math.PI / 4);

      isReady = true;
    } else {
      console.log("No circle found for this cluster.");
      isReady = false;
    }
  }

  function tooltip(node, textHere) {
    tippy(node, {
      content: textHere,
    });
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
      />

      <circle
        cx={0}
        cy={0}
        r={radius ?? 0}
        fill={color}
        class="circle-element hit-area"
      />

      {@html wordCloud}

      <circle
        cx={0}
        cy={0}
        r={radius_inner ?? 0}
        fill={color}
        class="circle-element hit-area"
      />
      <Title {cluster} {radius} />
      <path
        id={usedArcId}
        class="used-arc ring-element"
        style="cursor: pointer;"
        d={usedArc()}
        fill="#b785ff"
        use:tooltip={`Number of Related Articles: ${cluster.number_of_articles} out of ${totArticle}`}
      />

      <path
        id={unusedArcId}
        class="unused-arc ring-element"
        d={unusedArc()}
        fill="#1a2e3c"
      />

      <text fill="rgba(255, 255, 255, 0.8)" font-size="10px" dy="-3">
        <textPath href={`#${usedArcId}`} text-anchor="middle"> 0 </textPath>
      </text>
      <text fill="rgba(255, 255, 255, 0.8)" font-size="10px" dy="9" dx="2">
        <textPath href={`#${unusedArcId}`}>
          {cluster.number_of_articles}
        </textPath>
      </text>
      <text fill="rgba(255, 255, 255, 0.8)" font-size="10px" dy="-3">
        <textPath href={`#${unusedArcId}`} text-anchor="end" startOffset="45%">
          {stats.total_articles}
        </textPath>
      </text>

      <!-- <text
        x={0}
        y={0}
        text-anchor="middle"
        dominant-baseline="middle"
        fill="#b8ccd6"
        font-size="12px"
      >
        {cluster.cluster_id}
      </text> -->
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
    /* stroke-dasharray: 2, 2; */
  }

  .circle-svg {
    position: absolute;
    pointer-events: none;
  }

  .used-arc,
  .unused-arc {
    transition: stroke-dashoffset 0.3s ease;
  }

  :focus {
    outline: none;
  }
</style>
