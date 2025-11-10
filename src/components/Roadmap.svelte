<script lang="ts">
	import { t, language } from '../stores/i18n';
	import './Roadmap.css';
</script>

<section id="roadmap" class="content-section">
	<div class="container">
		<span style="display: none;">{$language}</span>
		<h2>{$t('roadmap.section_title')}</h2>
		<h3>{$t('roadmap.title')}</h3>
		<p>{$t('roadmap.description')}</p>

		<div class="timeline">
			{#each Array(4) as _, idx}
				<div class={`milestone ${idx % 2 === 0 ? 'milestone-left' : 'milestone-right'}`}>
					<div class="milestone-content">
						<h4>{$t(`roadmap.milestones.${idx}.title`)}</h4>
						<p class="milestone-date">
							{$t('roadmap.milestone_at')}: {$t(`roadmap.milestones.${idx}.date`)}
						</p>
						<p>{$t(`roadmap.milestones.${idx}.description`)}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
