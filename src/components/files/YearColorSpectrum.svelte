<script>
  import * as d3 from "d3";

  export let years;
  export let yearColors = [];
  export let stats = {};
  export let articles;

  let totalArticles = stats.total_articles;
  let totalFacts = stats.total_fact_groups;

  const materialColors = [
    "#03A9F4", // Light Blue
    "#4CAF50", // Green
    "#FFC107", // Amber
    "#FF5722", // Deep Orange
    "#E91E63", // Pink
    "#9C27B0", // Purple
    "#673AB7", // Deep Purple
    "#00BCD4", // Cyan
  ];

  const customBlueRange = ["#08c1d2d1", "#08d283d1", "#75d208d1", "#90d208d1"];
  // const customBlueRange = [ "#27374D", "#526D82", "#9DB2BF", "#DDE6ED"];

  $: {
    if (years && years.earliest && years.latest && articles) {
      console.log("years", years);
      console.log("articles", articles);
      const articleCount = getYearArticleCount(articles);
      yearColors = [];
      const widthScale = d3
        .scaleLinear()
        .domain([0, totalArticles])
        .range([0, 50]);

      const colorScale = d3
        .scaleSequential()
        .domain([parseInt(years.earliest), parseInt(years.latest)])
        .range(customBlueRange);
      // .range(materialColors);
      // .interpolator(d3.interpolateHsl("#c1e079", "#1881d9"));
      // .interpolator(d3.interpolateViridis)
      // .interpolator(d3.interpolateHcl("#00FFFF", "#FFD700", "#FF1493"))
      //.interpolator(d3.interpolateHsl("#AFF3FE", "#1791A5"));

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

      console.log("yearColors", yearColors);
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

<div class="absolute left-10 bg-[#1b2d3d] shadow-lg rounded-lg p-2">
  <div class="mt-1 text-sm">
    <p
      class="mb-1 text-black font-semibold dark:text-[rgba(255,255,255,0.6)] flex justify-between"
    >
      Total Articles: <span class="font-bold dark:text-[#b785ff] pl-4"
        >{totalArticles}</span
      >
    </p>
    <p
      class="m-0 text-black font-semibold dark:text-[rgba(255,255,255,0.6)] flex justify-between"
    >
      Total Facts: <span class="font-bold dark:text-[rgba(255,255,255,0.6)]"
        >{totalFacts}</span
      >
    </p>

    <div
      class="mt-5 pb-2 text-black font-semibold dark:text-[rgba(255,255,255,0.6)]"
    >
      Published Years
    </div>
    {#if yearColors.length > 0}
      <div class="years flex flex-col gap-1">
        {#each yearColors as yearColor}
          {#if yearColor.count !== 0}
            <div class="year-item flex items-center">
              <span
                class="text-black dark:text-[rgba(255,255,255,0.6)] w-16 text-right"
                >{yearColor.year}</span
              >
              <div
                class="color-box ml-1 h-4"
                style="background-color: {yearColor.color}; width: {yearColor.width}px"
              ></div>
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
    margin-right: 10px;
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
