<script>
	export let title = "Compendia";
	export let description = "Compendia is an automated system that analyzes online articles related to a user query and generates coherent data stories based on the user's informational needs.";
	export let url = "https://compendia.onrender.com/";
	export let keywords = "Compendia, compendia, data storytelling, scrollytelling, automated data stories, AI-driven insights";
	export let preloadFont = [];
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content="Compendia Team" />
	<meta name="news_keywords" content={keywords} />

	<meta property="og:title" content={title} />
	<meta property="og:site_name" content="Compendia" />
	<meta property="og:url" content={url} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="article" />
	<meta property="og:locale" content="en_US" />

	<!-- <meta property="og:image" content="{url}/assets/Compendia-preview.jpg" />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="600" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="{url}" />
	<meta name="twitter:creator" content="@Compendia" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image:src" content="{url}/assets/Compendia-preview.jpg" /> -->

	<meta name="robots" content="max-image-preview:large" />

	<link rel="canonical" href="{url}/" />

	{#each preloadFont as href}
		<link rel="preload" {href} as="font" type="font/woff2" crossorigin />
	{/each}
</svelte:head>
