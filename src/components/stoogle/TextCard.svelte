<script>
  export let fact;

  let narrative = fact.narrative;
  let titles = fact.titles;
  let chartTitle = titles.chart_title;
  let readMoreLink = fact.article.url || "#";

  let example = `
    <div>
        <span class="text-blue-400 font-semibold">Automotive giants</span> like 
        <span class="text-red-400 font-semibold">GM</span> are pivoting towards 
        <span class="text-green-400 font-semibold">electric vehicle production</span>, 
        signaling a broader shift from traditional 
        <span class="text-yellow-400 font-semibold">fuel economies</span> to 
        <span class="text-purple-400 font-semibold">electric ones</span>.
    </div>`;

  let showPreview = false;

  const handlePreview = () => {
    showPreview = !showPreview;
  };
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

  <!-- <div class="absolute top-3 right-3 cursor-pointer flex items-center" on:click={handlePreview}>
    <img src="assets/stoogle/launch.svg" alt="SVG Icon" class="w-6 h-6 mr-2" />
    <img src="assets/stoogle/info_outline.svg" alt="Another SVG Icon" class="w-6 h-6" />
  </div> -->

  <div class="flex items-center cursor-default mt-4 mb-4">
    <div class="pl-4">
      <!-- <h6
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {chartTitle}
      </h6> -->
      <p class="text-lg inline pb-3">
        {@html narrative}
      </p>
      <a  href={readMoreLink} target="_blank" style="color: #000000;">
        <div
          class="inline-flex items-center justify-center w-5 h-5 bg-blue-400 text-white rounded-full text-xs"
        >
          10
        </div>
      </a>
    </div>
  </div>

  <!-- <div class="absolute bottom-3 right-4 flex items-center">
    <a
      href={readMoreLink}
      target="_blank"
      class="text-indigo-400 font-semibold text-sm hover:underline">Read more</a
    >
  </div> -->

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
          on:click={handlePreview}
        >
          X
        </button>
      </div>
    </div>
  {/if}
</div>
