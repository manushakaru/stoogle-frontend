<script>
  import * as d3 from "d3";
  import tippy from "tippy.js";

  export let cluster;
  export let stats;
  export let radius;
  export let yearColors;
  export let width, height;
  export let sorted_article_ids;
  export let curMergedId;

  let circleData = [];
  const smallCircleRadius = 6;
  const padding = 5;

  function getColor(year) {
    let found = yearColors.find((entry) => entry.year == year);
    return found ? found.color : "#d21890";
  }

  function getActiveFactGroupIds(cluster, curMergedId) {
    const mergedFact = cluster.merged_facts.find((mergedFact) => {
      return mergedFact.merged_id === curMergedId;
    });

    if (mergedFact) {
      return mergedFact.merged_fact_group_ids;
    }

    return null;
  }

  let isReady = false;

  $: if (cluster && stats && radius && yearColors && width && height) {
    let max_fact_groups = stats.max_fact_groups;
    const anglePerFact = Math.PI / (max_fact_groups - 1);
    circleData = [];

    const activeFactGroupIds = getActiveFactGroupIds(cluster, curMergedId);

    cluster.all_fact_groups.forEach((factGroup, i) => {
      const factGroupId = factGroup.fact_group_id;
      const isActive = activeFactGroupIds?.includes(factGroupId) ?? false;
      let smallCircles = [];
      const angle = i * anglePerFact;
      factGroup.fact_group_facts.forEach((fact, j) => {
        const distance = radius + (j + 1) * (2 * smallCircleRadius + padding);
        const x = distance * Math.cos(angle);
        const y = distance * Math.sin(angle);
        const article = fact.article;
        smallCircles.push({
          x,
          y,
          color: getColor(parseInt(article.year)),
          fact: fact,
          isActive: isActive,
        });
      });

      const lastCircle = smallCircles[smallCircles.length - 1];
      const lineData = {
        x: lastCircle.x,
        y: lastCircle.y,
      };
      circleData.push({
        lineData: lineData,
        smallCircleData: smallCircles,
      });
    });
    isReady = true;
  }

  function tooltip(node, fact) {
    tippy(node, {
      content: `
      <div class="tooltip-content">
        <p>${fact.fact_content}</p>
        <div class="articles-container">
          <div >
            <a target="_blank" href="${fact.article.url}"  >
              <div class="article-circle">${
                sorted_article_ids[fact.fact_id.split("_")[0]]
              }</div>
              </a>
          </div>
          <span class="fact-count" style="color:${getColor(
            fact.article.year
          )};">${fact.article.year}</span>
        </div>
      </div>
    `,
      allowHTML: true,
      theme: "custom",
      animation: false,
      delay: [0, 0],
      interactive: true,
      placement: "top",
      appendTo: () => document.body,
    });
  }
</script>

{#if isReady}
  {#each circleData as { lineData, smallCircleData }}
    <line
      x1={0}
      y1={0}
      x2={lineData.x}
      y2={lineData.y}
      stroke="#b8ccd6"
      stroke-width="1"
    />
    {#each smallCircleData as { x, y, color, fact, isActive }}
      {#if isActive}
        <circle
          cx={x}
          cy={y}
          r={smallCircleRadius + 2}
          fill="#ecf9ff"
          id={`fact${fact.fact_id}`}
          use:tooltip={fact}
          style="cursor: pointer;"
        />
      {/if}
      <circle
        cx={x}
        cy={y}
        r={smallCircleRadius}
        fill={color}
        id={`fact${fact.fact_id}`}
        use:tooltip={fact}
        style="cursor: pointer;"
      />
    {/each}
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
    z-index: 1000;
  }

  :global(.tooltip-content p) {
    margin: 0;
    line-height: 1.4;
  }

  :global(.tooltip-content) {
    font-weight: bold;
    font-size: 0.85rem;
    color: #76c7c0;
    /* text-align: justify; */
  }

  :global(.fact-count) {
    font-weight: bold;
    font-size: 0.85rem;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 2px 6px;
    border-radius: 4px;
    margin-bottom: 15px;
    margin-right: 10px;
    background-color: #1b2d3d;
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
    background-color: #394c5f;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #adb2eb;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    text-decoration: none;
    cursor: pointer;
  }

  :focus {
    outline: none;
  }
</style>
