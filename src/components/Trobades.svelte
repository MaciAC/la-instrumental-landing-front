<script lang="ts">
	import { t, language } from '../stores/i18n';
	import i18nInstance from '../i18n/config';
	import './Section.css';

	$: events = (i18nInstance.t('trobades.events', { returnObjects: true }) as any[]) || [];
</script>

<section id="trobades" class="content-section">
	<div class="container">
		<span style="display: none;">{$language}</span>
		<h2>{$t('trobades.section_title')}</h2>
		<!-- <h3>{$t('trobades.title')}</h3> -->
		<!-- <p class="rich-text">{$t('trobades.description')}</p> -->

		<div class="trobades-list">
			{#each events as _, idx}
				<div class="trobada-item">
					<h4>{$t(`trobades.events.${idx}.title`)}</h4>
					<div class="trobada-meta">
						<p>
							<strong>{$t(`trobades.day_label`)}:</strong> {$t(`trobades.events.${idx}.day`)}
						</p>
						<p>
							<strong>{$t(`trobades.hour_label`)}:</strong> {$t(`trobades.events.${idx}.hour`)}
						</p>
						<p>
							<strong>{$t(`trobades.place_label`)}:</strong> {$t(`trobades.events.${idx}.place`)}
						</p>
					</div>
					{#if $t(`trobades.events.${idx}.description`)}
						<p>{$t(`trobades.events.${idx}.description`)}</p>
					{/if}
					{#if $t(`trobades.events.${idx}.links`) }
						<div class="trobada-links">
							{#each $t(`trobades.events.${idx}.links`) as _, jdx}
								<a href={$t(`trobades.events.${idx}.links.${jdx}.url`)} class="trobada-link" target="_blank" rel="noopener noreferrer">
									{$t(`trobades.events.${idx}.links.${jdx}.label`)}
								</a>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
