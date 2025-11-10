<script lang="ts">
	import { submitAdhesion } from '../api/apiClient';
	import { t, language } from '../stores/i18n';
	import './AdhesionForm.css';

	let formData = {
		name: '',
		email: '',
	};
	let loading = false;
	let success = false;
	let error: string | null = null;

	const handleChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		const { name, value, type, checked } = target;
		formData[name as keyof typeof formData] = type === 'checkbox' ? checked : value;
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();

		if (!formData.name || !formData.email) {
			error = t('adhesion.required_fields');
			return;
		}

		try {
			loading = true;
			error = null;
			await submitAdhesion(formData);
			success = true;
			formData = {
				name: '',
				email: '',
			};
			setTimeout(() => {
				success = false;
			}, 5000);
		} catch (err) {
			error = t('adhesion.error');
		} finally {
			loading = false;
		}
	};
</script>

<section id="adhesion" class="content-section">
	<div class="container">
		<span style="display: none;">{$language}</span>
		<h2>{$t('adhesion.section_title')}</h2>
		<div class="form-wrapper">
			<form on:submit={handleSubmit} class="adhesion-form">
				<h3 class="form-title">{$t('adhesion.form_title')}</h3>

				{#if success}
					<div class="form-success">
						{$t('adhesion.success')}
					</div>
				{/if}

				{#if error}
					<div class="form-error">
						{error}
					</div>
				{/if}

				<div class="form-group">
					<label for="name">{$t('adhesion.name')} *</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						on:change={handleChange}
						on:input={handleChange}
						required
					/>
				</div>

				<div class="form-group">
					<label for="email">{$t('adhesion.email')} *</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						on:change={handleChange}
						on:input={handleChange}
						required
					/>
				</div>

				<button type="submit" disabled={loading}>
					{loading ? $t('adhesion.submitting') : $t('adhesion.submit')}
				</button>
			</form>
		</div>
	</div>
</section>
