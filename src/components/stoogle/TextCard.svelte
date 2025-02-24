<script>
  export let fact;
  export let sorted_article_ids;

  let narrative = fact.narrative;
  let titles = fact.titles;
  let chartTitle = titles.chart_title;
  let merged_articles = fact.merged_articles.sort((a, b) => Number(a.id) - Number(b.id));

</script>

<div
  class="relative block w-full p-4 pointer-events-auto border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-slate-900"
  style="background-color: rgba(17, 17, 17, 0.95);"
>
  <div
    class="absolute -top-3 right-4 bg-indigo-400 text-white font-bold text-sm px-3 py-1 rounded-lg max-w-[80%] truncate cursor-default"
  >
    {chartTitle}
  </div>

  <div class="flex items-center cursor-default mt-4 mb-4">
    <div class="pl-4">
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
