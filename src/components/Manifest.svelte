<script lang="ts">
	import { t, language } from '../stores/i18n';
	import i18nInstance from '../i18n/config';
	import './Section.css';

	$: principles = i18nInstance.t('manifest.principles', { returnObjects: true }) as any[] || [];
</script>

<section id="manifest" class="content-section">
	<div class="container">
		<span style="display: none;">{$language}</span>
		<h2>{$t('manifest.section_title')}</h2>
		<h3>{$t('manifest.title')}</h3>
		<div class="rich-text">
			<p>{$t('manifest.content')}</p>
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
