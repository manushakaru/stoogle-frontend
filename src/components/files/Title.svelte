<script>
  export let circle;
  export let cluster;
  export let radius;
</script>

<svg width="100%" height="100%">
  {#if circle && cluster}
    <rect
      x={circle.x - 50}
      y={circle.y - radius - 60}
      width="100"
      height="40"
      rx="15"
      ry="15"
      fill="#E0EEFC"
      stroke="black"
      stroke-width="2"
    />

    <text
      x={circle.x}
      y={circle.y - radius - 35}
      text-anchor="middle"
      font-size="14px"
      fill="black"
    >
      {cluster.title}
    </text>
  {/if}
</svg>

<style>
  svg {
    position: absolute;
  }

  rect {
    transition: all 0.3s ease-in-out;
  }

  text {
    font-family: Arial, sans-serif;
  }
</style>
