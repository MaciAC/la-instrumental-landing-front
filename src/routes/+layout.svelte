<script lang="ts">
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.ico';
	import '../index.css';
	import '../i18n/config';

	let { children } = $props();

	onMount(() => {
		const htmlElement = document.documentElement;
		htmlElement.lang = 'ca';
	});
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#c3462f" />
	<link rel="icon" href={favicon} />
	<link rel="apple-touch-icon" href={favicon} />
	<title>La instrumental</title>
	<meta name="description" content="Per imaginar futurs més lliures i col·lectius per a la música" />
	<meta property="og:title" content="La Instrumental" />
	<meta property="og:description" content="Per imaginar futurs més lliures i col·lectius per a la música" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/images/logo-blanc.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="/images/logo-blanc.png" />
	<meta name="twitter:title" content="La instrumental" />
	<meta name="twitter:description" content="Per imaginar futurs més lliures i col·lectius per a la música" />
</svelte:head>

{@render children()}
