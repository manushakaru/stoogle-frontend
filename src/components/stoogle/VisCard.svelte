<script>
  import Doughnut from "$components/charts/Doughnut.svelte";
  import Bar from "$components/charts/Bar.svelte";
  import Line from "$components/charts/Line.svelte";
  import Isotype from "$components/charts/Isotype.svelte";

  export let fact = {};

  let visRecommendation = fact.vis_recommendation;
  let titles = fact.titles;
  let chartTitle = titles.chart_title;
  let axisXTitle = titles.x_axis;
  let axisYTitle = titles.y_axis;
  let visData = fact.vis_data;
  let narrative = fact.narrative;
  let readMoreLink = fact.article.url || "#";

  console.log("visData ", visData);

  let showPreview = false;

  const clicked = () => {
    showPreview = !showPreview;
  };

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

<!-- To remove border - dark:border-slate-500 and border-4 -->
<div
  class="relative block pointer-events-auto w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:border-slate-900"
  style="background-color: rgba(17, 17, 17, 0.95);"
>
  <div
    class="absolute -top-3 right-4 bg-indigo-400 text-white font-bold text-sm px-3 py-1 rounded-lg max-w-[80%] truncate cursor-default"
  >
    {chartTitle}
  </div>
  <div class="flex items-center bottom-2">
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
        {:else if visRecommendation === "bar"}
          <Bar inputData={visData} {axisXTitle} {axisYTitle} />
        {:else if visRecommendation === "line"}
          <Line inputData={visData} {axisXTitle} {axisYTitle} />
        {:else if visRecommendation === "isotype"}
          <Isotype inputData={visData}></Isotype>
        {/if}
      </div>
    </div>

    <div class="w-1/2 pl-4 cursor-default">
      <!-- <h6
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {chartTitle}
      </h6> -->
      <p class="text-lg pb-3">
        {@html narrative}
      </p>
    </div>
  </div>

  <div class="absolute bottom-3 right-4 flex items-center">
    <!-- <a
      class="text-indigo-400 font-semibold text-sm hover:underline mr-3 cursor-pointer"
      on:click={clicked}>Preview</a
    > -->
    <a
      href={readMoreLink}
      target="_blank"
      class="text-indigo-400 font-semibold text-sm hover:underline">Read more</a
    >
  </div>

  {#if showPreview}
    <div
      class="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50"
    >
      <div class="relative w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <iframe
          src={readMoreLink}
          class="w-full h-96 rounded-lg"
          frameborder="0"
        ></iframe>
        <button
          class="absolute top-2 right-2 text-white bg-red-500 p-2"
          on:click={clicked}
        >
          X
        </button>
      </div>
    </div>
  {/if}
</div>
