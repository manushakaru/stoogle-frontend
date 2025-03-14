<script>
	import {tweened} from "svelte/motion";
	import { onMount } from 'svelte';

	onMount(() => {
	});
	export let siz=500;		//	radius 
	export let cx=0;
	export let cy=0;
	export let ratios = [];
	export let colours = ['tomato','gray','blue','green','bisque'];
	export let segmentTitles=[];
	export let titles=[];
	export let holeRadius = 0; 
	export let isGauge = false;
	
	let mult = 1;
	
	const tweenedRatios = tweened(0,{duration :800});
	
	$: $tweenedRatios = 1;
	$: mult = 100/sum(ratios.length);
	
	function sum(idx) {
		let s = ratios.reduce((acc,r,i,arr)=>{if (i<idx) return acc+=r; return acc;},0);
		if (isGauge) s *= 2;
		return s;
	}
</script>
		<circle cx="{cx}" cy="{cy}" r="{$tweenedRatios*siz}" fill="bisque" stroke="black"  stroke-width="1"/>

		{#each ratios as ratio, idx}
				<circle cx="{cx}" cy="{cy}" r="{$tweenedRatios*siz/2}"  opacity="{$tweenedRatios}"  transform="translate({cx},{cy}) rotate({(isGauge?0.5:1)*($tweenedRatios*sum(idx)*1*3.6*mult)-180}) translate({-cx},{-cy})" style='stroke-dasharray:{$tweenedRatios*ratio*3.142*siz*mult / 100} {3.142*siz/1};' fill="transparent" stroke="{colours[idx%colours.length]}" stroke-width="{$tweenedRatios*siz}">
					{#if segmentTitles[idx]}
						<title>{segmentTitles[idx]}</title> 
					{/if}
			</circle>
		{/each}

		{#if holeRadius} 
			<circle cx="{cx}" cy="{cy}" class="donut-hole" stroke="black" fill="transparent" stroke-width="1" r="{$tweenedRatios*holeRadius*siz/100}"/>
		{/if}

		{#if titles[0]} 
			<g class="chart-text" style='opacity:{$tweenedRatios};  '>
				<text x="{cx}" y="{Number(cy)-siz/15}" >{titles[0]}</text>
				{#if titles[1]}
					<text x="{cx}" y={siz/5+Number(cy)} class="sub-text">{titles[1]}</text>
				{/if}
			</g>
		{/if}

<style>
	@import url(https://fonts.googleapis.com/css?family=Montserrat:400);
	.sub-text {
		font: 14px "Montserrat", Arial, sans-serif;
	}
	.chart-text {
		font: 22px "Montserrat", Arial, sans-serif;
		fill: #000;
		text-anchor: middle;
		user-select:none;
	}
	.donut-hole {
		 fill:#fff;
	}
</style>