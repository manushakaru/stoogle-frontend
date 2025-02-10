<script>
    import { Doughnut } from 'svelte-chartjs';
    export let inputData = [];
  
    import {
      Chart as ChartJS,
      Title,
      Tooltip,
      Legend,
      ArcElement,
      CategoryScale,
    } from 'chart.js';
  
    ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

    function transformData(inputData) {
    return {
      labels: inputData.map(item => item.x),
      datasets: [
        {
          data: inputData.map(item => parseFloat(item.y)), 
          backgroundColor: inputData.map(item => item.color),
          hoverBackgroundColor: inputData.map(item => lightenColor(item.color, 20)), 
        },
      ],
    };
  }

  function lightenColor(hex, percent) {
    let num = parseInt(hex.slice(1), 16);
    let r = Math.min(255, (num >> 16) + percent);
    let g = Math.min(255, ((num >> 8) & 0x00ff) + percent);
    let b = Math.min(255, (num & 0x0000ff) + percent);
    return `rgb(${r},${g},${b})`;
  }

  let data = transformData(inputData);
  </script>
  
  <Doughnut {data} options={{ responsive: true }} />
  