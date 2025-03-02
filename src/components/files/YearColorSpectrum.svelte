<script>
  import * as d3 from "d3";

  export let years;
  export let yearColors = [];
  export let stats = {};
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

  const customBlueRange = [ "#08c1d2", "#08d283", "#75d208", "#90d208"];

  $: {
    if (years && years.earliest && years.latest) {
      yearColors = [];
      const colorScale = d3
        .scaleSequential()
        .domain([parseInt(years.earliest), parseInt(years.latest)])
        .range(customBlueRange);
        // .range(materialColors);
      // .interpolator(d3.interpolateHsl("#c1e079", "#1881d9"));
      // .interpolator(d3.interpolateViridis)
      // .interpolator(d3.interpolateHcl("#00FFFF", "#FFD700", "#FF1493"))
      //.interpolator(d3.interpolateHsl("#AFF3FE", "#1791A5"));

      for (let year = years.earliest; year <= years.latest; year++) {
        yearColors.push({ year, color: colorScale(year) });
      }
    }
  }
</script>

<div class="absolute left-10 bg-transparent shadow-lg rounded-lg p-2">
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
      <div class="years">
        {#each yearColors as yearColor}
          <div class="year-item">
            <div
              class="color-box"
              style="background-color: {yearColor.color}"
            ></div>
            <span
              class="font-semibold text-black dark:text-[rgba(255,255,255,0.6)]"
              >{yearColor.year}</span
            >
          </div>
        {/each}
        <div class="year-item">
          <div class="color-box" style="background-color: {'#d21890'}"></div>
          <span
            class="font-semibold text-black dark:text-[rgba(255,255,255,0.6)]"
            >Unknown</span
          >
        </div>
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
