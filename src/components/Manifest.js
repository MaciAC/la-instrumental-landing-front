import React from 'react';
import { useTranslation } from 'react-i18next';
import './Section.css';

function Manifest() {
  const { t } = useTranslation();

  const manifest = {
    title: 'Manifest per a la música lliure i col·lectiva',
    content: 'En un context on la musica es cada vegada mes subordinada als interessos economics, volem propugnar un model alternatiu que posesi la dignitat i el compromis amb la professio musical.',
    principles: [
      {
        title: 'Llibertat',
        description: 'Defensar la llibertat creativa i la independència artística dels músics i musiciens.',
      },
      {
        title: 'Col·lectivitat',
        description: 'Fomentar la col·laboració i la solidaritat entre els professionals de la música.',
      },
      {
        title: 'Dignitat',
        description: 'Garantir condicions de treball justes i dignes per a tots els músics i musiciens.',
      },
    ],
  };

  return (
    <section id="manifest" className="content-section">
      <div className="container">
        <h2>{t('manifest.section_title')}</h2>
        {manifest.title && <h3>{manifest.title}</h3>}
        {manifest.content && (
          <div className="rich-text">
            {manifest.content.split('\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        )}
        {manifest.principles && manifest.principles.length > 0 && (
          <div className="principles-list">
            {manifest.principles.map((principle, idx) => (
              <div key={idx} className="principle-item">
                <strong>{principle.title}</strong>
                {principle.description && <p>{principle.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Manifest;