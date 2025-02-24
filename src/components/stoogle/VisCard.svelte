<script>
  import Doughnut from "$components/charts/Doughnut.svelte";
  import Bar from "$components/charts/Bar.svelte";
  import Line from "$components/charts/Line.svelte";
  import Isotype from "$components/charts/Isotype.svelte";

  export let fact = {};
  export let sorted_article_ids;

  let visRecommendation = fact.vis_recommendation;
  let titles = fact.titles;
  let chartTitle = titles.chart_title;
  let axisXTitle = titles.x_axis;
  let axisYTitle = titles.y_axis;
  let visData = fact.vis_data;
  let narrative = fact.narrative;
  let merged_articles = fact.merged_articles.sort((a, b) => Number(a.id) - Number(b.id));
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

    <div class="w-1/2 pl-4 cursor-default pt-4">
      <p class="text-lg inline pb-3">
        {@html narrative}
      </p>
      {#each merged_articles as article }
      <a  href={article.url} target="_blank" style="color: #000000;">
        <div
          class="inline-flex items-center justify-center w-5 h-5 bg-blue-400 text-white rounded-full text-xs"
        >
            {sorted_article_ids[article.id]}
        </div>
      </a>
      {/each}
     
    </div>
  </div>
</div>
