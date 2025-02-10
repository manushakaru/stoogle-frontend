<script>
  export let fact;

  let narrative = fact.narrative;
  let titles = fact.titles;
  let chartTitle = titles.chart_title;

  let example = `
    <div>
        <span class="text-blue-400 font-semibold">Automotive giants</span> like 
        <span class="text-red-400 font-semibold">GM</span> are pivoting towards 
        <span class="text-green-400 font-semibold">electric vehicle production</span>, 
        signaling a broader shift from traditional 
        <span class="text-yellow-400 font-semibold">fuel economies</span> to 
        <span class="text-purple-400 font-semibold">electric ones</span>.
    </div>`
</script>

<div
  class="block w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
  style="background-color: rgba(17, 17, 17, 0.95);"
>
  <div class="flex items-center">
    <div class="pl-4">
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

