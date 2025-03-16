<script>
  import * as d3 from "d3";
  import { theme } from "$stores/store.js";

  export let years;
  export let yearColors = [];
  export let stats = {};
  export let articles;

  let totalArticles = stats.total_articles;
  let totalFacts = stats.total_original_facts;

  const darkThemeColors = ["#D0E1F9d1", "#B0E0E6d1", "#4682B4d1", "#75a2f8d1"];
  const lightThemeColors = ["#D0E1F9d1", "#B0E0E6d1", "#74b8f0d1", "#8ba2f0"];

  $: {
    if (years && years.earliest && years.latest && articles) {
      const articleCount = getYearArticleCount(articles);
      yearColors = [];
      const widthScale = d3
        .scaleLinear()
        .domain([0, totalArticles])
        .range([0, 50]);

      const colorScale = d3
        .scaleSequential()
        .domain([parseInt(years.earliest), parseInt(years.latest)]);

      if ($theme === "dark") {
        colorScale.interpolator(d3.interpolateRgbBasis(darkThemeColors));
      } else {
        colorScale.interpolator(d3.interpolateRgbBasis(lightThemeColors));
      }

      yearColors.push({
        year: "Unknown",
        color: "#c6bea9bf",
        count: articleCount["Unknown"] || 0,
        width: widthScale(articleCount["Unknown"] || 0),
      });

      for (let year = years.earliest; year <= years.latest; year++) {
        yearColors.push({
          year,
          color: colorScale(year),
          count: articleCount[year] || 0,
          width: widthScale(articleCount[year] || 0),
        });
      }
    }
  }

  function getYearArticleCount(articles) {
    const yearCounts = {};

    articles.forEach((article) => {
      const year = article.year === "Unknown" ? "Unknown" : article.year;
      yearCounts[year] = (yearCounts[year] || 0) + 1;
    });

    return yearCounts;
  }
</script>

<div
  class="absolute left-3 bg-white dark:bg-[#1b2d3d] shadow-lg rounded-lg p-2 pl-4 pr-4"
>
  <div class="mt-1 text-sm">
    <p
      class="mb-1 text-gray-400 font-semibold dark:text-[rgba(255,255,255,0.6)] flex justify-between"
    >
      Total Articles: <span
        class="font-bold text-[var(--color-progress-arc-article)] dark:text-[var(--color-progress-arc-article)] pl-4"
        >{totalArticles}</span
      >
    </p>
    <p
      class="m-0 text-gray-400 font-semibold dark:text-[rgba(255,255,255,0.6)] flex justify-between"
    >
      Total Facts: <span
        class="font-bold text-[var(--color-progress-arc-fact)] dark:text-[var(--color-progress-arc-fact)]"
        >{totalFacts}</span
      >
    </p>

    <div
      class="mt-5 pb-2 text-gray-500 font-semibold dark:text-[rgba(255,255,255,0.6)]"
    >
      Published Years
    </div>
    {#if yearColors.length > 0}
      <div class="years flex flex-col gap-1">
        {#each yearColors as yearColor}
          {#if yearColor.count !== 0}
            <div class="year-item flex items-center">
              <span
                class="text-gray-500 dark:text-[rgba(255,255,255,0.6)] w-16 text-right"
                >{yearColor.year}</span
              >
              <div
                class="color-box ml-1 h-4"
                style="background-color: {yearColor.color}; width: {yearColor.width}px"
              ></div>
              <span style="color:{yearColor.color} ;">{yearColor.count}</span>
            </div>
          {/if}
        {/each}
      </div>
    {:else}
      <p>Loading year data...</p>
    {/if}
  </div>
</div>

<style>
  .year-spectrum {
    position: absolute;
    top: 10px;
    /* right: 200px; */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: Arial, sans-serif;
  }

  .years {
    display: flex;
    flex-direction: column-reverse;
  }

  .year-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .color-box {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }

  .year-label {
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
    font-size: 12px;
  }

  .year-title {
    font-weight: 600;
    margin-bottom: 5px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
  }
</style>
