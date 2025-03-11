<script>
  import { Line } from "svelte-chartjs";
  export let inputData = [];
  export let axisXTitle;
  export let axisYTitle;
  
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  } from "chart.js";

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  );

  const transformData = (inputData) => {
    const labels = inputData.map((item) => item.label);
    const data = inputData.map((item) => parseFloat(item.value.match(/\d+(\.\d+)?/g)[0]));
    const pointColors = inputData.map((item) => `${item.color}d1` || "#EB3678");

    return {
      labels: labels,
      datasets: [
        {
          fill: true,
          lineTension: 0.3,
          backgroundColor: "#EB3678d1",
          borderColor: "rgba(205, 130, 158, 0.7)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          // pointBorderColor: "#EB3678",
          // pointBackgroundColor: "#EB3678",
          pointBorderColor: pointColors, // Different color for each point's border
          pointBackgroundColor: pointColors,
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220, 0.8)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 8,
          data: data,
        },
      ],
    };
  };

  let data = transformData(inputData);
</script>

<Line
  {data}
  options={{
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: axisXTitle, // Set your desired X-axis title here
          color: 'rgba(255, 255, 255, 0.8)', // White color for the title
        },
        ticks: { color: "rgba(255, 255, 255, 0.8)" }, // White text for X-axis labels
        grid: {
          drawBorder: true, // Ensure the X-axis line is visible
          drawOnChartArea: true, // Allow grid lines inside the chart
          color: "rgba(255, 255, 255, 0.3)", // White axis line with some transparency
        },
      },
      y: {
        title: {
          display: true,
          text: axisYTitle, // Set your desired X-axis title here
          color: 'rgba(255, 255, 255, 0.8)', // White color for the title
        },
        // beginAtZero: true,
        ticks: { color: "rgba(255, 255, 255, 0.8)" }, // White text for Y-axis labels
        grid: {
          drawBorder: true, // Ensure the Y-axis line is visible
          drawOnChartArea: true, // Allow grid lines inside the chart
          color: "rgba(255, 255, 255, 0.3)", // White axis line with some transparency
        },
      },
    },
  }}
  style="width: 340px; height: 300px;"
/>
