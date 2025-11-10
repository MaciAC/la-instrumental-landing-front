<script lang="ts">
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import '../index.css';
	import '../i18n/config';

	let { children } = $props();

	onMount(() => {
		const htmlElement = document.documentElement;
		htmlElement.lang = 'ca';
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>La instrumental</title>
	<meta name="description" content="Per imaginar futurs més lliures i col·lectius per la música" />
</svelte:head>

{@render children()}
