<script>
    import { LayerCake, ScaledSvg, Html } from 'layercake';
    import { scaleBand } from 'd3-scale';
  
    import Bar from '$components/layercake/Bar.svelte';
    import AxisX from '$components/layercake/AxisX.percent-range.html.svelte';
    import AxisY from '$components/layercake/AxisY.percent-range.html.svelte';
  
    // This example loads csv data as json using @rollup/plugin-dsv
    import data from '$data/groups.csv';

    console.log('vis ', data)
  
    data.forEach(d => {
      d.value = +d.value;
    });
  </script>
  
  <div class="chart-container">
    <LayerCake
      ssr
      percentRange
      padding={{ top: 0, right: 20, bottom: 20, left: 35 }}
      x="value"
      y="year"
      yScale={scaleBand().paddingInner(0.05).round(true)}
      yDomain={['1979', '1980', '1981', '1982', '1983']}
      xDomain={[0, null]}
      {data}
    >
      <Html>
        <AxisX gridlines baseline snapLabels />
        <AxisY gridlines={false} tickMarks />
      </Html>
      <ScaledSvg>
        <Bar />
      </ScaledSvg>
    </LayerCake>
  </div>
  
  <style>
    .chart-container {
      width: 100%;
      height: 200px;
    }
  </style>