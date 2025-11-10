import { writable, derived } from 'svelte/store';
import i18nInstance from '../i18n/config';

export const language = writable(i18nInstance.language || 'ca');

i18nInstance.on('languageChanged', (lng: string) => {
	language.set(lng);
});

export const changeLanguage = (lng: string) => {
	i18nInstance.changeLanguage(lng);
};

export const t = derived(language, () => (key: string) => {
	return i18nInstance.t(key);
});
