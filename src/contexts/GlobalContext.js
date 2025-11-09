import React, { createContext, useContext, useEffect } from 'react';

const GlobalContext = createContext(null);

const DEFAULT_GLOBAL_SETTINGS = {
  siteName: 'La instrumental',
  siteDescription: 'Per imaginar futurs més lliures i col·lectius per la música',
};

export function GlobalProvider({ children }) {

  useEffect(() => {
    document.title = DEFAULT_GLOBAL_SETTINGS.siteName;
    
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', DEFAULT_GLOBAL_SETTINGS.siteDescription);
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ globalSettings: DEFAULT_GLOBAL_SETTINGS, loading: false, error: null }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within GlobalProvider');
  }
  return context;
}