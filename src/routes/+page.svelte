<script lang="ts">
	import { goto } from '$app/navigation';

	const handleAccessRealPage = () => {
		goto('/real');
	};
</script>

<div class="app">
	<main>
		<div class="coming-soon">
			<h1>Pròximament...</h1>
			<p> </p>
			<img src="/images/logo.png" alt="Logo" height="150" />
		</div>
	</main>
	<button class="hidden-button" on:click={handleAccessRealPage} title="Navigate to real page">
		→
	</button>
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
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.coming-soon {
		text-align: center;
		font-family: 'Inter', sans-serif;
	}

	.coming-soon h1 {
		font-size: 3rem;
		margin: 0;
		color: #333;
	}

	.coming-soon p {
		font-size: 2rem;
		color: #666;
		margin-top: 1rem;
	}

	.hidden-button {
		position: fixed;
		bottom: 10px;
		right: 10px;
		width: 20px;
		height: 20px;
		padding: 0;
		border: none;
		background: transparent;
		color: transparent;
		cursor: pointer;
		font-size: 12px;
		opacity: 0.1;
		transition: opacity 0.2s;
	}

	.hidden-button:hover {
		opacity: 0.3;
	}
</style>
