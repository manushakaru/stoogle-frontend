<script>
  import PieChart from "$components/stoogle/PieChart.svelte";
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
  let curFactid;

  clusters = clusterData["clusters"];
  sharedArticles = clusterData["shared_articles"];
  sharedFacts = clusterData["shared_facts"];
  stats = clusterData["stats"];
  allFacts = clusterData["all_facts_in_order"];

  let stepCounts = [];
  let total = -1;

  const getSteps = () => {
    clusters.forEach((cluster) => {
      console.log("f", cluster.facts);
      const numFacts = cluster.number_of_facts;
      total += numFacts;
      stepCounts.push(total);
    });
  };

  getSteps();

  $: value, handleStepChange();

  function handleStepChange() {
    if (step == 0 && value == undefined) {
      step = 0;
    } else if (step === total && value === undefined) {
      step = total;
    } else {
      step = value;
    }
    newValues = stepHandler(step);
  }

  function handleFactChange(newValue) {
    value = newValue;
    const currentFact = allFacts[value];
    if(currentFact) {
      curFactid = currentFact.fact_id;
      console.log("Current fact:", curFactid);
    }
  }
</script>

<div class="scroll-section matt-scroll">
  <div class="sticky" style="max-height:{viewportHeight - 200}px;">
    {#if stepCounts}
      {@const previousLimit = stepCounts[0]}
      <Overview bind:value data={clusterData} {viewportHeight} {viewportWidth}{step}{curFactid}{items}
        ></Overview>
      {#if step < previousLimit}
      {:else if step >= previousLimit}
        <!--<PieChart></PieChart>-->
      {/if}
    {/if}
  </div>

  <div class="steps">
    <FactScroll bind:value={value} items={items} facts={allFacts} onFactChange={handleFactChange} />
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
