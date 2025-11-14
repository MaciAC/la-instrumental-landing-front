import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ca from './locales/ca.json';
import es from './locales/es.json';

i18n
  .use(LanguageDetector)
  .init({
    resources: {
      ca: { translation: ca },
      es: { translation: es },
    },
    fallbackLng: 'ca',
    supportedLngs: ['ca', 'es'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;