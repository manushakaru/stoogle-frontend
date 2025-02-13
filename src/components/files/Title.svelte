<script>
  export let cluster;
  export let radius;
</script>


  {#if radius && cluster}
    <rect
      x={- 50}
      y={- radius - 60}
      width="100"
      height="40"
      rx="15"
      ry="15"
      fill="#E0EEFC"

    />

    <text
      x={0}
      y={- radius - 35}
      text-anchor="middle"
      font-size="14px"
      fill="black"
    >
      {cluster.title}
    </text>
  {/if}


<style>

  rect {
    transition: all 0.3s ease-in-out;
  }

  text {
    font-family: Arial, sans-serif;
  }
</style>
