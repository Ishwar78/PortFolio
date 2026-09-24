import React, { useState } from 'react';
import {
  FiSave,
  FiRotateCcw,
  FiExternalLink,
  FiCheckCircle,
  FiEdit,
  FiEye,
  FiZap,
} from 'react-icons/fi';
import './AdminHome.css';

export default function AdminHome() {
  const defaultData = {
    eyebrow: 'FULL STACK DEVELOPER',
    title: "Hi, I'm Ishwar Sharma",
    subtitle: 'I build modern web applications that solve real-world problems.',
    description:
      'Passionate about creating scalable, user-friendly and high-performance solutions using React, Node.js, Java and Spring Boot.',
    experience: '3+',
    projects: '10+',
    primaryBtn: "Let's Connect",
    secondaryBtn: 'View Projects',
  };

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('ishwar_home_content');
    return saved ? JSON.parse(saved) : defaultData;
  });

  const [savedToast, setSavedToast] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    localStorage.setItem('ishwar_home_content', JSON.stringify(data));
    setTimeout(() => {
      setSaving(false);
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3500);
    }, 400);
  };

  const handleReset = () => {
    setData(defaultData);
    localStorage.removeItem('ishwar_home_content');
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <section className="home-admin-page">
      <div className="admin-header-box">
        <div>
          <div className="header-eyebrow">
            <span></span>
            HOMEPAGE MANAGEMENT
          </div>
          <h1>
            Hero & <span>Landing Presentation</span>
          </h1>
          <p>
            Customize your headline, bio, experience counters and primary CTA buttons.
          </p>
        </div>

        <div className="header-actions">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="admin-btn admin-btn-secondary"
          >
            <FiEye />
            Live Preview
            <FiExternalLink />
          </a>
        </div>
      </div>

      {savedToast && (
        <div className="admin-alert success">
          <FiCheckCircle />
          <span>Home page content saved successfully and synchronized!</span>
        </div>
      )}

      <div className="home-admin-layout">
        {/* FORM CONTROLS */}
        <div className="admin-card-box home-form-panel">
          <div className="panel-title">
            <FiEdit className="panel-title-icon" />
            <h2>Hero Content Editor</h2>
          </div>

          <div className="admin-input-group">
            <label>Badge / Eyebrow Text</label>
            <input
              type="text"
              className="admin-input"
              value={data.eyebrow}
              onChange={(e) => setData({ ...data, eyebrow: e.target.value })}
              placeholder="e.g. FULL STACK DEVELOPER"
            />
          </div>

          <div className="admin-input-group">
            <label>Main Headline</label>
            <input
              type="text"
              className="admin-input"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="e.g. Hi, I'm Ishwar Sharma"
            />
          </div>

          <div className="admin-input-group">
            <label>Subtitle / One-Liner</label>
            <textarea
              className="admin-textarea"
              style={{ minHeight: '80px' }}
              value={data.subtitle}
              onChange={(e) => setData({ ...data, subtitle: e.target.value })}
              placeholder="Brief introduction..."
            />
          </div>

          <div className="admin-input-group">
            <label>Detailed Bio / Paragraph</label>
            <textarea
              className="admin-textarea"
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              placeholder="More detail about your technologies and background..."
            />
          </div>

          <div className="two-col-inputs">
            <div className="admin-input-group">
              <label>Experience Counter</label>
              <input
                type="text"
                className="admin-input"
                value={data.experience}
                onChange={(e) => setData({ ...data, experience: e.target.value })}
                placeholder="e.g. 3+"
              />
            </div>

            <div className="admin-input-group">
              <label>Projects Counter</label>
              <input
                type="text"
                className="admin-input"
                value={data.projects}
                onChange={(e) => setData({ ...data, projects: e.target.value })}
                placeholder="e.g. 10+"
              />
            </div>
          </div>

          <div className="two-col-inputs">
            <div className="admin-input-group">
              <label>Primary Button Text</label>
              <input
                type="text"
                className="admin-input"
                value={data.primaryBtn}
                onChange={(e) => setData({ ...data, primaryBtn: e.target.value })}
              />
            </div>

            <div className="admin-input-group">
              <label>Secondary Button Text</label>
              <input
                type="text"
                className="admin-input"
                value={data.secondaryBtn}
                onChange={(e) => setData({ ...data, secondaryBtn: e.target.value })}
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
              {saving ? 'Saving...' : 'Save Home Content'}
            </button>

            <button
              type="button"
              className="admin-btn admin-btn-secondary"
              onClick={handleReset}
            >
              <FiRotateCcw />
              Reset Default
            </button>
          </div>
        </div>

        {/* LIVE SIMULATED PREVIEW */}
        <div className="home-preview-wrapper">
          <div className="preview-header">
            <div className="preview-label">
              <span className="live-dot" />
              LIVE COMPONENT PREVIEW
            </div>
            <span className="preview-sub">Matches Public Portfolio</span>
          </div>

          <div className="admin-card-box hero-preview-card">
            <div className="preview-badge">
              <FiZap />
              <span>{data.eyebrow}</span>
            </div>

            <h1 className="preview-hero-title">{data.title}</h1>
            <h3 className="preview-hero-subtitle">{data.subtitle}</h3>
            <p className="preview-hero-desc">{data.description}</p>

            <div className="preview-button-row">
              <button className="preview-btn-main">{data.primaryBtn}</button>
              <button className="preview-btn-outline">{data.secondaryBtn}</button>
            </div>

            <div className="preview-stats-bar">
              <div className="preview-stat-item">
                <strong>{data.experience}</strong>
                <span>Years Exp.</span>
              </div>
              <div className="stat-separator"></div>
              <div className="preview-stat-item">
                <strong>{data.projects}</strong>
                <span>Completed Projects</span>
              </div>
              <div className="stat-separator"></div>
              <div className="preview-stat-item">
                <strong>100%</strong>
                <span>Dedicated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
