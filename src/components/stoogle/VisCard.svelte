<script>
  import ColumnChart from "$components/stoogle/ColumnChart.svelte";
  import BarChart from "$components/stoogle/BarChart.svelte";
  import PieChart from "$components/stoogle/PieChart.svelte";
  import Doughnut from "$components/charts/Doughnut.svelte";

  export let fact = {};

  let visRecommendation = fact.vis_recommendation;
  let titles = fact.titles;
  let chartTitle = titles.chart_title;
  let axisXTitle = titles.x_axis;
  let axisYTitle = titles.y_axis;
  let visData = fact.vis_data;
  let narrative = fact.narrative;

  console.log("visData ", visData);

  // Text coloring example
  // let example = `
  //   <div>
  //       <span class="text-blue-400 font-semibold">Automotive giants</span> like
  //       <span class="text-red-400 font-semibold">GM</span> are pivoting towards
  //       <span class="text-green-400 font-semibold">electric vehicle production</span>,
  //       signaling a broader shift from traditional
  //       <span class="text-yellow-400 font-semibold">fuel economies</span> to
  //       <span class="text-purple-400 font-semibold">electric ones</span>.
  //   </div>`

  // Text highligting example
  // let example = `
  //   <div>
  //       <span class="text-blue-400 font-semibold bg-blue-900 p-1 rounded">Automotive giants</span> like
  //       <span class="text-red-400 font-semibold bg-red-900 p-1 rounded">GM</span> are pivoting towards
  //       <span class="text-green-400 font-semibold bg-green-900 p-1 rounded">electric vehicle production</span>,
  //       signaling a broader shift from traditional
  //       <span class="text-yellow-400 font-semibold bg-yellow-900 p-1 rounded">fuel economies</span> to
  //       <span class="text-purple-400 font-semibold bg-purple-900 p-1 rounded">electric ones</span>.
  //   </div>`
</script>

<div
  class="block w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
  style="background-color: rgba(17, 17, 17, 0.95);"
>
  <div class="flex items-center">
    <div class="w-1/2">
      <div
        class="chart-wrapper"
        style="
    width: 400px;
    height: 250px;
"
      >
        {#if visRecommendation === "pie"}
        <Doughnut inputData={visData} />
         
        <!-- {:else if visRecommendation === "bar2"}
          <BarChart />
        {:else if visRecommendation === "bar"}
        <ColumnChart /> -->
         
        {/if}
      </div>
    </div>

    <div class="w-1/2 pl-4">
      <h6
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {chartTitle}
      </h6>
      <p class="text-lg">
        {@html narrative}
      </p>
    </div>
  </div>
</div>

