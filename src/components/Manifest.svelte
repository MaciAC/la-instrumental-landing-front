<script lang="ts">
	import { t, language } from '../stores/i18n';
	import i18nInstance from '../i18n/config';
	import { loadManifestSections, type ManifestSection } from '../lib/markdownLoader';
	import './Section.css';
	import './Manifest.css';

	let sections: ManifestSection[] = [];
	let loading = true;
	let error = false;

	$: principles = i18nInstance.t('manifest.principles', { returnObjects: true }) as any[] || [];

	$: if ($language) {
		loading = true;
		error = false;
		loadManifestSections($language)
			.then((loadedSections) => {
				sections = loadedSections;
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
		<h2>{$t('manifest.section_title')}</h2>
		<!-- <h3>{$t('manifest.title')}</h3>s -->
		{#if loading}
			<div class="rich-text">
				<p>{$t('manifest.loading')}</p>
			</div>
		{:else if error}
			<div class="rich-text">
				<p>{$t('manifest.error')}</p>
			</div>
		{:else}
			{#each sections as section (section.index)}
				<div class="manifest-section manifest-section-{section.index}">
					<div class="rich-text">
						<div class="markdown-content">
							{@html section.html}
						</div>
					</div>
				</div>
			{/each}
		{/if}
		<!-- <div class="principles-list">
			{#each principles as _, idx}
				<div class="principle-item">
					<strong>{$t(`manifest.principles.${idx}.title`)}</strong>
					<p>{$t(`manifest.principles.${idx}.description`)}</p>
				</div>
			{/each}
		</div> -->
	</div>
</section>
