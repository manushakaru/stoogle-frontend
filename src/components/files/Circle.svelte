<script>
  import * as d3 from "d3";
  import Facts from "$components/files/Facts.svelte";
  import Title from "$components/files/Title.svelte";

  export let circles;
  export let cluster;
  export let stats;
  export let width;
  export let height;
  export let yearColors;

  let circle;
  let radius;
  let color;
  let usedArc;
  let unusedArc;
  let usedPercentageArticle;

  let usedArcId;
  let unusedArcId;

  function getCircleById(clusterId) {
    return circles.find((circle) => circle.id === clusterId);
  }

  let isReady = false;

  $: if (circles && cluster && width && height && stats && yearColors) {
    circle = getCircleById(cluster.cluster_id);
    if (circle) {
      //console.log(circles)
      let nFact = cluster.number_of_facts;
      let totArticle = stats.total_articles;
      let totFacts = stats.total_facts;
      radius = getRadiusBasedOnFacts(nFact);
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

  function getRadiusBasedOnFacts(nFact) {
    return nFact * 3;
  }
</script>

{#if isReady}
  {#if circle}
    <svg {width} {height} class="circle-svg">
      <g transform={`translate(${circle.x}, ${circle.y})`}>
        <circle
          cx={0}
          cy={0}
          r={radius ?? 0}
          fill={color}
          class="circle-element"
        />
        <Facts {cluster} {radius} {stats} {yearColors} {width} {height} />
        <Title {cluster} {radius} />
        <path id={usedArcId} class="used-arc ring-element" d={usedArc()} fill="#b785ff" />

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
          <textPath
            href={`#${unusedArcId}`}
            text-anchor="end"
            startOffset="45%"
          >
            {stats.total_articles}
          </textPath>
        </text>
      </g>
    </svg>

    <text
      x={circle.x}
      y={circle.y}
      text-anchor="middle"
      dominant-baseline="middle"
      fill="#b8ccd6"
      font-size="12px"
    >
      {cluster.cluster_id}
    </text>
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
  .circle-element {
    width: 100%;
    height: 100%;

    stroke: #b8ccd6;
    stroke-width: 1px;
    stroke-dasharray: 2, 2;
  }

  .ring-element {
    stroke: #b8ccd6;
    stroke-width: 1px;
    stroke-dasharray: 2, 2;
  }

  .circle-svg {
    position: absolute;
    pointer-events: none;
  }

  .used-arc,
  .unused-arc {
    transition: stroke-dashoffset 0.3s ease;
  }
</style>
