<script>
  import * as d3 from "d3";
  import tippy from "tippy.js";  

  export let cluster;
  export let stats;
  export let radius;
  export let yearColors;
  export let width, height;

  let factArc;
  let yearMap;
  let cumulativeAngle;
  let anglePerFact;
  let color;
  let pathData = [];

  function logcons(data) {
    console.log(data);
  }

  function getFactYear(cluster) {
    const yearMap = {};
    cluster.facts.forEach((fact) => {
      const [a, b] = fact.fact_id.split("_");
      const article = cluster.articles.find(
        (article) => article.article_id == a
      );
      if (article) {
        const year = article.year;
        if (!yearMap[year]) {
          yearMap[year] = [];
        }
        yearMap[year].push({ id: fact.fact_id, data: fact.fact_content });
      }
    });
    return yearMap;
  }

  function getColor(year) {
    let found = yearColors.find((entry) => entry.year == year);
    return found ? found.color : "#d21890";
  }

  let isReady = false;

  $: if (
    cluster &&
    stats &&
    radius &&
    yearColors &&
    width &&
    height
  ) {
    let nFact = cluster.number_of_facts;
    yearMap = getFactYear(cluster);
    anglePerFact = Math.PI / nFact;
    cumulativeAngle = Math.PI / 2;

    factArc = d3
      .arc()
      .innerRadius(radius + 2)
      .outerRadius(radius + 22);
    pathData = [];
    Object.keys(yearMap).forEach((year) => {
      yearMap[year].forEach((factdata) => {
        const startAngle = cumulativeAngle;
        const endAngle = cumulativeAngle + anglePerFact;
        pathData.push({ startAngle, endAngle, color: getColor(year), fact: factdata });
        cumulativeAngle = endAngle;
      });
    });

    isReady = true;
  }

  
  function tooltip(node, factData ) {
    tippy(node, {
      content: factData,
      
    });
  }
</script>

{#if isReady}
  {#each pathData as { startAngle, endAngle, color, fact }}
    <path
      d={factArc.startAngle(startAngle).endAngle(endAngle)()}
      fill={color}
      stroke="#292929"
      stroke-width="1"
      id={`fact${fact.id}`}
      use:tooltip={fact.data}
      style="cursor: pointer;"
    />
  {/each}
{/if}

<style>
  :global([data-tippy-root]) {
    background-color: rgba(31, 31, 31, 0.7);
    border-radius: 0.2rem;
    padding: 1rem;
    font-size: 14px;
  }

  :focus { outline: none; }
</style>
