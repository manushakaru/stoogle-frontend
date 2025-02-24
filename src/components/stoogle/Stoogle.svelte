<script>
  import { DotLottieSvelte } from "@lottiefiles/dotlottie-svelte";
  import Popup from "$components/stoogle/Popup.svelte";
  import analysisData from "$data/analysis-7.json";
  import Section from "$components/stoogle/Section.svelte";

  // export let searchQuery = "AI is a threat or not";
  export let searchQuery = "Americans and TikTok";
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

  export let viewportHeight;
  export let viewportWidth;

  const togglePopup = () => {
    isPopupOpen = !isPopupOpen;
  };

  const handlePopupSubmit = (web_, pageCount_) => {
    web = web_;
    pageCount = pageCount_;
    console.log("Web:", web);
    console.log("Page Count:", pageCount);
    isPopupOpen = false;
  };

  const stepHandler = (step) => {
    console.log("step handler: ", step);
    return step;
  };

  // // Get data from the API
  const handleSearch = async (e) => {
    e.preventDefault();
    isSticky = true;
    isLoading = true;
    try {
      //   const response = await fetch(`http://127.0.0.1:8000/storyfile`);
      const response = await fetch(
        `http://127.0.0.1:8000/stories?query=${encodeURIComponent(
          searchQuery
        )}&web=${encodeURIComponent(web)}&page_count=${pageCount}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json(); // Parse JSON response
      isDataLoading = true;
      clusterData = data; // Assign fetched data
      clusters = clusterData['clusters']
      sharedArticles = clusterData['shared_articles']
      sharedFacts = clusterData['shared_facts']
      stats = clusterData['stats']
      console.log("is loading", isDataLoading);
      console.log("clusterData:", clusterData);
      // htmlContent = data;
  //   htmlContent = await response.text();
    } catch (error) {
      console.error("Error fetching HTML:", error);
    } finally {
      isLoading = false;
    }
  };

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Get Dummy data
  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   isSticky = true;
  //   isLoading = true;
  //   try {
  //     // await wait(5000);
  //     isDataLoading = true;
  //     clusterData = analysisData;
  //     clusters = clusterData["clusters"];
  //     sharedArticles = clusterData["shared_articles"];
  //     sharedFacts = clusterData["shared_facts"];
  //     stats = clusterData["stats"];
  //   } catch (error) {
  //     console.error("Error fetching HTML:", error);
  //   } finally {
  //     isLoading = false;
  //   }
  // };
</script>

<div class={isSticky ? "" : "mainPage"}>
  <form on:submit={handleSearch} class={isSticky ? "stickyForm" : "form"}>
    <img
      src="/assets/stoogle/Stoogle.svg"
      class={isSticky ? "stickyLogo" : "logo"}
      alt="Stoogle logo"
    />
    <div class={isSticky ? "stickyInputContainer" : "inputContainer"}>
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Search Stoogle..."
        class="input"
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
          class="options"
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
  </form>

  
  {#if isLoading}
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
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.react:hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
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
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Optional shadow */
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
    border: 1px solid #dfe1e5;
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
    background-color: #f8f9fa;
    color: #3c4043;
    border: 1px solid #f8f9fa;
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
    background-color: #f8f9fa;
    color: #3c4043;
    border: 1px solid #f8f9fa;
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
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #09f;
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
    color: #ff3d00;
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
    margin-top: 10px;
    margin-left: -35px;
    position: relative;
    cursor: pointer;
  }
</style>
