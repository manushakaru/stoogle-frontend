<script>
  import * as d3 from "d3";
  import tippy, { followCursor } from "tippy.js";

  export let circles;
  export let width;
  export let height;
  export let shared_articles;
  export let yearColors;
  export let articlesDict;
  export let curMergedId;

  const circleRadius = 98;

  $: activeClusterId = curMergedId?.split("_")[0];

  function getPerimeterPoint(start, end) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.sqrt(dx * dx + dy * dy);

    if (length === 0) return start;

    const scale = circleRadius / length;
    return {
      x: start.x + dx * scale,
      y: start.y + dy * scale,
    };
  }

  let lineData = [];

  function getCircleById(clusterId) {
    return circles.find((circle) => circle.id === clusterId);
  }

  function getColor(year) {
    let found = yearColors.find((entry) => entry.year == year);
    return found ? found.color : "#c6bea9bf";
  }

  $: if (circles && width && height && shared_articles) {
    lineData = shared_articles
      .map((article) => {
        const startCircle = getCircleById(article.start_cluster);
        const endCircle = getCircleById(article.end_cluster);

        if (startCircle && endCircle) {
          // Calculate perimeter points
          const startPoint = getPerimeterPoint(startCircle, endCircle);
          const endPoint = getPerimeterPoint(endCircle, startCircle);

          return {
            start: { x: startPoint.x, y: startPoint.y },
            end: { x: endPoint.x, y: endPoint.y },
            beltWidth: article.count * 3,
            articles: article.articles,
            startCluster: article.start_cluster,
            endCluster: article.end_cluster,
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
    articles = d3.sort(articles, (a, b) => d3.ascending(a.year, b.year));
    tippy(node, {
      content: `
      <div class="tooltip-content">
        <div class="tooltip-topic">Shared Articles</div>
         ${articles
           .map(
             (article) => `
        <div class="article-card">
          <p class="article-title text-clamp">${
            articlesDict[article.article_id].result_title
          }</p>
          <div class="article-content_">
            <a target="_blank" href="${
              article.url
            }" style="text-decoration: none; color: transparent;" >
            <img src=${articlesDict[article.article_id].favicon} alt=${
              articlesDict[article.article_id].source
            } class="w-5 h-5 bg-[#f1f3f4] rounded-full " />
            </a>
            <span class="text-xs text-gray-400 truncate block">${
              articlesDict[article.article_id].source
            }</span>
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
      interactive: true,
      followCursor: true,
      placement: "top",
      appendTo: () => document.body,
      plugins: [followCursor],
    });
  }
</script>

{#each lineData as { start, end, beltWidth, articles, startCluster, endCluster }}
  <path
    class:inactive={curMergedId &&
      startCluster !== activeClusterId &&
      endCluster !== activeClusterId}
    d={curve({ source: start, target: end })}
    class="fill-none stroke-[var(--belt-stroke)] dark:stroke-[var(--belt-stroke-dark)] cursoe-pointer"
    stroke-width={Math.max(beltWidth, 1)}
    use:tooltip={articles}
    stroke-linecap="butt"
  />
{/each}

<style>
  path {
    transition: all 0.2s ease-out;
    stroke-linecap: butt;
  }

  path.inactive {
    opacity: 0.2;
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 0;
  }

  .tooltip-topic {
    font-weight: bold;
    font-size: 0.85rem;
    margin-bottom: 10px;
    text-align: center;
    /* color: #adb2eb; */
    color: var(--tooltip-text);
    text-transform: capitalize;
    /* border-bottom: 1px solid #ddd; */
    border-bottom: 1px solid var(--article-card-border);
    padding-bottom: 6px;
  }

  :global(.article-card) {
    position: relative;
    /* background-color: #1a2633; */
    background-color: var(--article-card-bg);
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 2px;
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); */
    border: 1px solid var(--article-card-border);
    transition: transform 0.2s ease;
  }

  :global(.article-card:hover) {
    transform: translateY(-2px);
    border-color: var(--tooltip-text);
  }

  :global(.article-content_) {
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
  }

  :global(.article-title) {
    font-size: 0.85rem;
    margin-bottom: 8px !important;
    /* color: #d1e0eb; */
    color: var(--tooltip-text);
  }

  :global(.fact-count_) {
    font-weight: bold;
    font-size: 0.85rem;
    margin-left: auto;
    padding: 2px 6px;
    border-radius: 4px;
    /* background-color: #2d4050; */
    background-color: var(--article-card-bg);
    border: 1px solid var(--article-card-border);
    position: static;
  }

  :global(.text-clamp) {
    display: -webkit-box;
    -webkit-line-clamp: 3; /* Limit to 3 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
