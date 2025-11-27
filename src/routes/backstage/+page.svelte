<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let password = '';
	let loading = false;
	let error = '';

	onMount(() => {
		const savedCredentials = localStorage.getItem('adminCredentials');
		if (savedCredentials) {
			goto('/backstage/adhesions');
		}
	});

	async function handleLogin(e: Event) {
		e.preventDefault();
		loading = true;
		error = '';

		if (!password.trim()) {
			error = 'Password is required';
			loading = false;
			return;
		}

		const credentials = btoa(`admin:${password}`);
		localStorage.setItem('adminCredentials', credentials);
		goto('/backstage/adhesions');
	}

	function logout() {
		localStorage.removeItem('adminCredentials');
		password = '';
	}
</script>

<div class="admin-page">
	<div class="container">
		<h1>Accés backstage</h1>
		<form on:submit={handleLogin} class="form-wrapper">
			<div class="form-group">
				<label for="password">Contrasenya</label>
				<input
					id="password"
					type="password"
					bind:value={password}
					disabled={loading}
				/>
			</div>
			{#if error}
				<div class="form-error">{error}</div>
			{/if}
			<button type="submit" class="login-btn" disabled={loading}>
				{loading ? 'Authenticating...' : 'Login'}
			</button>
		</form>
	</div>
</div>

<style>
	.login-btn {
		background-color: #1a1a1a;
		color: #fafafa;
		border: 2px solid #1a1a1a;
		padding: 0.75rem 1.5rem;
		margin-top: 2rem;
		cursor: pointer;
		font-size: 0.9rem;
		text-transform: uppercase;
		font-weight: 700;
		letter-spacing: 0.08em;
	}
</style>