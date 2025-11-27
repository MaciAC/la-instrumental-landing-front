<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getAdhesions } from '../../../api/apiClient';
	import type { PaginatedAdhesions } from '../../../api/apiClient';

	let token: string | null = null;
	let adhesions: PaginatedAdhesions | null = null;
	let currentPage = 1;
	let pageSize = 10;
	let loading = true;
	let error = '';

	onMount(async () => {
		const savedToken = localStorage.getItem('adminToken');
		if (!savedToken) {
			goto('/admin');
			return;
		}

		token = savedToken;
		await fetchAdhesions();
	});

	async function fetchAdhesions() {
		if (!token) return;

		try {
			loading = true;
			error = '';
			adhesions = await getAdhesions(token, currentPage, pageSize);
		} catch (err) {
			error = 'Failed to fetch adhesions. Please check your token.';
			if ((err as any).response?.status === 401) {
				localStorage.removeItem('adminToken');
				goto('/admin');
			}
		} finally {
			loading = false;
		}
	}

	function logout() {
		localStorage.removeItem('adminToken');
		goto('/admin');
	}

	function goToPage(page: number) {
		currentPage = page;
		fetchAdhesions();
	}

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	}
</script>

<div class="admin-page">
	<header class="admin-header">
		<h1>Adhesions Management</h1>
		<button class="logout-btn" on:click={logout}>Logout</button>
	</header>

	<main class="admin-main">
		{#if error}
			<div class="error-message">{error}</div>
		{/if}

		{#if loading}
			<div class="loading">Loading adhesions...</div>
		{:else if adhesions && adhesions.data.length > 0}
			<div class="table-container">
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Email</th>
							<th>Comment</th>
							<th>Newsletter</th>
							<th>Submitted</th>
						</tr>
					</thead>
					<tbody>
						{#each adhesions.data as adhesion (adhesion.id)}
							<tr>
								<td>{adhesion.id}</td>
								<td>{adhesion.name}</td>
								<td>{adhesion.email}</td>
								<td class="comment">{adhesion.comment || '-'}</td>
								<td class="center">
									{#if adhesion.newsletter}
										<span class="badge yes">Yes</span>
									{:else}
										<span class="badge no">No</span>
									{/if}
								</td>
								<td>{formatDate(adhesion.created_at)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			{#if adhesions.pagination.totalPages > 1}
				<div class="pagination">
					<button
						disabled={currentPage === 1}
						on:click={() => goToPage(1)}
						class="pagination-btn"
					>
						First
					</button>

					<button
						disabled={currentPage === 1}
						on:click={() => goToPage(currentPage - 1)}
						class="pagination-btn"
					>
						Previous
					</button>

					<div class="page-info">
						Page {adhesions.pagination.page} of {adhesions.pagination.totalPages}
						({adhesions.pagination.total} total)
					</div>

					<button
						disabled={currentPage === adhesions.pagination.totalPages}
						on:click={() => goToPage(currentPage + 1)}
						class="pagination-btn"
					>
						Next
					</button>

					<button
						disabled={!adhesions || currentPage === adhesions.pagination.totalPages}
						on:click={() => adhesions && goToPage(adhesions.pagination.totalPages)}
						class="pagination-btn"
					>
						Last
					</button>
				</div>
			{/if}
		{:else}
			<div class="no-data">No adhesions found</div>
		{/if}
	</main>
</div>

<style>
	.admin-page {
		min-height: 100vh;
		background-color: #f5f5f5;
	}

	.admin-header {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		padding: 1.5rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.admin-header h1 {
		margin: 0;
		font-size: 1.8rem;
	}

	.logout-btn {
		background: rgba(255, 255, 255, 0.2);
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.4);
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
		transition: background-color 0.2s;
	}

	.logout-btn:hover {
		background: rgba(255, 255, 255, 0.3);
	}

	.admin-main {
		padding: 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.error-message {
		color: #e74c3c;
		background-color: #fadbd8;
		padding: 1rem;
		border-radius: 4px;
		margin-bottom: 1rem;
		border-left: 4px solid #e74c3c;
	}

	.loading {
		text-align: center;
		padding: 2rem;
		font-size: 1.1rem;
		color: #666;
	}

	.no-data {
		text-align: center;
		padding: 2rem;
		font-size: 1.1rem;
		color: #999;
	}

	.table-container {
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		margin-bottom: 2rem;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9rem;
	}

	thead {
		background-color: #f8f9fa;
		border-bottom: 2px solid #dee2e6;
	}

	th {
		padding: 1rem;
		text-align: left;
		font-weight: 600;
		color: #333;
	}

	td {
		padding: 0.75rem 1rem;
		border-bottom: 1px solid #dee2e6;
	}

	tbody tr:hover {
		background-color: #f8f9fa;
	}

	.comment {
		max-width: 200px;
		word-wrap: break-word;
		white-space: normal;
	}

	.center {
		text-align: center;
	}

	.badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.85rem;
		font-weight: 600;
	}

	.badge.yes {
		background-color: #d4edda;
		color: #155724;
	}

	.badge.no {
		background-color: #f8d7da;
		color: #721c24;
	}

	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.pagination-btn {
		padding: 0.5rem 1rem;
		background-color: #667eea;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-weight: 500;
		transition: background-color 0.2s;
	}

	.pagination-btn:hover:not(:disabled) {
		background-color: #764ba2;
	}

	.pagination-btn:disabled {
		background-color: #ccc;
		cursor: not-allowed;
		opacity: 0.6;
	}

	.page-info {
		color: #666;
		font-weight: 500;
		min-width: 200px;
		text-align: center;
	}

	@media (max-width: 768px) {
		.admin-header {
			flex-direction: column;
			gap: 1rem;
		}

		.pagination {
			flex-wrap: wrap;
		}

		table {
			font-size: 0.8rem;
		}

		th,
		td {
			padding: 0.5rem;
		}

		.comment {
			max-width: 100px;
		}
	}
</style>
