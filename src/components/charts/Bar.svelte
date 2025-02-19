<script>
  import { Bar } from "svelte-chartjs";
  export let inputData = [];
  export let axisXTitle;
  export let axisYTitle;

  import {
    Chart,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from "chart.js";

  Chart.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  );

  function transformData(input) {
    const labels = input.map((item) => item.x); // Extract x values as labels
    const data = input.map((item) => parseFloat(item.y.match(/\d+(\.\d+)?/g)[0])); // Extract y values and convert them to integers
    const backgroundColor = input.map((item) => item.color); // Extract color values

    return {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: backgroundColor.map((color) => `${color}80`), // Adjust opacity to 0.5
          borderWidth: 2,
          borderColor: backgroundColor,
        },
      ],
    };
  }
  let data = transformData(inputData);

</script>

<Bar
  {data}
  options={{
    responsive: true,
    plugins: {
      legend: { display: false } 
    },
    scales: {
      x: { 
        title: {
          display: true,
          text: axisXTitle, // Set your desired X-axis title here
          color: 'rgba(255, 255, 255, 0.8)', // White color for the title
        },
        ticks: { color: 'rgba(255, 255, 255, 0.7)' }, // White text for X-axis labels
        grid: { 
          drawBorder: true, // Ensure the X-axis line is visible
          drawOnChartArea: true, // Allow grid lines inside the chart
          color: 'rgba(255, 255, 255, 0.1)' // White axis line with some transparency
        }
      },
      y: { 
        title: {
          display: true,
          text: axisYTitle, // Set your desired X-axis title here
          color: 'rgba(255, 255, 255, 0.8)', // White color for the title
        },
        beginAtZero: true,
        ticks: { color: 'rgba(255, 255, 255, 0.7)' }, // White text for Y-axis labels
        grid: { 
          drawBorder: true, // Ensure the Y-axis line is visible
          drawOnChartArea: true, // Allow grid lines inside the chart
          color: 'rgba(255, 255, 255, 0.3)' // White axis line with some transparency
        }
      }
    }
  }}

style="width: 320px; height: 300px;" 
/>
