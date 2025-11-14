<script lang="ts">
	import { t, language } from '../stores/i18n';
	import i18nInstance from '../i18n/config';
	import { loadMarkdownContent } from '../lib/markdownLoader';
	import './Section.css';

	let htmlContent = '';
	let loading = true;
	let error = false;

	$: principles = i18nInstance.t('manifest.principles', { returnObjects: true }) as any[] || [];

	$: if ($language) {
		loading = true;
		error = false;
		loadMarkdownContent($language, 'manifest')
			.then((html) => {
				htmlContent = html;
				loading = false;
			})
			.catch((err) => {
				console.error('Failed to load manifest content:', err);
				error = true;
				loading = false;
			});
	}
</script>

<section id="manifest" class="content-section">
	<div class="container">
		<span style="display: none;">{$language}</span>
		<h2>{$t('manifest.section_title')}</h2>
		<h3>{$t('manifest.title')}</h3>
		<div class="rich-text">
			{#if loading}
				<p>{$t('manifest.loading')}</p>
			{:else if error}
				<p>{$t('manifest.error')}</p>
			{:else}
				<div class="markdown-content">
					{@html htmlContent}
				</div>
			{/if}
		</div>
		<div class="principles-list">
			{#each principles as _, idx}
				<div class="principle-item">
					<strong>{$t(`manifest.principles.${idx}.title`)}</strong>
					<p>{$t(`manifest.principles.${idx}.description`)}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
