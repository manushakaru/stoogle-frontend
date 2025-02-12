<script>
  import * as d3 from "d3";

  export let years;
  export let yearColors = [];

  $: {
    if (years && years.earliest && years.latest) {
      yearColors = [];
      const colorScale = d3
        .scaleSequential()
        .domain([years.earliest, years.latest])
        .interpolator(d3.interpolateHsl("#AFF3FE", "#1791A5"));

      for (let year = years.earliest; year <= years.latest; year++) {
        yearColors.push({ year, color: colorScale(year) });
      }

      console.log("Colors:", yearColors);
    }
  }
</script>

<div class="year-spectrum">
  <div class="year-title">Published Years</div>
  {#if yearColors.length > 0}
    <div class="years">
      {#each yearColors as yearColor}
        <div class="year-item">
          <div
            class="color-box"
            style="background-color: {yearColor.color}"
          ></div>
          <span class="year-label">{yearColor.year}</span>
        </div>
      {/each}
    </div>
  {:else}
    <p>Loading year data...</p>
  {/if}
</div>

<style>
  .year-spectrum {
    position: absolute;
    top: 10px;
    right: 200px;
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
