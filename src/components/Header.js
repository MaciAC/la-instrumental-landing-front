import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobal } from '../contexts/GlobalContext';
import { FiMenu, FiX } from 'react-icons/fi';
import './Header.css';

function Header() {
  const { t, i18n } = useTranslation();
  const { globalSettings } = useGlobal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <h1 className="site-title" onClick={scrollToTop}>
            {globalSettings?.siteName || 'Organization'}
          </h1>

          {/* Desktop Navigation and Language Selector */}
          <div className="header-desktop">
            <nav className="nav">
              <a href="#manifest">{t('nav.manifest')}</a>
              <a href="#roadmap">{t('nav.roadmap')}</a>
              <a href="#adhesion">{t('nav.adhesion')}</a>
            </nav>
            <div className="lang-selector">
              <button
                className={`lang-option ${i18n.language === 'ca' ? 'active' : ''}`}
                onClick={() => changeLanguage('ca')}
              >
                CA
              </button>
              <span className="lang-separator">|</span>
              <button
                className={`lang-option ${i18n.language === 'es' ? 'active' : ''}`}
                onClick={() => changeLanguage('es')}
              >
                ES
              </button>
            </div>
          </div>

          {/* Mobile Hamburger Menu */}
          <button 
            className="hamburger"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="mobile-menu">
            <a href="#manifest" onClick={closeMenu}>{t('nav.manifest')}</a>
            <a href="#roadmap" onClick={closeMenu}>{t('nav.roadmap')}</a>
            <a href="#adhesion" onClick={closeMenu}>{t('nav.adhesion')}</a>
            <div className="mobile-lang-selector">
              <button
                className={`lang-option ${i18n.language === 'ca' ? 'active' : ''}`}
                onClick={() => {
                  changeLanguage('ca');
                  closeMenu();
                }}
              >
                CA
              </button>
              <span className="lang-separator">|</span>
              <button
                className={`lang-option ${i18n.language === 'es' ? 'active' : ''}`}
                onClick={() => {
                  changeLanguage('es');
                  closeMenu();
                }}
              >
                ES
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;