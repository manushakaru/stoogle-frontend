<script>
  let isOpen = false;

  export let articles;
  export let sorted_article_ids;
  export let yearColors;

  const togglePanel = () => {
    isOpen = !isOpen;
  };

  function getColor(year) {
    let found = yearColors.find((entry) => entry.year == year);
    return found ? found.color : "#c6bea9bf";
  }
</script>

{#if !isOpen}
  <!-- Open Button -->
  <div class="fixed bottom-4 right-4 z-4 transform -translate-y-1/2">
    <button
      id="open-button"
      on:click={togglePanel}
      class="text-white text-1xl p-2 bg-gray-700 rounded-full shadow-lg hover:bg-gray-600 transition duration-300 relative z-50"
    >
      ←
    </button>
  </div>
{:else}
  <div class="fixed bottom-4 z-[1001] right-4 transform -translate-y-1/2">
    <button
      id="close-button"
      on:click={togglePanel}
      class="text-white text-1xl p-2 bg-gray-700 rounded-full shadow-lg hover:bg-gray-600 transition duration-300 relative z-50"
    >
      →
    </button>
  </div>
{/if}

{#if isOpen}
  <!-- Panel Content -->
  <div
    class="absolute right-0 bottom-5 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 backdrop-blur-lg p-4 rounded-xl shadow-md w-80 h-full overflow-y-auto z-10"
  >
    {#each articles as article}
      <div
        class="bg-white bg-opacity-20 p-3 rounded-lg shadow-sm mb-3 last:mb-0 backdrop-blur-md"
      >
        <h3 class="text-sm font-semibold mt-0 text-white line-clamp-3">
          {article.result_title}
        </h3>
        <p class="text-xs text-gray-300 mt-1">{article.meta_description}</p>
        <div class="flex items-center mt-2">
          <a href={article.url} target="_blank" style="color: transparent;">
            <img
              src={article.favicon}
              alt={article.source}
              class="w-5 h-5 bg-[#f1f3f4] rounded-full mr-2"
            />
          </a>

          <!-- <span class="text-xs text-gray-500">{article.source}</span> -->
          <a href={article.url} target="_blank" style="color: transparent;">
            <span class="text-xs text-gray-300 truncate max-w-[150px] block"
              >{article.source}</span
            >
            <!-- <div
              class="inline-flex items-center justify-center w-5 h-5 bg-[#394c5f] text-[#adb2eb] rounded-full text-xs font-semibold"
            >
              {sorted_article_ids[article.id]}
            </div> -->
          </a>
          <span class="fact-count_" style="color:{getColor(article.year)};"
            >{article.year}</span
          >
          <!-- <img src={article.icon} alt={article.source} class="w-5 h-5 rounded-full mr-2" /> -->
          <!-- <span class="text-xs text-gray-400 ml-3">{article.year}</span> -->
        </div>
      </div>
    {/each}
  </div>
{/if}
