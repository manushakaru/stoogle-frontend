<script>
  export let web = "";
  export let pageCount = 5;
  export let handlePopupSubmit;
  export let togglePopup;
</script>

<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
  <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 flex flex-col items-center text-gray-900 dark:text-white">
    <h3 class="text-xl font-bold text-gray-900 dark:text-gray-200 mb-4">
      Advanced Options
    </h3>
    
    <label class="w-full text-gray-700 dark:text-gray-300 font-semibold mb-2">
      Website:
      <input 
        type="text" 
        bind:value={web} 
        class="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500" 
      />
    </label>
    
    <label class="w-full text-gray-700 dark:text-gray-300 font-semibold mb-4">
      Result Count:
      <input 
        type="number" 
        bind:value={pageCount} 
        min="1" 
        class="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500" 
      />
    </label>
    
    <div class="flex w-full justify-between">
      <button 
        on:click={() => handlePopupSubmit(web, pageCount)} 
        class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
      >
        Save
      </button>
      <button 
        on:click={togglePopup} 
        class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Close
      </button>
    </div>
  </div>
</div>