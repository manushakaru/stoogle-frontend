<script>
  import * as d3 from "d3";
  import Facts from "$components/files/Facts.svelte";
  import Title from "$components/files/Title.svelte";
  import { onMount } from "svelte";
  import tippy from "tippy.js";  


  export let circles;
  export let cluster;
  export let stats;
  export let width;
  export let height;
  export let yearColors;
  export let action;


  let circle;
  let radius;
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

  let isReady = false;

  $: if (circles && cluster && width && height && stats && yearColors) {
    circle = getCircleById(cluster.cluster_id);
    if (circle) {
      //console.log(circles)
      let nFact = cluster.number_of_facts;
      totArticle = stats.total_articles;
      let totFacts = stats.total_facts;
      radius = Math.max(50 + nFact, getRadiusBasedOnFacts(nFact));
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
    return nFact * 4;
  }
  function tooltip(node, textHere) {
    tippy(node, {
      content: textHere,
    });
  }
</script>

{#if isReady}
  {#if circle}
      <g use:action id={"circle-" + cluster.cluster_id} transform={`translate(${circle.x}, ${circle.y})`}>        
        
        <circle
          use:action
          cx={0}
          cy={0}
          r={radius ?? 0}
          fill={color}
          class="circle-element hit-area"
        />
        <Facts {cluster} {radius} {stats} {yearColors} {width} {height} />
        <Title {cluster} {radius} />
        <path id={usedArcId} class="used-arc ring-element" style="cursor: pointer;" d={usedArc()} fill="#b785ff" use:tooltip={`Number of Related Articles: ${cluster.number_of_articles} out of ${totArticle}`}/>

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
        
        <text
          x={0}
          y={0}
          text-anchor="middle"
          dominant-baseline="middle"
          fill="#b8ccd6"
          font-size="12px"
        >
          {cluster.cluster_id}
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
  }

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

  :focus { outline: none; }
</style>
