import React from 'react';
import { useTranslation } from 'react-i18next';
import './Roadmap.css';

function Roadmap() {
  const { t } = useTranslation();

  const roadmap = {
    title: 'Full de ruta',
    description: 'El nostre pla d\'accio per a la consolidacio del projecte:',
    milestones: [
      {
        title: 'Consolidació de la comunitat',
        date: 'Q1 2025',
        description: 'Construir una comunitat forta de músics i musiciens comprometits amb els principis del manifest.',
      },
      {
        title: 'Desenvolupament de recursos',
        date: 'Q2 2025',
        description: 'Crear recursos i oines per a facilitar la col·laboració i la compartició de coneixement.',
      },
      {
        title: 'Xarxa d\'aliances',
        date: 'Q3 2025',
        description: 'Establir aliances amb altres organitzacions i iniciatives aliniades amb els nostre values.',
      },
      {
        title: 'Sostenibilitat econòmica',
        date: 'Q4 2025',
        description: 'Desenvolupar models sostenibles per a finançar i mantenir el projecte a llarg termini.',
      },
    ],
  };

  return (
    <section id="roadmap" className="content-section">
      <div className="container">
        <h2>{t('roadmap.section_title')}</h2>
        {roadmap.title && <h3>{roadmap.title}</h3>}
        {roadmap.description && <p>{roadmap.description}</p>}
        
        {roadmap.milestones && roadmap.milestones.length > 0 && (
          <div className="timeline">
            {roadmap.milestones.map((milestone, idx) => (
              <div key={idx} className={`milestone ${idx % 2 === 0 ? 'milestone-left' : 'milestone-right'}`}>
                <div className="milestone-content">
                  <h4>{milestone.title}</h4>
                  {milestone.date && (
                    <p className="milestone-date">
                      {t('roadmap.milestone_at')}: {milestone.date}
                    </p>
                  )}
                  {milestone.description && <p>{milestone.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Roadmap;