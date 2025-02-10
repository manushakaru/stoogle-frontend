<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
  
    let data = [
      { label: "A", value: 30 },
      { label: "B", value: 80 },
      { label: "C", value: 45 },
      { label: "D", value: 60 },
      { label: "E", value: 20 },
      { label: "F", value: 90 },
      { label: "G", value: 55 },
    ];
  
    let width = 500;
    let height = 300;
  
    let margin = { top: 20, right: 30, bottom: 40, left: 40 };
  
    let svg;
  
    onMount(() => {
      // Set up SVG
      const svgElement = d3.select(svg)
        .attr("width", width)
        .attr("height", height);
  
      // Create scales
      const x = d3.scaleBand()
        .domain(data.map(d => d.label))
        .range([margin.left, width - margin.right])
        .padding(0.1);
  
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .nice()
        .range([height - margin.bottom, margin.top]);
  
      // Add bars to the chart
      svgElement.append("g")
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.label))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => y(0) - y(d.value))
        .attr("fill", "#69b3a2");
  
      // Add x-axis
      svgElement.append("g")
        .selectAll(".x-axis")
        .data([0])
        .enter()
        .append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x));
  
      // Add y-axis
      svgElement.append("g")
        .selectAll(".y-axis")
        .data([0])
        .enter()
        .append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y));
  
      // Add text to cards
    //   const cardGroup = svgElement.append("g")
    //     .attr("class", "cards")
    //     .selectAll(".card")
    //     .data(data)
    //     .enter()
    //     .append("g")
    //     .attr("class", "card")
    //     .attr("transform", d => `translate(${x(d.label)}, ${y(d.value) - 10})`);
  
    //   cardGroup.append("rect")
    //     .attr("width", x.bandwidth())
    //     .attr("height", 30)
    //     .attr("fill", "#f4f4f4")
    //     .attr("stroke", "#ccc");
  
    //   cardGroup.append("text")
    //     .attr("x", x.bandwidth() / 2)
    //     .attr("y", 20)
    //     .attr("text-anchor", "middle")
    //     .text(d => `${d.label}: ${d.value}`);
    });
  </script>
  
  <svg bind:this={svg}></svg>
  
  <style>
    svg {
      display: block;
      margin: 0 auto;
    }
  
    .bar {
      transition: all 0.3s ease;
    }
  
    .bar:hover {
      opacity: 0.7;
    }
  
    .cards {
      font-family: Arial, sans-serif;
      font-size: 12px;
    }
  
    .card rect {
      border-radius: 5px;
    }
  
    .card text {
      fill: #333;
    }
  </style>
  