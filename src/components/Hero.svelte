<script lang="ts">
	import { language } from '../stores/i18n';
	import i18nInstance from '../i18n/config';
	import './Hero.css';
	import { onMount } from 'svelte';
	
	let currentWordIndex = 0;
	let subtitle = '';
	let subtitleParts: (string | { text: string; bold: boolean })[] = [];
	let rotatingWords: string[] = [];
	
	function parseSubtitle(text: string) {
		const boldWords = ['imaginar', 'música'];
		const regex = new RegExp(`\\b(${boldWords.join('|')})\\b`, 'gi');
		
		const parts: (string | { text: string; bold: boolean })[] = [];
		let lastIndex = 0;
		let match;
		
		while ((match = regex.exec(text)) !== null) {
			if (match.index > lastIndex) {
				parts.push(text.slice(lastIndex, match.index));
			}
			parts.push({ text: match[0], bold: true });
			lastIndex = regex.lastIndex;
		}
		
		if (lastIndex < text.length) {
			parts.push(text.slice(lastIndex));
		}
		
		return parts;
	}
	
	function getTitleData() {
		const lng = i18nInstance.language || 'ca';
		const resources = i18nInstance.getResourceBundle(lng, 'translation');
		subtitle = resources?.hero?.subtitle || '';
		subtitleParts = parseSubtitle(subtitle);
		rotatingWords = resources?.hero?.rotatingWords || [];
	}
	
	onMount(() => {
		getTitleData();
		
		if (rotatingWords.length > 0) {
			const interval = setInterval(() => {
				currentWordIndex = (currentWordIndex + 1) % rotatingWords.length;
			}, 1500);
			
			return () => clearInterval(interval);
		}
	});
	
	$: $language, getTitleData();
</script>

<section class="hero">
	<div class="container">
		<div class="hero-logo-top mobile-only">
			<img src="/images/logo-blanc.png" alt="Logo" height="90" />
		</div>
		<div class="hero-subtitle">
			<p class="title-part">
				{#each subtitleParts as part}
					{#if typeof part === 'string'}
						{part}
					{:else if part.bold}
						<strong>{part.text}</strong>
					{/if}
				{/each}
				<br />
				<span class="rotating-word">{rotatingWords[currentWordIndex]}</span>
			</p>
		</div>
		<!-- <div class="hero-logo-bottom mobile-only">
			<img src="/images/logo-blanc.png" alt="Logo" height="70" />
		</div> -->
		<span style="display: none;">{$language}</span>
	</div>
</section>
