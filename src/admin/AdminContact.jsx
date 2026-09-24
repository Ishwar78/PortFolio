import React, { useState, useEffect } from 'react';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSave,
  FiRotateCcw,
  FiCheckCircle,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiExternalLink,
} from 'react-icons/fi';
import { portfolioApi } from '../lib/api';
import './AdminContact.css';

export default function AdminContact() {
  const defaultContact = {
    email: 'ishwarweb@gmail.com',
    phone: '+91 98765 43210',
    location: 'Rohtak, Haryana, India',
    city: 'Rohtak, Haryana',
    country: 'India',
    response: 'Usually within 24 hours',
    availability: "Let's Build Something Amazing Together",
    intro:
      "I'm always open to discussing new projects, creative ideas, development opportunities, collaborations, or simply having a friendly conversation about technology.",
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/',
    twitter: 'https://twitter.com/',
    instagram: 'https://instagram.com/',
    youtube: 'https://youtube.com/',
  };

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('ishwar_contact_info');
    return saved ? JSON.parse(saved) : defaultContact;
  });

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  // Fetch from MongoDB on mount
  useEffect(() => {
    portfolioApi
      .getContent('contact')
      .then((res) => {
        if (res && res.data && res.data.email) {
          setData(res.data);
          localStorage.setItem('ishwar_contact_info', JSON.stringify(res.data));
        }
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      localStorage.setItem('ishwar_contact_info', JSON.stringify(data));
      await portfolioApi.saveContent('contact', data);
      setToast('Contact details saved successfully to MongoDB!');
    } catch (err) {
      setToast('Saved to local storage!');
    } finally {
      setSaving(false);
      setTimeout(() => setToast(''), 3500);
    }
  };

  const handleReset = () => {
    if (!window.confirm('Reset contact details to defaults?')) return;
    setData(defaultContact);
    localStorage.removeItem('ishwar_contact_info');
    setToast('Reset to defaults.');
    setTimeout(() => setToast(''), 2500);
  };

  return (
    <section className="contact-admin-page">
      <div className="admin-header-box">
        <div>
          <div className="header-eyebrow">
            <span></span>
            COMMUNICATION CHANNELS
          </div>
          <h1>
            Contact <span>Settings</span>
          </h1>
          <p>
            Manage public contact details, response expectations and social media profiles.
          </p>
        </div>

        <a
          href="/contact"
          target="_blank"
          rel="noreferrer"
          className="admin-btn admin-btn-secondary"
        >
          <span>Preview Contact Page</span>
          <FiExternalLink />
        </a>
      </div>

      {toast && (
        <div className="admin-alert success">
          <FiCheckCircle />
          <span>Contact details saved and updated successfully!</span>
        </div>
      )}

      <div className="contact-admin-layout">
        {/* FORM PANEL */}
        <div className="admin-card-box contact-form-card">
          <div className="panel-title">
            <FiMail className="panel-title-icon" />
            <h2>Direct Contact Information</h2>
          </div>

          <div className="two-col-inputs">
            <div className="admin-input-group">
              <label>
                <FiMail /> Primary Email Address
              </label>
              <input
                type="email"
                className="admin-input"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>

            <div className="admin-input-group">
              <label>
                <FiPhone /> Contact Phone Number
              </label>
              <input
                type="text"
                className="admin-input"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="two-col-inputs">
            <div className="admin-input-group">
              <label>
                <FiMapPin /> Physical Location
              </label>
              <input
                type="text"
                className="admin-input"
                value={data.location}
                onChange={(e) => setData({ ...data, location: e.target.value })}
              />
            </div>

            <div className="admin-input-group">
              <label>
                <FiClock /> Expected Response Time
              </label>
              <input
                type="text"
                className="admin-input"
                value={data.response}
                onChange={(e) => setData({ ...data, response: e.target.value })}
              />
            </div>
          </div>

          <div className="two-col-inputs">
            <div className="admin-input-group">
              <label>City & State (Map Display)</label>
              <input
                type="text"
                className="admin-input"
                value={data.city || 'Rohtak, Haryana'}
                onChange={(e) => setData({ ...data, city: e.target.value })}
              />
            </div>

            <div className="admin-input-group">
              <label>Country</label>
              <input
                type="text"
                className="admin-input"
                value={data.country || 'India'}
                onChange={(e) => setData({ ...data, country: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-input-group">
            <label>Availability Status Headline</label>
            <input
              type="text"
              className="admin-input"
              value={data.availability}
              onChange={(e) => setData({ ...data, availability: e.target.value })}
            />
          </div>

          <div className="panel-title" style={{ marginTop: '16px' }}>
            <FiGithub className="panel-title-icon" />
            <h2>Social & Developer Links</h2>
          </div>

          <div className="two-col-inputs">
            <div className="admin-input-group">
              <label>
                <FiGithub /> GitHub Profile URL
              </label>
              <input
                type="url"
                className="admin-input"
                value={data.github}
                onChange={(e) => setData({ ...data, github: e.target.value })}
              />
            </div>

            <div className="admin-input-group">
              <label>
                <FiLinkedin /> LinkedIn Profile URL
              </label>
              <input
                type="url"
                className="admin-input"
                value={data.linkedin}
                onChange={(e) => setData({ ...data, linkedin: e.target.value })}
              />
            </div>
          </div>

          <div className="two-col-inputs">
            <div className="admin-input-group">
              <label>
                <FiTwitter /> Twitter / X Profile
              </label>
              <input
                type="url"
                className="admin-input"
                value={data.twitter}
                onChange={(e) => setData({ ...data, twitter: e.target.value })}
              />
            </div>

            <div className="admin-input-group">
              <label>
                <FiInstagram /> Instagram Profile
              </label>
              <input
                type="url"
                className="admin-input"
                value={data.instagram}
                onChange={(e) => setData({ ...data, instagram: e.target.value })}
              />
            </div>
          </div>

          <div className="form-action-row">
            <button
              type="button"
              className="admin-btn admin-btn-primary"
              onClick={handleSave}
              disabled={saving}
            >
              <FiSave />
              {saving ? 'Saving...' : 'Save Contact Details'}
            </button>

            <button
              type="button"
              className="admin-btn admin-btn-secondary"
              onClick={handleReset}
            >
              <FiRotateCcw />
              Reset
            </button>
          </div>
        </div>

        {/* PREVIEW CARD */}
        <div className="contact-preview-column">
          <div className="preview-header">
            <div className="preview-label">
              <span className="live-dot" />
              LIVE CONTACT CARD
            </div>
          </div>

          <div className="admin-card-box contact-preview-box">
            <div className="contact-card-badge">LET'S CONNECT</div>
            <h3 className="contact-card-headline">Get In Touch</h3>
            <p className="contact-card-sub">{data.availability}</p>

            <div className="contact-items-stack">
              <div className="contact-detail-row">
                <div className="detail-icon-wrap">
                  <FiMail />
                </div>
                <div>
                  <small>Email Address</small>
                  <strong>{data.email}</strong>
                </div>
              </div>

              <div className="contact-detail-row">
                <div className="detail-icon-wrap">
                  <FiPhone />
                </div>
                <div>
                  <small>Phone</small>
                  <strong>{data.phone}</strong>
                </div>
              </div>

              <div className="contact-detail-row">
                <div className="detail-icon-wrap">
                  <FiMapPin />
                </div>
                <div>
                  <small>Location</small>
                  <strong>{data.location}</strong>
                </div>
              </div>

              <div className="contact-detail-row">
                <div className="detail-icon-wrap">
                  <FiClock />
                </div>
                <div>
                  <small>Response Time</small>
                  <strong>{data.response}</strong>
                </div>
              </div>
            </div>

            <div className="contact-social-row">
              {data.github && (
                <a href={data.github} target="_blank" rel="noreferrer" className="social-pill">
                  <FiGithub /> GitHub
                </a>
              )}
              {data.linkedin && (
                <a href={data.linkedin} target="_blank" rel="noreferrer" className="social-pill">
                  <FiLinkedin /> LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
