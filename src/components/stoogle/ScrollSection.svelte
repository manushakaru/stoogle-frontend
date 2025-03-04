<script>
  import FactScroll from "$components/stoogle/FactScroll.svelte";
  import Overview from "$components/stoogle/Overview.svelte";

  export let viewportHeight;
  export let viewportWidth;
  export let stepHandler;

  export let clusterData;

  let clusters = [];
  let sharedArticles = [];
  let sharedFacts = [];
  let stats = {};
  let allFacts = [];
  let items = [];

  let value;
  let newValues;
  let step;
  let curMergedId;
  let sorted_article_ids;

  clusters = clusterData["clusters"];
  sharedArticles = clusterData["shared_articles"];
  sharedFacts = clusterData["shared_facts"];
  stats = clusterData["stats"];
  allFacts = clusterData["all_merged_facts_in_order"];
  sorted_article_ids = clusterData["sorted_article_ids"];

  let stepCounts = [];
  let total = -1;

  const getSteps = () => {
    clusters.forEach((cluster) => {
      const numFacts = cluster.number_of_facts;
      total += numFacts;
      stepCounts.push(total);
    });
  };

  getSteps();

  $: value, handleStepChange();

  function handleStepChange() {
    if (step == 0 && value == undefined) {
      step = undefined;
    } else if (step === total && value === undefined) {
      step = total;
    } else {
      step = value;
    }
    newValues = stepHandler(step);
  }

  function handleFactChange(newValue) {
    if (allFacts === undefined) return;
    value = newValue;
    const currentFact = allFacts[value];
    curMergedId = undefined;
    if (currentFact) {
      curMergedId = currentFact.merged_id;
      console.log("curMergedId", curMergedId);
    }
  }
</script>

<div class="scroll-section matt-scroll">
  <div class="sticky" style="max-height:{viewportHeight - 200}px;">
    <Overview
      bind:value
      data={clusterData}
      {viewportHeight}
      {viewportWidth}
      {step}
      {curMergedId}
      {items}
      {sorted_article_ids}
    ></Overview>
  </div>

  <div class="steps">
    <FactScroll
      bind:value
      {items}
      facts={allFacts}
      {sorted_article_ids}
      onFactChange={handleFactChange}
    />
  </div>
</div>

<style>
  .sticky {
    position: sticky;
    z-index: 1;
    display: flex;
    justify-content: center;
    top: 100px;
  }
  .steps {
    position: relative;
    z-index: 2;
    max-width: 2000px;
    padding: 16px;
    margin: 0 auto;
    pointer-events: none;
  }
</style>
