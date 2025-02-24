<script>
  import VisCard from "$components/stoogle/VisCard.svelte";
  import TextCard from "$components/stoogle/TextCard.svelte";
  import Scrolly from "$components/helpers/Scrolly.svelte";
  export let facts;
  export let value = 0;
  export let onFactChange;
  export let items = []
  export let sorted_article_ids;
  
  $: value, onFactChange(value); 

</script>

<Scrolly bind:value>
  {#each facts as fact, i}
    {@const active = value === i}
    {@const last = i == facts.length - 1 ? true : false}
    {@const first = i == 0 ? true : false}
    <div bind:this={items[i]} class="vis-card" class:active class:last class:first>
      {#if fact.vis_recommendation === "text"}
        <TextCard  fact={fact} sorted_article_ids={sorted_article_ids} />
      {:else}
        <VisCard fact={fact} sorted_article_ids={sorted_article_ids}></VisCard>
      {/if}
    </div>
  {/each}
</Scrolly>

<style>
  .vis-card {
    height: 60vh;
    padding: 20px;
    display: block;
    width: fit-content;
    margin-left: 50px;
    /* margin: 0 auto; */
    opacity: 0.3;
    transition: opacity 300ms ease;
    max-width: 700px;
    z-index: 2;
  }
  .vis-card.active {
    opacity: 1;
  }
  .first {
    margin-top: 20vh;
  }
  .last {
    margin-bottom: 50vh;
  }
</style>
