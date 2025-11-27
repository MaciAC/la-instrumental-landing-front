<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let token = '';
	let loading = false;
	let error = '';

	onMount(() => {
		const savedToken = localStorage.getItem('adminToken');
		if (savedToken) {
			goto('/admin/adhesions');
		}
	});

	async function handleLogin(e: Event) {
		e.preventDefault();
		loading = true;
		error = '';

		if (!token.trim()) {
			error = 'Token is required';
			loading = false;
			return;
		}

		localStorage.setItem('adminToken', token);
		goto('/admin/adhesions');
	}

	function logout() {
		localStorage.removeItem('adminToken');
		token = '';
	}
</script>

<div class="admin-login">
	<div class="container">
		<h1>Admin Access</h1>
		<form on:submit={handleLogin}>
			<div class="form-group">
				<label for="token">Admin Token</label>
				<input
					id="token"
					type="password"
					bind:value={token}
					placeholder="Enter admin token"
					disabled={loading}
				/>
			</div>
			{#if error}
				<div class="error">{error}</div>
			{/if}
			<button type="submit" disabled={loading}>
				{loading ? 'Authenticating...' : 'Login'}
			</button>
		</form>
	</div>
</div>

<style>
	.admin-login {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	}

	.container {
		background: white;
		padding: 2rem;
		border-radius: 8px;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
		max-width: 400px;
		width: 100%;
	}

	h1 {
		text-align: center;
		color: #333;
		margin-bottom: 1.5rem;
		font-size: 1.8rem;
	}

	.form-group {
		margin-bottom: 1rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
		color: #555;
	}

	input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 1rem;
		box-sizing: border-box;
	}

	input:focus {
		outline: none;
		border-color: #667eea;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
	}

	input:disabled {
		background-color: #f5f5f5;
		cursor: not-allowed;
	}

	button {
		width: 100%;
		padding: 0.75rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.error {
		color: #e74c3c;
		background-color: #fadbd8;
		padding: 0.75rem;
		border-radius: 4px;
		margin-bottom: 1rem;
		border-left: 4px solid #e74c3c;
	}
</style>
