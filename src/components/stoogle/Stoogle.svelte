<script>
  import { DotLottieSvelte } from "@lottiefiles/dotlottie-svelte";
  import Popup from "$components/stoogle/Popup.svelte";
  import analysisData from "$data/samples/AI_is_a_threat_or_not_2.json";
  import analysisData5 from "$data/samples/AI_is_a_threat_or_not.json";
  import analysisData6 from "$data/samples/Is_homeschooling_preferred_by_people.json";
  import analysisData1 from "$data/samples/pros_cons_homeschooling_2.json";
  import analysisData2 from "$data/samples/Americans_and_tiktok.json";
  import analysisData3 from "$data/samples/pros_cons_homeschooling_2.json";
  import analysisData4 from "$data/samples/pros_cons_homeschooling_2.json";
  import tiktokTrends from "$data/samples/Tiktok_trends_worldwide.json";
  import Section from "$components/stoogle/Section.svelte";
  import Country from "$components/stoogle/Country.svelte";

  export let searchQuery = "AI is a threat or not";
  export let isSticky = false;
  export let isLoading = false;
  export let isPopupOpen = false;
  export let web = "";
  export let pageCount = 5;
  export let isDataLoading = false;
  export let clusterData = {};
  export let clusters = [];
  export let sharedArticles = [];
  export let sharedFacts = [];
  export let stats = {};
  export let errorMessage = null;

  export let viewportHeight;
  export let viewportWidth;

  let countryCode;

  const exampleQueries = [
    {
      query: "AI is a threat or not",
      data: analysisData,
    },
    {
      query: "AI is a threat or not -2",
      data: analysisData5,
    },
    // {
    //   query: "Pros and cons of homeschooling statistics",
    //   data: analysisData1,
    // },
    {
      query: "Is homeschooling preferred by people",
      data: analysisData6,
    },
    {
      query: "Tiktok trends worldwide",
      data: tiktokTrends,
    },
    // {
    //   query: "Americans and TikTok",
    //   data: analysisData2,
    // },

    // {
    //   query: "Trends and stats on tiktok worldwide",
    //   data: analysisData3,
    // },
    // {
    //   query: "Social Media and Technology statistics",
    //   data: analysisData4,
    // },
  ];

  const togglePopup = () => {
    isPopupOpen = !isPopupOpen;
  };

  const handlePopupSubmit = (web_, pageCount_) => {
    web = web_;
    pageCount = pageCount_;
    isPopupOpen = false;
  };

  const validateDataStructure = (data) => {
    if (!data || !data.clusters || !data.stats) {
      throw new Error("Invalid data structure received from API");
    }
  };

  const resetState = () => {
    clusterData = {};
    clusters = [];
    sharedArticles = [];
    sharedFacts = [];
    stats = {};
    isDataLoading = false;
    errorMessage = null;
  };
  
  const stepHandler = (step) => {
    return step;
  };

  // // Get data from the API
  const handleSearch = async (e) => {
    e.preventDefault();
    isSticky = true;
    isLoading = true;
    resetState();

    try {
      const response = await fetch(
        `http://0.0.0.0:8000/stories?query=${encodeURIComponent(
          searchQuery
        )}&web=${encodeURIComponent(
          web
        )}&page_count=${pageCount}&country_code=${countryCode}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      validateDataStructure(data);

      // Update all reactive states
      clusterData = data;
      clusters = data.clusters;
      sharedArticles = data.shared_articles;
      sharedFacts = data.shared_facts;
      stats = data.stats;
      isDataLoading = true;
    } catch (error) {
      errorMessage = error.message;
      console.error("Fetch Error:", error);
    } finally {
      isLoading = false;
    }
  };

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const loadExampleData = async (selectedExample) => {
    searchQuery = selectedExample.query;
    isSticky = true;
    isLoading = true;
    resetState();
    try {
      const exampleData = selectedExample.data;
      validateDataStructure(exampleData);

      setTimeout(() => {
        clusterData = exampleData;
        clusters = exampleData.clusters;
        sharedArticles = exampleData.shared_articles;
        sharedFacts = exampleData.shared_facts;
        stats = exampleData.stats;
        isDataLoading = true;
        isLoading = false;
      }, 500);
    } catch (error) {
      errorMessage = `Failed to load example: ${error.message}`;
      isLoading = false;
    }
  };
</script>

<div class={isSticky ? "" : "mainPage"}>
  <form on:submit={handleSearch} class="bg-white dark:bg-[#1a2e3c] {isSticky ? "stickyForm" : "form"}">
    <img
      src="/assets/stoogle/compendia-2.svg"
      class={isSticky ? "stickyLogo" : "logo"}
      alt="Stoogle logo"
    />
    <div class={isSticky ? "stickyInputContainer" : "inputContainer"}>
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Search Stoogle..."
        class="input text-black "
      />
      {#if isLoading}
        <img
          src="/assets/stoogle/loader.svg"
          class="loadersvg"
          alt="Loading..."
        />
      {:else}
        <img
          src="/assets/stoogle/options.svg"
          class="options color-primary"
          alt="Options"
          on:click={togglePopup}
        />
      {/if}
    </div>
    <div class={isSticky ? "stickyButtonContainer" : "buttonContainer"}>
      <button type="submit" class={isSticky ? "stickyButton" : "button"}
        >Search</button
      >
    </div>
    {#if !isSticky}
      <div
        class="flex pt-4 flex-wrap gap-2 mt-5 justify-center overflow-x-auto"
      >
        {#each exampleQueries as example}
        <div
        class="bg-gray-50 text-gray-700 px-4 py-2 rounded-full text-sm cursor-pointer
               transition-all duration-200 hover:bg-gray-100 hover:-translate-y-1 
               active:translate-y-0 border border-gray-200/80
               dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700/80
               dark:hover:bg-gray-700 dark:hover:text-gray-200
               focus:outline-none focus:ring-2 focus:ring-gray-400/50
               dark:focus:ring-gray-500/50"
        on:click={() => loadExampleData(example)}
      >
            {example.query}
          </div>
        {/each}
      </div>
    {/if}
  </form>

  {#if errorMessage}
    <div
      class="fixed inset-0 bg-red-100/90 flex flex-col items-center justify-center z-50 p-4"
    >
      <div class="bg-red-500 text-white p-6 rounded-lg max-w-2xl text-center">
        <h2 class="text-2xl font-bold mb-4">Error Loading Data</h2>
        <p class="mb-4">{errorMessage}</p>
        <button
          class="bg-white text-red-600 px-4 py-2 rounded hover:bg-red-50 transition-colors"
          on:click={() => (errorMessage = null)}
        >
          Try Again
        </button>
      </div>
    </div>
  {:else if isLoading}
    <div class="lottie-container">
      <DotLottieSvelte src="/assets/stoogle/searching.lottie" loop autoplay />
    </div>
  {/if}

  {#if isPopupOpen}
    <Popup {web} {pageCount} {togglePopup} {handlePopupSubmit} />
  {/if}

  {#if isDataLoading && !isLoading}
    <Section {viewportHeight} {viewportWidth} {clusterData} {stepHandler} />
  {/if}
</div>

<Country bind:countryCode></Country>

<footer
  class="fixed bottom-0 w-full text-black bg-white dark:bg-[var(--footer-bg)] dark:text-[var(--footer-text)] text-center py-2 text-sm cursor-none"
>
  Compendia can make mistakes. Check important info.
</footer>

<style>
  .lottie-container {
    width: 100vw;
    height: 100vh;
    top: 100px;
  }

  .lottie-animation {
    width: 100vw;
    height: 100vh;
  }

  .logo {
    height: 8em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em var(--color-primary-alpha));
  }
  .logo.react:hover {
    filter: drop-shadow(0 0 2em var(--color-secondary-alpha));
  }

  @keyframes logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    a:nth-of-type(2) .logo {
      animation: logo-spin infinite 20s linear;
    }
  }

  .stickyLogo {
    /* margin-bottom: 40px; */
    margin-left: 20px;
    margin-right: 20px;
    width: 100px;
    height: 50px;
  }

  .form {
    width: 100%;
    max-width: 584px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stickyForm {
    position: fixed;
    top: 0; /* Stick to the top */
    left: 0;
    right: 0;
    z-index: 3; /* Ensure it stays above other content */
    width: 100%;
    /* max-width: 584px; */
    margin: 0 auto;
    display: flex;
    flex-direction: raw;
    align-items: center;
    padding: 20px 0; /* Add some padding */
    box-shadow: 0 2px 5px var(--color-shadow); /* Optional shadow */
  }

  .inputContainer {
    width: 100%;
    display: flex;
  }

  .stickyInputContainer {
    width: 60%;
    display: flex;
    margin-left: 20px;
    margin-right: 20px;
  }

  .input {
    width: 100%;
    padding: 12px 20px;
    font-size: 16px;
    border: 1px solid var(--color-input-border);
    border-radius: 24px;
    box-shadow: none;
    outline: none;
    transition:
      box-shadow 0.3s,
      border-color 0.3s;
    text-overflow: ellipsis;
  }

  .buttonContainer {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .stickyButtonContainer {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-left: 20px;
  }

  .button {
    padding: 10px 24px;
    font-size: 14px;
    background-color: var(--color-button-bg);
    color: var(--color-button-text);
    border: 1px solid var(--color-button-bg);
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    transition:
      background-color 0.3s,
      box-shadow 0.3s;
  }

  .stickyButton {
    padding: 10px 24px;
    font-size: 14px;
    background-color: var(--color-button-bg);
    color: var(--color-button-text);
    border: 1px solid var(--color-button-bg);
    border-radius: 4px;
    cursor: pointer;
    transition:
      background-color 0.3s,
      box-shadow 0.3s;
  }

  .mainPage {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    flex-wrap: nowrap;
    min-height: 100vh;
  }

  .spinner {
    border: 4px solid var(--color-spinner-bg);
    border-left-color: var(--color-spinner-fg);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
    margin-left: 10px; /* Add some space between the input and spinner */
    display: inline-block;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .loadersvg {
    width: 35px;
    height: 35px;
    margin-top: 5px;
    margin-left: -50px;
    position: relative;
  }

  .loader {
    width: 20px;
    height: 20px;
    margin-top: 12px;
    margin-left: -50px;
    position: relative;
    border-radius: 50%;
    color: var(--color-loader);
    animation: fill 1s ease-in infinite alternate;
  }

  .loader::before,
  .loader::after {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    left: 20px;
    top: 0;
    animation: fill 0.9s ease-in infinite alternate;
  }

  .loader::after {
    left: auto;
    right: 20px;
    animation-duration: 1.1s;
  }

  @keyframes fill {
    0% {
      box-shadow: 0 0 0 1px inset;
    }
    100% {
      box-shadow: 0 0 0 5px inset;
    }
  }

  .options {
    width: 22px;
    height: 22px;
    margin-top: 13px;
    margin-left: -35px;
    position: relative;
    cursor: pointer;
  }
</style>
