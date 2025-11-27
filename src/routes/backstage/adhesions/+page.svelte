<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getAdhesions } from '../../../api/apiClient';
	import type { PaginatedAdhesions } from '../../../api/apiClient';

	let credentials: string | null = null;
	let adhesions: PaginatedAdhesions | null = null;
	let currentPage = 1;
	let pageSize = 10;
	let loading = true;
	let error = '';
	let totalUniqueEmails = 0;
	let totalUniqueEmailsWithNewsletter = 0;
	let totalSubmissions = 0;

	onMount(async () => {
		const savedCredentials = localStorage.getItem('adminCredentials');
		if (!savedCredentials) {
			goto('/backstage');
			return;
		}

		credentials = savedCredentials;
		await fetchAdhesions();
	});

	async function fetchAdhesions() {
		if (!credentials) return;

		try {
			loading = true;
			error = '';
			adhesions = await getAdhesions(credentials, currentPage, pageSize);
			await calculateStats();
		} catch (err) {
			error = 'Failed to fetch adhesions. Please check your password.';
			if ((err as any).response?.status === 401) {
				localStorage.removeItem('adminCredentials');
				goto('/backstage');
			}
		} finally {
			loading = false;
		}
	}

	async function calculateStats() {
		if (!credentials) return;

		try {
			const allAdhesions = await getAdhesions(credentials, 1, 10000);
			const uniqueEmails = new Set<string>();
			const uniqueEmailsWithNewsletter = new Set<string>();

			allAdhesions.data.forEach((adhesion) => {
				uniqueEmails.add(adhesion.email);
				if (adhesion.newsletter) {
					uniqueEmailsWithNewsletter.add(adhesion.email);
				}
			});
			totalSubmissions = allAdhesions.data.length;
			totalUniqueEmails = uniqueEmails.size;
			totalUniqueEmailsWithNewsletter = uniqueEmailsWithNewsletter.size;
		} catch (err) {
			console.error('Failed to calculate stats:', err);
		}
	}

	function logout() {
		localStorage.removeItem('adminCredentials');
		goto('/backstage');
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

	async function downloadAllAdhesionsCSV() {
		if (!credentials) return;

		try {
			const allAdhesions = await getAdhesions(credentials, 1, 10000);
			const rows = [['ID', 'Name', 'Email', 'Comment', 'Newsletter', 'Submitted']];

			allAdhesions.data.forEach((adhesion) => {
				rows.push([
					adhesion.id.toString(),
					`"${adhesion.name.replace(/"/g, '""')}"`,
					`"${adhesion.email.replace(/"/g, '""')}"`,
					`"${(adhesion.comment || '').replace(/"/g, '""')}"`,
					adhesion.newsletter ? 'Yes' : 'No',
					`"${formatDate(adhesion.created_at)}"`,
				]);
			});

			const csv = rows.map((row) => row.join(',')).join('\n');
			const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
			const link = document.createElement('a');
			const url = URL.createObjectURL(blob);

			link.setAttribute('href', url);
			link.setAttribute('download', `adhesions-${new Date().toISOString().split('T')[0]}.csv`);
			link.style.visibility = 'hidden';

			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (err) {
			error = 'Failed to download adhesions.';
		}
	}
</script>

<div class="admin-page">
	<div class="admin-header">
		<h1>backstage - Adhesions</h1>
		<button class="logout-btn" on:click={logout}>Logout</button>
	</div>

	<main class="container admin-main">
		{#if error}
			<div class="form-error">{error}</div>
		{/if}

		{#if !loading && adhesions}
			<div class="actions-bar">
				<button class="download-btn" on:click={downloadAllAdhesionsCSV}>⬇️ .CSV</button>
			</div>

			<div class="stats-section">
				<div class="stat-card">
					<div class="stat-label">Total entregues</div>
					<div class="stat-value">{totalSubmissions}</div>
				</div>
				<div class="stat-card">
					<div class="stat-label">Total Emails únics</div>
					<div class="stat-value">{totalUniqueEmails}</div>
				</div>
				<div class="stat-card">
					<div class="stat-label">Total Emails únics newsletter ✅</div>
					<div class="stat-value">{totalUniqueEmailsWithNewsletter}</div>
				</div>
			</div>
		{/if}

		{#if loading}
			<p>Carregant adhesions...</p>
		{:else if adhesions && adhesions.data.length > 0}
			<div class="table-wrapper">
				<table>
					<thead>
						<tr>
							<th>Nom</th>
							<th>Email</th>
							<th>Comentari</th>
							<th>Newsletter?</th>
							<th>Dia i hora</th>
						</tr>
					</thead>
					<tbody>
						{#each adhesions.data as adhesion (adhesion.id)}
							<tr>
								<td>{adhesion.name}</td>
								<td>{adhesion.email}</td>
								<td class="comment">{adhesion.comment || '-'}</td>
								<td class="center">
									{#if adhesion.newsletter}
										<span>✅</span>
									{:else}
										<span>❌</span>
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
					>
						1a pag
					</button>

					<button
						disabled={currentPage === 1}
						on:click={() => goToPage(currentPage - 1)}
					>
						Anterior
					</button>

					<div class="page-info">
						Pàgina {adhesions.pagination.page} de {adhesions.pagination.totalPages}
					</div>

					<button
						disabled={currentPage === adhesions.pagination.totalPages}
						on:click={() => goToPage(currentPage + 1)}
					>
						Següent
					</button>

					<button
						disabled={!adhesions || currentPage === adhesions.pagination.totalPages}
						on:click={() => adhesions && goToPage(adhesions.pagination.totalPages)}
					>
						Última
					</button>
				</div>
			{/if}
		{:else}
			<p>No nhi ha</p>
		{/if}
	</main>
</div>

<style>
	.admin-page {
		min-height: 100vh;
		background-color: #ffffff;
	}

	.admin-header {
		border-bottom: 3px solid #1a1a1a;
		padding: 1.5rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #c3462f;
	}

	.admin-header h1 {
		margin: 0;
		border: none;
		padding: 0;
		color: #ffffff;
	}

	.logout-btn {
		background-color: #1a1a1a;
		color: #fafafa;
		border: 2px solid #1a1a1a;
		padding: 0.75rem 1.5rem;
		cursor: pointer;
		font-size: 0.9rem;
		text-transform: uppercase;
		font-weight: 700;
		letter-spacing: 0.08em;
	}

	.logout-btn:hover {
		background-color: #fafafa;
		color: #1a1a1a;
	}

	.logout-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.admin-main {
		padding: 2rem 1.5rem;
	}

	.actions-bar {
		margin-bottom: 2rem;
		display: flex;
		gap: 1rem;
	}

	.download-btn {
		background-color: #c3462f;
		color: #fafafa;
		border: 2px solid #c3462f;
		padding: 0.75rem 1.5rem;
		cursor: pointer;
		font-size: 0.9rem;
		text-transform: uppercase;
		font-weight: 700;
		letter-spacing: 0.08em;
	}

	.download-btn:hover {
		background-color: #a83621;
		border-color: #a83621;
	}

	.stats-section {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.stat-card {
		border: 2px solid #1a1a1a;
		padding: 0.5rem;
		background-color: #f5f5f5;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.stat-label {
		font-size: 0.85rem;
		text-transform: uppercase;
		font-weight: 700;
		letter-spacing: 0.05em;
		color: #1a1a1a;
		margin-bottom: 0.5rem;
		text-align: center;
	}

	.stat-value {
		font-size: 1.5rem;
		font-weight: 700;
		color: #c3462f;
	}

	.table-wrapper {
		border: 2px solid #1a1a1a;
		margin-bottom: 2rem;
		overflow-x: auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.95rem;
	}

	thead {
		background-color: #bfc0c6;
		border-bottom: 2px solid #1a1a1a;
	}

	th {
		padding: 1rem;
		text-align: left;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #1a1a1a;
		border-right: 1px solid #1a1a1a;
	}

	th:last-child {
		border-right: none;
	}

	td {
		padding: 0.75rem 1rem;
		border-bottom: 1px solid #ddd;
		border-right: 1px solid #ddd;
	}

	tbody tr:last-child td {
		border-bottom: none;
	}

	td:last-child {
		border-right: none;
	}

	tbody tr:nth-child(even) {
		background-color: #f5f5f5;
	}

	.comment {
		max-width: 200px;
		word-wrap: break-word;
		white-space: normal;
	}

	.center {
		text-align: center;
	}

	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		padding: 1.5rem;
		border: 2px solid #1a1a1a;
		flex-wrap: wrap;
	}

	.pagination button {
		padding: 0.75rem 1.5rem;
		background-color: #fafafa;
		color: #1a1a1a;
		border: 2px solid #1a1a1a;
		text-transform: uppercase;
		font-weight: 700;
		letter-spacing: 0.08em;
		font-size: 0.85rem;
	}

	.pagination button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.page-info {
		color: #1a1a1a;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		min-width: 250px;
		text-align: center;
	}

	@media (max-width: 768px) {
		.admin-header {
			flex-direction: column;
			gap: 1rem;
		}

		.admin-header h1 {
			font-size: 2rem;
		}

		.stats-section {
			grid-template-columns: 1fr;
		}

		.stat-value {
			font-size: 2rem;
		}

		table {
			font-size: 0.85rem;
		}

		th,
		td {
			padding: 0.5rem;
		}

		.comment {
			max-width: 100px;
		}

		.page-info {
			min-width: auto;
		}
	}
</style>
