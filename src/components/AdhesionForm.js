import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { submitAdhesion } from '../api/strapiClient';
import './AdhesionForm.css';

function AdhesionForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      setError(t('adhesion.required_fields'));
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await submitAdhesion(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(t('adhesion.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="adhesion" className="content-section">
      <div className="container">
        <h2>{t('adhesion.section_title')}</h2>
        <div className="form-wrapper">
          <form onSubmit={handleSubmit} className="adhesion-form">
            <h3 className="form-title">{t('adhesion.form_title')}</h3>

            {success && (
              <div className="form-success">
                {t('adhesion.success')}
              </div>
            )}

            {error && (
              <div className="form-error">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">{t('adhesion.name')} *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">{t('adhesion.email')} *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? t('adhesion.submitting') : t('adhesion.submit')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AdhesionForm;