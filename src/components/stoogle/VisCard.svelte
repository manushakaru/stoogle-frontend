<script>
  import Doughnut from "$components/charts/Doughnut.svelte";
  import Bar from "$components/charts/Bar.svelte";
  import Line from "$components/charts/Line.svelte";
  import Isotype from "$components/charts/Isotype.svelte";

  export let fact = {};
  export let sorted_article_ids;
  export let articlesDict;

  let titles = fact.titles;
  let chartTitle = titles.chart_title;
  let axisXTitle = titles.x_axis;
  let axisYTitle = titles.y_axis;
  let visData = fact.vis_data;
  let narrative = fact.narrative;
  let merged_articles = fact.merged_articles.sort(
    (a, b) => Number(a.id) - Number(b.id)
  );
  let visRecommendation = visData.length > 1 ? fact.vis_recommendation : "text";
  let dataVlue = visData[0];

  $: vis_recommender();

  function vis_recommender() {
    if (visData.length > 1) {
      return visRecommendation;
    } else if (
      visData.length === 1 &&
      (visData[0].type === "isotype" ||
        visData[0].unit === "%" ||
        visData[0].unit === "percentage")
    ) {
      visRecommendation = "isotype";
    } else {
      visRecommendation = "text";
    }
  }
</script>

<!-- To remove border - dark:border-slate-500 and border-4 -->
<div
  class="relative block pointer-events-auto backdrop-blur-md w-full flex h-[400px] p-4 bg-[var(--card-bg)]  border border-[var(--card-border)] rounded-lg shadow-sm dark:bg-[var(--card-bg-dark)] dark:border-slate-900"
>
  <div
    class="absolute -top-3 right-4 bg-[var(--card-title-bg)] dark:bg-[var(--card-title-bg-dark)] text-[var(--card-title-text)] dark:text-[var(--card-title-text)] font-bold text-sm px-3 py-1 rounded-lg max-w-[80%] truncate cursor-default"
  >
    {chartTitle}
  </div>
  <div class="flex items-center justify-center bottom-2">
    <div class="w-1/2">
      <div
        class="chart-wrapper flex items-center justify-center"
        style="width: 350px; height: 300px;"
      >
        {#if visRecommendation === "pie"}
          <Doughnut inputData={visData} />
        {:else if visRecommendation === "bar"}
          <Bar inputData={visData} {axisXTitle} {axisYTitle} />
        {:else if visRecommendation === "line"}
          <Line inputData={visData} {axisXTitle} {axisYTitle} />
        {:else if visRecommendation === "isotype"}
          <Isotype inputData={visData}></Isotype>
        {:else}
          <div
            class="flex flex-col items-center w-full max-w-[300px] justify-center h-full"
          >
            <p
              class="text-5xl sm:text-2xl md:text-5xl text-center w-full font-bold text-[{dataVlue.color}d1] max-w-[300px] pl-7"
            >
              {dataVlue.value}
              {dataVlue.unit}
            </p>
          </div>
        {/if}
      </div>
    </div>

    <div class="w-1/2 pl-4 cursor-default pt-4">
      <p class="text-lg inline pb-3 text-[var(--card-narrative-text)] dark:text-[var(--card-narrative-text-dark)]">
        {@html narrative}
      </p>
      {#each merged_articles as article}
        <a href={article.url} target="_blank" style="color:  transparent;">
          <img
            src={articlesDict[article.id].favicon}
            alt={articlesDict[article.id].source}
            class="inline-flex items-center justify-center w-5 h-5 bg-white dark:bg-[#f1f3f4] rounded-full"
          />
        </a>
      {/each}
    </div>
  </div>
</div>
