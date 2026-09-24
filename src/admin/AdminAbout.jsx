import React, { useState } from 'react';
import {
  FiSave,
  FiRotateCcw,
  FiUser,
  FiMapPin,
  FiBookOpen,
  FiMail,
  FiCheckCircle,
  FiEye,
  FiExternalLink,
  FiAward,
} from 'react-icons/fi';
import './AdminAbout.css';

export default function AdminAbout() {
  const defaultAbout = {
    heading: 'Get To Know Me Better',
    subheading: 'Passionate Developer & Problem Solver',
    bio: 'I am Ishwar Sharma, a Full Stack Developer based in Rohtak, Haryana. With a solid foundation in MCA from MDU Rohtak, I specialize in architecting modern web applications using React, Node.js, Java, Spring Boot and modern cloud technologies. I am committed to writing clean, maintainable code and building seamless user experiences.',
    location: 'Rohtak, Haryana, India',
    education: 'MCA – Maharshi Dayanand University, Rohtak',
    email: 'ishwarweb@gmail.com',
    experienceYears: '3+ Years Experience',
    availability: 'Open for Full-time & Contract Work',
  };

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('ishwar_about_content');
    return saved ? JSON.parse(saved) : defaultAbout;
  });

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(false);

  const handleSave = () => {
    setSaving(true);
    localStorage.setItem('ishwar_about_content', JSON.stringify(data));
    setTimeout(() => {
      setSaving(false);
      setToast(true);
      setTimeout(() => setToast(false), 3500);
    }, 400);
  };

  const handleReset = () => {
    setData(defaultAbout);
    localStorage.removeItem('ishwar_about_content');
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  return (
    <section className="about-admin-page">
      <div className="admin-header-box">
        <div>
          <div className="header-eyebrow">
            <span></span>
            ABOUT MANAGEMENT
          </div>
          <h1>
            Profile & <span>Biography</span>
          </h1>
          <p>
            Update your personal bio, educational credentials, location, and professional highlights.
          </p>
        </div>

        <a
          href="/about"
          target="_blank"
          rel="noreferrer"
          className="admin-btn admin-btn-secondary"
        >
          <FiEye />
          Preview About Page
          <FiExternalLink />
        </a>
      </div>

      {toast && (
        <div className="admin-alert success">
          <FiCheckCircle />
          <span>About section details updated successfully!</span>
        </div>
      )}

      <div className="about-admin-grid">
        {/* FORM CONTROLS */}
        <div className="admin-card-box about-form-panel">
          <div className="panel-title">
            <FiUser className="panel-title-icon" />
            <h2>Edit Biography & Details</h2>
          </div>

          <div className="admin-input-group">
            <label>Section Heading</label>
            <input
              type="text"
              className="admin-input"
              value={data.heading}
              onChange={(e) => setData({ ...data, heading: e.target.value })}
            />
          </div>

          <div className="admin-input-group">
            <label>Tagline / Subheading</label>
            <input
              type="text"
              className="admin-input"
              value={data.subheading}
              onChange={(e) => setData({ ...data, subheading: e.target.value })}
            />
          </div>

          <div className="admin-input-group">
            <label>Personal Story / Biography</label>
            <textarea
              className="admin-textarea"
              style={{ minHeight: '140px' }}
              value={data.bio}
              onChange={(e) => setData({ ...data, bio: e.target.value })}
            />
          </div>

          <div className="two-col-inputs">
            <div className="admin-input-group">
              <label>
                <FiMapPin /> Location
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
                <FiBookOpen /> Education
              </label>
              <input
                type="text"
                className="admin-input"
                value={data.education}
                onChange={(e) => setData({ ...data, education: e.target.value })}
              />
            </div>
          </div>

          <div className="two-col-inputs">
            <div className="admin-input-group">
              <label>
                <FiMail /> Contact Email
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
                <FiAward /> Availability Status
              </label>
              <input
                type="text"
                className="admin-input"
                value={data.availability}
                onChange={(e) => setData({ ...data, availability: e.target.value })}
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
              {saving ? 'Saving...' : 'Save About Details'}
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

        {/* PREVIEW PANEL */}
        <div className="about-preview-column">
          <div className="preview-header">
            <div className="preview-label">
              <span className="live-dot" />
              LIVE PROFILE CARD PREVIEW
            </div>
          </div>

          <div className="admin-card-box about-preview-card">
            <div className="about-preview-top">
              <div className="about-avatar-preview">IS</div>
              <div>
                <h3 className="about-name-title">Ishwar Sharma</h3>
                <span className="about-role-sub">{data.subheading}</span>
              </div>
            </div>

            <h2 className="preview-about-head">{data.heading}</h2>
            <p className="preview-about-bio">{data.bio}</p>

            <div className="preview-meta-list">
              <div className="meta-pill">
                <FiMapPin className="pill-icon" />
                <span>{data.location}</span>
              </div>
              <div className="meta-pill">
                <FiBookOpen className="pill-icon" />
                <span>{data.education}</span>
              </div>
              <div className="meta-pill">
                <FiMail className="pill-icon" />
                <span>{data.email}</span>
              </div>
              <div className="meta-pill highlight">
                <FiAward className="pill-icon" />
                <span>{data.availability}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
