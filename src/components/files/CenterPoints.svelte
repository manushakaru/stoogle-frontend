<script>
  import { onMount } from "svelte";

  export let numCircles;
  export let width;
  export let height;
  export let clusterIds;

  export let circles = [];

  function calculateCirclePositions() {
    if (!numCircles || !width || !height) return;

    circles = [];

    const angleStep = (2 * Math.PI) / numCircles;
    const radius = Math.min(width, height) / 3.5;

    for (let i = 0; i < numCircles; i++) {
      const angle = i * angleStep;
      const x = Math.cos(angle) * radius + width / 2;
      const y = Math.sin(angle) * radius + height / 2;
      const id = clusterIds[i];
      circles.push({ x, y, id });
    }
  }

  $: {
    if (numCircles && width && height) {
      calculateCirclePositions();
      console.log("circles: ", circles);
    }
  }

  onMount(() => {
    if (numCircles && width && height) {
      calculateCirclePositions();
    }
  });
</script>

<style>
  svg {
    border: 1px solid #ddd;
  }

  circle {
    transition: transform 0.3s ease-in-out;
  }
</style>
