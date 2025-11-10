<script lang="ts">
	import { t, language } from '../stores/i18n';
	import './Footer.css';

	const siteName = 'La instrumental';
</script>

<footer class="footer">
	<div class="container">
		<span style="display: none;">{$language}</span>
		<p>
			{$t('footer.copyright')} © {siteName}
		</p>
	</div>
</footer>
