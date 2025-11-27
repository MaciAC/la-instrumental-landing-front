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
		<h1>Admin Access</h1>
		<form on:submit={handleLogin} class="form-wrapper">
			<div class="form-group">
				<label for="password">Password</label>
				<input
					id="password"
					type="password"
					bind:value={password}
					placeholder="Enter admin password"
					disabled={loading}
				/>
			</div>
			{#if error}
				<div class="form-error">{error}</div>
			{/if}
			<button type="submit" disabled={loading}>
				{loading ? 'Authenticating...' : 'Login'}
			</button>
		</form>
	</div>
</div>
