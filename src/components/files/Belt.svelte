<script>
  import * as d3 from "d3";
  import tippy, { followCursor } from "tippy.js";

  export let circles;
  export let width;
  export let height;
  export let shared_articles;
  export let yearColors;
  export let sorted_article_ids;

  let lineData = [];

  function getCircleById(clusterId) {
    return circles.find((circle) => circle.id === clusterId);
  }

  function getColor(year) {
    let found = yearColors.find((entry) => entry.year == year);
    return found ? found.color : "#d21890";
  }

  $: if (circles && width && height && shared_articles) {
    console.log("shared_articles ", shared_articles);
    lineData = shared_articles
      .map((article) => {
        const startCircle = getCircleById(article.start_cluster);
        const endCircle = getCircleById(article.end_cluster);

        if (startCircle && endCircle) {
          return {
            start: { x: startCircle.x, y: startCircle.y },
            end: { x: endCircle.x, y: endCircle.y },
            beltWidth: article.count * 3,
            articles: article.articles,
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

  function tooltip(node, articles) {
    tippy(node, {
      content: `
      <div class="tooltip-content">
        <div class="tooltip-topic" style="color:#adb2eb">Shared Articles</div>
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
                sorted_article_ids[article.article_id]
              }</div>
            </a>
            <span class="fact-count_" style="color:${getColor(article.year)};">${
              article.year
            }</span>
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
      interactive: true,
      followCursor: true,
      placement: "top",
      appendTo: () => document.body,
      plugins: [followCursor],
    });
  }
</script>

{#each lineData as { start, end, beltWidth, articles }}
  <path
    d={curve({ source: start, target: end })}
    fill="none"
    stroke="#495e6e"
    stroke-width={Math.max(beltWidth, 1)}
    use:tooltip={articles}
    style="cursor: pointer;"
  />
{/each}

<style>
  path {
    transition: all 0.2s ease-out;
  }

  .tooltip-topic {
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 10px;
    text-align: center;
    color: #adb2eb;
    text-transform: capitalize;
    border-bottom: 1px solid #ddd;
    padding-bottom: 6px;
  }

  :global(.article-card) {
    position: relative;
    background-color: #1a2633;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease;
  }

  :global(.article-card:hover) {
    transform: translateY(-2px);
  }

  :global(.article-content_) {
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
  }

  :global(.article-title) {
    font-size: 0.9rem;
    margin-bottom: 8px !important;
    color: #d1e0eb;
  }

  :global(.fact-count_) {
    font-weight: bold;
    font-size: 0.85rem;
    margin-left: auto;
    padding: 2px 6px;
    border-radius: 4px;
    background-color: #2d4050;
    position: static;
  }
</style>
