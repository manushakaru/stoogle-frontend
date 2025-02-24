<script>
  import * as d3 from "d3";
  import tippy from "tippy.js";

  export let cluster;
  export let stats;
  export let radius;
  export let yearColors;
  export let width, height;
  export let sorted_article_ids;

  let factArc;
  let yearMap;
  let cumulativeAngle;
  let anglePerFact;
  let pathData = [];

  function getFactYear(cluster) {
    const yearMap = {};
    cluster.all_fact_groups.forEach((fact_group) => {
      console.log("fact group", fact_group);
      let yearData = [];
      fact_group.fact_group_articles.forEach((article) => {
        yearData.push(parseInt(article.year));
      });
      // make either max or min year
      const year = Math.max(...yearData);
      if (!yearMap[year]) {
        yearMap[year] = [];
      }
      yearMap[year].push({ id: fact_group.fact_group_id, data: fact_group });
    });
    return yearMap;
  }

  function getColor(year) {
    let found = yearColors.find((entry) => entry.year == year);
    return found ? found.color : "#d21890";
  }

  let isReady = false;

  $: if (cluster && stats && radius && yearColors && width && height) {
    let nFact = cluster.number_of_fact_groups;
    yearMap = getFactYear(cluster);
    anglePerFact = Math.PI / nFact;
    cumulativeAngle = Math.PI / 2;

    factArc = d3.arc().innerRadius(radius + 2);
    // .outerRadius(radius + 22);
    pathData = [];
    Object.keys(yearMap).forEach((year) => {
      yearMap[year].forEach((factdata) => {
        const startAngle = cumulativeAngle;
        const endAngle = cumulativeAngle + anglePerFact;
        const outerRadius =
          radius + 2 + 15 * factdata.data.number_of_similar_facts;
        pathData.push({
          startAngle,
          endAngle,
          outerRadius,
          color: getColor(year),
          fact: factdata,
        });
        cumulativeAngle = endAngle;
      });
    });

    isReady = true;
  }

  function tooltip(node, factGroup) {
    const articlesHTML = factGroup.fact_group_articles
      .sort((a, b) => Number(a.id) - Number(b.id))
      .map(
        (article) => `
        <div class="article-circle">
          <span>${sorted_article_ids[article.id]}</span>
        </div>
      `
      )
      .join("");

    tippy(node, {
      content: `
      <div class="tooltip-content">
        <p>${factGroup.fact_group_content}</p>
        <div class="articles-container">${articlesHTML}</div>
        <span class="fact-count">Similar Fact Count: ${factGroup.number_of_similar_facts}</span>
      </div>
    `,
      allowHTML: true,
      theme: "custom",
      animation: "scale",
      delay: [0, 0],
      placement: "top",
    });
  }
</script>

{#if isReady}
  {#each pathData as { startAngle, endAngle, outerRadius, color, fact }}
    <path
      d={factArc
        .outerRadius(outerRadius)
        .startAngle(startAngle)
        .endAngle(endAngle)()}
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
    background-color: rgba(0, 0, 0, 0.9);
    border-radius: 0.5rem;
    padding: 1rem;
    font-size: 14px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    max-width: 250px;
    color: #f5f5f5;
  }

  :global(.tippy-box[data-theme~="custom"]) {
    background-color: rgba(0, 0, 0, 0.9);
    color: #e0e0e0;
  }

  :global(.tooltip-content) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  :global(.tooltip-content h4) {
    margin: 0;
    font-size: 1rem;
    color: #ff6f61;
  }

  :global(.tooltip-content p) {
    margin: 0;
    line-height: 1.4;
  }

  :global(.tooltip-content .fact-count) {
    font-weight: bold;
    font-size: 0.85rem;
    color: #76c7c0;
  }

  :global(.articles-container) {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.5rem;
    justify-content: left;
  }

  :global(.article-circle) {
    width: 20px;
    height: 20px;
    border-radius: 9999px;
    background-color: #60a5fa;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 0.75rem;
    line-height: 1rem;
    text-decoration: none;
    cursor: pointer;
  }

  :focus {
    outline: none;
  }
</style>
