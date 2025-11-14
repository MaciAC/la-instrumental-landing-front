<script lang="ts">
	import { onMount } from 'svelte';
	import { language, changeLanguage, t } from '../stores/i18n';
	import './Header.css';

	let isMenuOpen = false;
	let isScrolled = false;

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 50;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};

	const closeMenu = () => {
		isMenuOpen = false;
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const siteName = 'La instrumental';
</script>

<header class={`header ${isScrolled ? 'scrolled' : ''}`}>
	<div class="container">
		<div class="header-content">
			<button class="site-title-btn" on:click={scrollToTop} aria-label="Scroll to top">
				<h1 class="site-title">
					{siteName}
				</h1>
			</button>

			<div class="header-desktop">
				<nav class="nav">
					<a href="#manifest">{$t('nav.manifest')}</a>
					<!-- <a href="#roadmap">{$t('nav.roadmap')}</a> -->
					<a href="#manifest-adhesion">{$t('nav.adhesion')}</a>
				</nav>
				<div class="lang-selector">
					<button
						class={`lang-option ${$language === 'ca' ? 'active' : ''}`}
						on:click={() => changeLanguage('ca')}
					>
						CA
					</button>
					<span class="lang-separator">|</span>
					<button
						class={`lang-option ${$language === 'es' ? 'active' : ''}`}
						on:click={() => changeLanguage('es')}
					>
						ES
					</button>
				</div>
			</div>

			<button
				class="hamburger"
				on:click={toggleMenu}
				aria-label="Toggle menu"
			>
				{#if isMenuOpen}
					<span>✕</span>
				{:else}
					<span>☰</span>
				{/if}
			</button>
		</div>
	</div>

	{#if isMenuOpen}
		<nav class="mobile-menu">
			<a href="#manifest" on:click={closeMenu}>{$t('nav.manifest')}</a>
			<!-- <a href="#roadmap" on:click={closeMenu}>{$t('nav.roadmap')}</a> -->
			<a href="#manifest-adhesion" on:click={closeMenu}>{$t('nav.adhesion')}</a>
			<div class="mobile-lang-selector">
				<button
					class={`lang-option ${$language === 'ca' ? 'active' : ''}`}
					on:click={() => {
						changeLanguage('ca');
						closeMenu();
					}}
				>
					CA
				</button>
				<span class="lang-separator">|</span>
				<button
					class={`lang-option ${$language === 'es' ? 'active' : ''}`}
					on:click={() => {
						changeLanguage('es');
						closeMenu();
					}}
				>
					ES
				</button>
			</div>
		</nav>
	{/if}
</header>
