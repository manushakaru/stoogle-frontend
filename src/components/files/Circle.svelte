<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
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
    return circles.find(circle => circle.id === clusterId);
  }

  let isReady = false;

  $: if (circles && cluster && width && height && stats && yearColors) {
    circle = getCircleById(cluster.cluster_id);
    if (circle) {
      //console.log(circles)
      let nFact = cluster.number_of_facts;
      let totArticle = stats.totoal_articles;
      let totFacts = stats.totoal_facts;
      radius = getRadiusBasedOnFacts(nFact);
      color = "#DFF3FF";      
      usedPercentageArticle = cluster.number_of_articles / totArticle;

      usedArcId = `usedArc${circle.id}`;  
      unusedArcId = `unusedArc${circle.id}`;
      
      usedArc = d3.arc()
        .innerRadius(radius + 1)
        .outerRadius(radius + 11) 
        .startAngle(-Math.PI / 4)  
        .endAngle(-Math.PI / 4 + (Math.PI / 180) * (usedPercentageArticle * 90));

      unusedArc = d3.arc()
        .innerRadius(radius + 1)
        .outerRadius(radius + 11)
        .startAngle(-Math.PI / 4 + (Math.PI / 180) * (usedPercentageArticle * 90))
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
    <circle 
        cx={circle?.x ?? 0} 
        cy={circle?.y ?? 0} 
        r={radius ?? 0} 
        fill={color} 
        class="circle-element"
    />
    <Facts {cluster} {radius} {circle} {stats} {yearColors} {width} {height}/>
    <Title {cluster} {radius} {circle}/>
    <svg width={width} height={height} class="percentage-ring">
      <g transform={`translate(${circle.x}, ${circle.y})`}>
        <path
          id={usedArcId}  
          class="used-arc"
          d={usedArc()} 
          fill="#FF9696" />
        
        <path
          id = {unusedArcId}
          class="unused-arc"
          d={unusedArc()} 
          fill="#FFE6E6" />
        
        <text fill="black" font-size="10px">
          <textPath href={`#${usedArcId}`}>
            0
          </textPath>
        </text>
        <text fill="#FF9696" font-size="10px" dy="9">
        <textPath href={`#${unusedArcId}`} >
            {cluster.number_of_articles}
          </textPath>
        </text>
        <text fill="black" font-size="10px">
          <textPath href={`#${unusedArcId}`} text-anchor="end" startOffset="47%">
            {stats.totoal_articles}
          </textPath>
        </text>
      </g>
    </svg>

    <text 
        x={circle.x} 
        y={circle.y} 
        text-anchor="middle" 
        dominant-baseline="middle" 
        fill="black" 
        font-size="12px">
      {cluster.cluster_id}
    </text>

  {:else}
    <text x="700" y="900" fill="red">
      No circle found for cluster {cluster.cluster_id}
    </text>
  {/if}
{:else}
  <text x="50%" y="50%" fill="orange" text-anchor="middle" dominant-baseline="middle">
    Waiting for data...
  </text>
{/if}

<style>
  .circle-element {
    width: 100%;
    height: 100%;
    border: 1px solid black;
    stroke: black;
    stroke-width: 1px;
    stroke-dasharray: 2, 2;
  }

  .percentage-ring {
    position: absolute;
    pointer-events: none;
  }

  .used-arc, .unused-arc {
    transition: stroke-dashoffset 0.3s ease;
  }
</style>
