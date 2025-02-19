<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  export let inputData = [];

  let dataUnits = [];
  let totalUnits = 100;
  let unitsPerRow = 10;
  let unitSize = 20;
  let unitSpacing = 3;

  onMount(() => {
    dataUnits = d3.range(totalUnits).map((d) => ({ id: d + 1 }));
    let cumulative = 0;

    inputData.forEach((d) => {
      const percentage = parseFloat(d.y.match(/\d+(\.\d+)?/g)[0]);
      const unitsCount = Math.round((percentage / 100) * totalUnits);

      for (let i = cumulative; i < cumulative + unitsCount; i++) {
        if (i < totalUnits) {
          dataUnits[i].color = d.color;
          dataUnits[i].label = `${d.x} (${d.y})`;
        }
      }
      cumulative += unitsCount;
    });

    for (let i = cumulative; i < totalUnits; i++) {
      dataUnits[i].color = "#e0e0e0";
      dataUnits[i].label = "Other";
    }
  });
</script>

<svg width={unitsPerRow * (unitSize + unitSpacing) + 150} height={Math.ceil(totalUnits / unitsPerRow) * (unitSize + unitSpacing) + 100}>
  {#each dataUnits as d, i}
    <circle
      cx={(i % unitsPerRow) * (unitSize + unitSpacing) + unitSize / 2}
      cy={Math.floor(i / unitsPerRow) * (unitSize + unitSpacing) + unitSize / 2}
      r={unitSize / 2 - unitSpacing}
      fill={d.color}
    />
  {/each}

  <g transform={`translate(10, ${Math.ceil(totalUnits / unitsPerRow) * (unitSize + unitSpacing) + 20})`}>
    {#each inputData as d, i}
      <g transform={`translate(10, ${i * 25})`}>
        <circle cx="0" cy="0" r="6" fill={d.color}></circle>
        <text x="20" y="2" style="font-size: 12px; fill: white;" alignment-baseline="middle">{d.x} ({d.y})</text>
      </g>
    {/each}
  </g>
</svg>
