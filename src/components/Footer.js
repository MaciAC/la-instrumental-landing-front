import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobal } from '../contexts/GlobalContext';
import './Footer.css';

function Footer() {
  const { t } = useTranslation();
  const { globalSettings } = useGlobal();

  return (
    <footer className="footer">
      <div className="container">
        <p>
          {t('footer.copyright')} © {globalSettings?.siteName || 'Organization'}
        </p>
      </div>
    </footer>
  );
}

export default Footer;