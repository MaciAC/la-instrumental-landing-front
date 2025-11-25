<script lang="ts">
	import Header from '../components/Header.svelte';
	import Hero from '../components/Hero.svelte';
	import Manifest from '../components/Manifest.svelte';
	import Trobades from '../components/Trobades.svelte';
	// import Roadmap from '../../components/Roadmap.svelte';
	import AdhesionForm from '../components/AdhesionForm.svelte';
	import Footer from '../components/Footer.svelte';
</script>

<div class="app">
	<Header />
	<main>
		<Hero />
		<Manifest />
		<Trobades />
		<!-- <Roadmap /> -->
		<AdhesionForm />
	</main>
	<Footer />
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}

	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
	}
</style>
