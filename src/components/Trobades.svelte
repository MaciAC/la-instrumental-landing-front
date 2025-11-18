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

		<div class="trobades-list">
			{#each events as event, idx}
				<div class="trobada-item">
					<h4>{event.title}</h4>
					<div class="trobada-meta">
						<p>
							<strong>{$t('trobades.day_label')}:</strong> {event.day}
						</p>
						<p>
							<strong>{$t('trobades.hour_label')}:</strong> {event.hour}
						</p>
						<p>
							<strong>{$t('trobades.place_label')}:</strong> {event.place}
						</p>
					</div>
					{#if event.description}
						<p>{event.description}</p>
					{/if}
					{#if event.links && event.links.length}
						<div class="trobada-links">
							{#each event.links as link}
								<a href={link.url} class="trobada-link" target="_blank" rel="noopener noreferrer">
									{link.label}
								</a>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
