<script lang="ts">
	import { t, language } from '../stores/i18n';
	import './Hero.css';
</script>

<section class="hero">
	<div class="container">
		<h1 class="hero-title">{$t('hero.title')}</h1>
		<p class="hero-subtitle">{$t('hero.subtitle')}</p>
		<span style="display: none;">{$language}</span>
	</div>
</section>
