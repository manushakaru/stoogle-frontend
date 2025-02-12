<script>
  export let inputData = [];
  let item = inputData[0];
  let item2 = inputData[1];
  let percentNumber = parseInt(item.y.replace("%", ""));

  let notFilled = "#e0e0e0";
  let filled = item.color || "#EB3678";

  let labelFilled = item.x;
  let labelNotFilled = item2.x || "Other";

  const width = 300;
  const height = 250;
  const numRows = 10;
  const numCols = 10;
  const cellSize = 22;

  let data = Array.from({ length: numCols * numRows }, (_, i) => i);
  let tooltip = "";
  let tooltipX = 0;
  let tooltipY = 0;
  let showTooltip = false;

  function getX(index) {
    return (index % numCols) * cellSize;
  }

  function getY(index) {
    return Math.floor(index / numCols) * cellSize;
  }

  function handleMouseOver(event, d) {
    tooltip =
      d < percentNumber
        ? `<strong>${labelFilled}</strong> : ${percentNumber}`
        : `<strong>${labelNotFilled}</strong> : ${100 - percentNumber}`;

    // Get bounding box of the SVG container
    const graphRect = event.currentTarget.closest(".graph-container").getBoundingClientRect();
    
    // Position tooltip relative to the container
    tooltipX = event.clientX - graphRect.left + "px";
    tooltipY = event.clientY - graphRect.top + "px";

    showTooltip = true;
  }

  function handleMouseOut() {
    showTooltip = false;
  }
</script>

<div class="graph-container">
  <svg {width} {height}>
    <g transform="translate(25,25)">
      {#each data as d}
        <circle
          id={"id" + d}
          cx={getX(d)}
          cy={getY(d)}
          r="8.5"
          fill={d < percentNumber ? filled : notFilled}
          on:mouseover={(event) => handleMouseOver(event, d)}
          on:mousemove={(event) => handleMouseOver(event, d)}
          on:mouseout={handleMouseOut}
        />
      {/each}
    </g>
  </svg>

  {#if showTooltip}
    <div
      class="tooltip tooltip-custom bg-black text-white border border-gray-300 rounded px-2 py-1 shadow-lg"
      style="left: {tooltipX}; top: {tooltipY};"
    >
      {@html tooltip}
    </div>
  {/if}
</div>

<style>
  .graph-container {
    position: relative;
    display: inline-block;
  }

  .tooltip-custom {
    position: absolute;
    pointer-events: none;
    transform: translate(-50%, -100%); /* Center above the mouse */
  }
</style>
