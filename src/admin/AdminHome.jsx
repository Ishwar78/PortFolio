import React, { useState, useEffect, useRef } from 'react';
import {
  FiSave,
  FiRotateCcw,
  FiEye,
  FiExternalLink,
  FiCheckCircle,
  FiImage,
  FiUploadCloud,
  FiTrash2,
  FiLayers,
  FiUser,
  FiZap,
  FiLink,
  FiPlus,
  FiGlobe,
} from 'react-icons/fi';
import { portfolioApi } from '../lib/api';
import './AdminHome.css';

const defaultHomeData = {
  hero: {
    eyebrow: 'FULL STACK DEVELOPER',
    smallTitle: "HELLO, I'M",
    titleLine1: 'Ishwar',
    titleLine2: 'Sharma.',
    roleHeadline: 'I build modern web applications that solve real-world problems.',
    roleHighlight: 'real-world problems.',
    description:
      'Full Stack Developer focused on creating scalable, responsive and high-performance digital experiences using React, Java, Spring Boot, Node.js and modern web technologies.',
    primaryBtnText: 'View My Work',
    primaryBtnLink: '/projects',
    secondaryBtnText: "Let's Talk",
    secondaryBtnLink: '/contact',
    resumeText: 'Resume',
    resumeLink: '/resume.pdf',
    githubUrl: 'https://github.com/',
    linkedinUrl: 'https://linkedin.com/',
    twitterUrl: 'https://twitter.com/',
    email: 'ishwarweb@gmail.com',
    noteText: 'Always learning. Always building.',
    image: '/assets/ishwar-profile.jpg',
    stat1Number: '2+',
    stat1Label: 'Years Experience',
    stat2Number: '10+',
    stat2Label: 'Projects Built',
    stat3Number: '100%',
    stat3Label: 'Commitment',
  },
  homeAbout: {
    eyebrow: 'ABOUT ME',
    headingMain: 'Turning Ideas Into',
    headingHighlight: 'Real-World Solutions.',
    description:
      "I'm a Full Stack Developer with a strong foundation in Java, Spring Boot, React and modern web technologies. I enjoy building complete web applications — from intuitive user interfaces to robust backend systems — while continuously improving my development approach.",
    location: 'Rohtak, Haryana',
    education: 'MCA – MDU Rohtak',
    email: 'ishwarweb@gmail.com',
    btnText: 'More About Me',
    btnLink: '/about',
    image: '/assets/ishwar-profile.jpg',
    badgeTop: 'DEVELOPER',
    badgeNumber: '01',
    captions: 'BUILD, LEARN, GROW',
  },
};

export default function AdminHome() {
  const [activeTab, setActiveTab] = useState('hero'); // 'hero' or 'about'
  const [data, setData] = useState(() => {
    const cached = localStorage.getItem('ishwar_home_content');
    return cached ? JSON.parse(cached) : defaultHomeData;
  });

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const heroFileInputRef = useRef(null);
  const aboutFileInputRef = useRef(null);

  // Load from MongoDB on component mount
  useEffect(() => {
    portfolioApi
      .getContent('home')
      .then((res) => {
        if (res && res.data && res.data.hero) {
          setData(res.data);
          localStorage.setItem('ishwar_home_content', JSON.stringify(res.data));
        }
      })
      .catch(() => {});
  }, []);

  // Save to MongoDB & localStorage
  const handleSave = async () => {
    setSaving(true);
    try {
      localStorage.setItem('ishwar_home_content', JSON.stringify(data));
      await portfolioApi.saveContent('home', data);
      setToast('Home Page Hero & About content saved successfully to MongoDB!');
    } catch (err) {
      console.warn('Backend save notice:', err.message);
      setToast('Content saved to local storage!');
    } finally {
      setSaving(false);
      setTimeout(() => setToast(''), 4000);
    }
  };

  const handleReset = () => {
    if (!window.confirm('Reset all Home page settings to default?')) return;
    setData(defaultHomeData);
    localStorage.removeItem('ishwar_home_content');
    setToast('Reset to defaults.');
    setTimeout(() => setToast(''), 2500);
  };

  // Image Upload Handlers (Converts file to base64 Data URL)
  const handleHeroImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert('Please upload an image smaller than 8MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setData((prev) => ({
        ...prev,
        hero: { ...prev.hero, image: event.target.result },
      }));
      setToast('Hero image loaded! Click "Save Changes" to store in MongoDB.');
      setTimeout(() => setToast(''), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleAboutImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert('Please upload an image smaller than 8MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setData((prev) => ({
        ...prev,
        homeAbout: { ...prev.homeAbout, image: event.target.result },
      }));
      setToast('About section image loaded! Click "Save Changes" to store.');
      setTimeout(() => setToast(''), 3000);
    };
    reader.readAsDataURL(file);
  };

  const removeHeroImage = () => {
    setData((prev) => ({
      ...prev,
      hero: { ...prev.hero, image: '' },
    }));
  };

  const removeAboutImage = () => {
    setData((prev) => ({
      ...prev,
      homeAbout: { ...prev.homeAbout, image: '' },
    }));
  };

  const resetHeroImageDefault = () => {
    setData((prev) => ({
      ...prev,
      hero: { ...prev.hero, image: '/assets/ishwar-profile.jpg' },
    }));
  };

  const resetAboutImageDefault = () => {
    setData((prev) => ({
      ...prev,
      homeAbout: { ...prev.homeAbout, image: '/assets/ishwar-profile.jpg' },
    }));
  };

  return (
    <section className="home-admin-page">
      {/* Header */}
      <div className="admin-header-box">
        <div>
          <div className="header-eyebrow">
            <span></span>
            HOMEPAGE BUILDER
          </div>
          <h1>
            Home Page <span>Content & Images</span>
          </h1>
          <p>
            Update Hero photo, headlines, bio, statistics, call-to-actions, and the Home About section with instant database persistence.
          </p>
        </div>

        <div className="header-btn-group">
          <button
            type="button"
            className="admin-btn admin-btn-primary"
            onClick={handleSave}
            disabled={saving}
          >
            <FiSave />
            {saving ? 'Saving to Database...' : 'Save All Changes'}
          </button>

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="admin-btn admin-btn-secondary"
          >
            <FiEye />
            <span>Live Site</span>
            <FiExternalLink />
          </a>
        </div>
      </div>

      {toast && (
        <div className="admin-alert success">
          <FiCheckCircle />
          <span>{toast}</span>
        </div>
      )}

      {/* SECTION TABS */}
      <div className="home-section-tabs">
        <button
          type="button"
          className={`section-tab-btn ${activeTab === 'hero' ? 'active' : ''}`}
          onClick={() => setActiveTab('hero')}
        >
          <FiZap />
          <span>1. Hero Section & Photo</span>
        </button>

        <button
          type="button"
          className={`section-tab-btn ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          <FiUser />
          <span>2. Home About Me Section</span>
        </button>
      </div>

      {/* =========================================================
          TAB 1: HERO SECTION & IMAGE
      ========================================================== */}
      {activeTab === 'hero' && (
        <div className="home-admin-layout">
          <div className="admin-card-box home-form-panel">
            {/* IMAGE CONTROLS */}
            <div className="admin-image-manager-card">
              <div className="img-manager-head">
                <FiImage className="img-mgr-icon" />
                <div>
                  <h3>Hero Main Photo</h3>
                  <small>Upload your portrait directly from device, or reset to default</small>
                </div>
              </div>

              <div className="img-manager-body">
                <div className="current-image-preview">
                  {data.hero.image ? (
                    <img src={data.hero.image} alt="Hero Preview" />
                  ) : (
                    <div className="no-image-placeholder">
                      <FiImage />
                      <span>No Image Selected</span>
                    </div>
                  )}
                </div>

                <div className="img-manager-actions">
                  <input
                    type="file"
                    ref={heroFileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleHeroImageUpload}
                  />

                  <button
                    type="button"
                    className="admin-btn admin-btn-primary img-action-btn"
                    onClick={() => heroFileInputRef.current?.click()}
                  >
                    <FiUploadCloud />
                    Upload Photo From Device
                  </button>

                  <div className="img-quick-buttons">
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary"
                      onClick={resetHeroImageDefault}
                    >
                      <FiRotateCcw /> Default Image
                    </button>

                    <button
                      type="button"
                      className="admin-btn admin-btn-danger"
                      onClick={removeHeroImage}
                    >
                      <FiTrash2 /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* LEFT CONTENT CONTROLS */}
            <div className="panel-title" style={{ marginTop: '24px' }}>
              <FiZap className="panel-title-icon" />
              <h2>Hero Left Content (Headings, Bio & Actions)</h2>
            </div>

            <div className="two-col-inputs">
              <div className="admin-input-group">
                <label>Top Eyebrow Badge</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero.eyebrow}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, eyebrow: e.target.value },
                    })
                  }
                  placeholder="e.g. FULL STACK DEVELOPER"
                />
              </div>

              <div className="admin-input-group">
                <label>Small Greeting</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero.smallTitle}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, smallTitle: e.target.value },
                    })
                  }
                  placeholder="e.g. HELLO, I'M"
                />
              </div>
            </div>

            <div className="two-col-inputs">
              <div className="admin-input-group">
                <label>First Name</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero.titleLine1}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, titleLine1: e.target.value },
                    })
                  }
                  placeholder="Ishwar"
                />
              </div>

              <div className="admin-input-group">
                <label>Last Name / Highlight</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero.titleLine2}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, titleLine2: e.target.value },
                    })
                  }
                  placeholder="Sharma."
                />
              </div>
            </div>

            <div className="admin-input-group">
              <label>Role Headline</label>
              <input
                type="text"
                className="admin-input"
                value={data.hero.roleHeadline}
                onChange={(e) =>
                  setData({
                    ...data,
                    hero: { ...data.hero, roleHeadline: e.target.value },
                  })
                }
                placeholder="I build modern web applications that solve real-world problems."
              />
            </div>

            <div className="admin-input-group">
              <label>Highlighted Words in Headline</label>
              <input
                type="text"
                className="admin-input"
                value={data.hero.roleHighlight}
                onChange={(e) =>
                  setData({
                    ...data,
                    hero: { ...data.hero, roleHighlight: e.target.value },
                  })
                }
                placeholder="real-world problems."
              />
            </div>

            <div className="admin-input-group">
              <label>Detailed Hero Biography / Description</label>
              <textarea
                className="admin-textarea"
                style={{ minHeight: '90px' }}
                value={data.hero.description}
                onChange={(e) =>
                  setData({
                    ...data,
                    hero: { ...data.hero, description: e.target.value },
                  })
                }
              />
            </div>

            {/* BUTTONS & LINKS */}
            <div className="panel-title" style={{ marginTop: '16px' }}>
              <FiLink className="panel-title-icon" />
              <h2>Action Buttons & Links</h2>
            </div>

            <div className="two-col-inputs">
              <div className="admin-input-group">
                <label>Button 1 (Primary) Text</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero.primaryBtnText}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, primaryBtnText: e.target.value },
                    })
                  }
                />
              </div>

              <div className="admin-input-group">
                <label>Button 1 Link URL</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero.primaryBtnLink}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, primaryBtnLink: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div className="two-col-inputs">
              <div className="admin-input-group">
                <label>Button 2 (Secondary) Text</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero.secondaryBtnText}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, secondaryBtnText: e.target.value },
                    })
                  }
                />
              </div>

              <div className="admin-input-group">
                <label>Button 2 Link URL</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero.secondaryBtnLink}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, secondaryBtnLink: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div className="two-col-inputs">
              <div className="admin-input-group">
                <label>Resume Download URL</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero.resumeLink}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, resumeLink: e.target.value },
                    })
                  }
                />
              </div>

              <div className="admin-input-group">
                <label>Bottom Note / Motto</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero.noteText}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, noteText: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            {/* FLOATING STATS */}
            <div className="panel-title" style={{ marginTop: '16px' }}>
              <FiLayers className="panel-title-icon" />
              <h2>Hero Floating Statistics</h2>
            </div>

            <div className="three-col-inputs">
              <div className="stat-edit-box">
                <label>Stat 1 Value</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero.stat1Number}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, stat1Number: e.target.value },
                    })
                  }
                />
                <label>Stat 1 Label</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero.stat1Label}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, stat1Label: e.target.value },
                    })
                  }
                />
              </div>

              <div className="stat-edit-box">
                <label>Stat 2 Value</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero.stat2Number}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, stat2Number: e.target.value },
                    })
                  }
                />
                <label>Stat 2 Label</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero.stat2Label}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, stat2Label: e.target.value },
                    })
                  }
                />
              </div>

              <div className="stat-edit-box">
                <label>Stat 3 Value</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero.stat3Number}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, stat3Number: e.target.value },
                    })
                  }
                />
                <label>Stat 3 Label</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero.stat3Label}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, stat3Label: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div className="form-action-row" style={{ marginTop: '24px' }}>
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={handleSave}
                disabled={saving}
              >
                <FiSave />
                {saving ? 'Saving...' : 'Save Hero Content'}
              </button>

              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={handleReset}
              >
                <FiRotateCcw />
                Reset Defaults
              </button>
            </div>
          </div>

          {/* REAL-TIME PREVIEW */}
          <div className="home-preview-wrapper">
            <div className="preview-header">
              <div className="preview-label">
                <span className="live-dot" />
                HERO SECTION PREVIEW
              </div>
              <span className="preview-sub">Real-Time Sync</span>
            </div>

            <div className="admin-card-box hero-preview-card">
              <div className="preview-badge">
                <span>{data.hero.eyebrow}</span>
              </div>

              <span className="preview-small-intro">{data.hero.smallTitle}</span>
              <h1 className="preview-hero-title">
                {data.hero.titleLine1}
                <br />
                <span className="accent-span">{data.hero.titleLine2}</span>
              </h1>

              <div className="preview-hero-subtitle">
                {data.hero.roleHeadline}
              </div>

              <p className="preview-hero-desc">{data.hero.description}</p>

              <div className="preview-button-row">
                <span className="preview-btn-main">
                  {data.hero.primaryBtnText}
                </span>
                <span className="preview-btn-outline">
                  {data.hero.secondaryBtnText}
                </span>
              </div>

              <div className="preview-image-box">
                {data.hero.image ? (
                  <img src={data.hero.image} alt="Hero Portrait" />
                ) : (
                  <div className="preview-no-img">No Image</div>
                )}
              </div>

              <div className="preview-stats-bar">
                <div className="preview-stat-item">
                  <strong>{data.hero.stat1Number}</strong>
                  <span>{data.hero.stat1Label}</span>
                </div>
                <div className="stat-separator"></div>
                <div className="preview-stat-item">
                  <strong>{data.hero.stat2Number}</strong>
                  <span>{data.hero.stat2Label}</span>
                </div>
                <div className="stat-separator"></div>
                <div className="preview-stat-item">
                  <strong>{data.hero.stat3Number}</strong>
                  <span>{data.hero.stat3Label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: HOME ABOUT SECTION & IMAGE
      ========================================================== */}
      {activeTab === 'about' && (
        <div className="home-admin-layout">
          <div className="admin-card-box home-form-panel">
            {/* ABOUT IMAGE CONTROLS */}
            <div className="admin-image-manager-card">
              <div className="img-manager-head">
                <FiImage className="img-mgr-icon" />
                <div>
                  <h3>Home About Section Photo</h3>
                  <small>Manage image shown in the "About Me" section on the Home page</small>
                </div>
              </div>

              <div className="img-manager-body">
                <div className="current-image-preview">
                  {data.homeAbout.image ? (
                    <img src={data.homeAbout.image} alt="About Section" />
                  ) : (
                    <div className="no-image-placeholder">
                      <FiImage />
                      <span>No Image Selected</span>
                    </div>
                  )}
                </div>

                <div className="img-manager-actions">
                  <input
                    type="file"
                    ref={aboutFileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleAboutImageUpload}
                  />

                  <button
                    type="button"
                    className="admin-btn admin-btn-primary img-action-btn"
                    onClick={() => aboutFileInputRef.current?.click()}
                  >
                    <FiUploadCloud />
                    Upload About Photo From Device
                  </button>

                  <div className="img-quick-buttons">
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary"
                      onClick={resetAboutImageDefault}
                    >
                      <FiRotateCcw /> Default Image
                    </button>

                    <button
                      type="button"
                      className="admin-btn admin-btn-danger"
                      onClick={removeAboutImage}
                    >
                      <FiTrash2 /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ABOUT CONTENT CONTROLS */}
            <div className="panel-title" style={{ marginTop: '24px' }}>
              <FiUser className="panel-title-icon" />
              <h2>Home About Section Content</h2>
            </div>

            <div className="two-col-inputs">
              <div className="admin-input-group">
                <label>Section Eyebrow</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.homeAbout.eyebrow}
                  onChange={(e) =>
                    setData({
                      ...data,
                      homeAbout: {
                        ...data.homeAbout,
                        eyebrow: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div className="admin-input-group">
                <label>Card Badge Text</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.homeAbout.badgeTop}
                  onChange={(e) =>
                    setData({
                      ...data,
                      homeAbout: {
                        ...data.homeAbout,
                        badgeTop: e.target.value,
                      },
                    })
                  }
                  placeholder="e.g. DEVELOPER"
                />
              </div>
            </div>

            <div className="two-col-inputs">
              <div className="admin-input-group">
                <label>Main Heading Line</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.homeAbout.headingMain}
                  onChange={(e) =>
                    setData({
                      ...data,
                      homeAbout: {
                        ...data.homeAbout,
                        headingMain: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div className="admin-input-group">
                <label>Heading Highlighted Words</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.homeAbout.headingHighlight}
                  onChange={(e) =>
                    setData({
                      ...data,
                      homeAbout: {
                        ...data.homeAbout,
                        headingHighlight: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>

            <div className="admin-input-group">
              <label>Detailed About Description</label>
              <textarea
                className="admin-textarea"
                style={{ minHeight: '120px' }}
                value={data.homeAbout.description}
                onChange={(e) =>
                  setData({
                    ...data,
                    homeAbout: {
                      ...data.homeAbout,
                      description: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="three-col-inputs">
              <div className="admin-input-group">
                <label>Location Pill</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.homeAbout.location}
                  onChange={(e) =>
                    setData({
                      ...data,
                      homeAbout: {
                        ...data.homeAbout,
                        location: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div className="admin-input-group">
                <label>Education Pill</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.homeAbout.education}
                  onChange={(e) =>
                    setData({
                      ...data,
                      homeAbout: {
                        ...data.homeAbout,
                        education: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div className="admin-input-group">
                <label>Email Pill</label>
                <input
                  type="email"
                  className="admin-input"
                  value={data.homeAbout.email}
                  onChange={(e) =>
                    setData({
                      ...data,
                      homeAbout: {
                        ...data.homeAbout,
                        email: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>

            <div className="two-col-inputs">
              <div className="admin-input-group">
                <label>Button Text</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.homeAbout.btnText}
                  onChange={(e) =>
                    setData({
                      ...data,
                      homeAbout: {
                        ...data.homeAbout,
                        btnText: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div className="admin-input-group">
                <label>Caption Tags (comma separated)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.homeAbout.captions}
                  onChange={(e) =>
                    setData({
                      ...data,
                      homeAbout: {
                        ...data.homeAbout,
                        captions: e.target.value,
                      },
                    })
                  }
                  placeholder="BUILD, LEARN, GROW"
                />
              </div>
            </div>

            <div className="form-action-row" style={{ marginTop: '24px' }}>
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={handleSave}
                disabled={saving}
              >
                <FiSave />
                {saving ? 'Saving...' : 'Save Home About Content'}
              </button>

              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={handleReset}
              >
                <FiRotateCcw />
                Reset Defaults
              </button>
            </div>
          </div>

          {/* REAL-TIME PREVIEW OF ABOUT SECTION */}
          <div className="home-preview-wrapper">
            <div className="preview-header">
              <div className="preview-label">
                <span className="live-dot" />
                HOME ABOUT PREVIEW
              </div>
              <span className="preview-sub">Real-Time Sync</span>
            </div>

            <div className="admin-card-box hero-preview-card">
              <div className="preview-badge">
                <span>{data.homeAbout.eyebrow}</span>
              </div>

              <h2 className="preview-hero-title">
                {data.homeAbout.headingMain}
                <br />
                <span className="accent-span">
                  {data.homeAbout.headingHighlight}
                </span>
              </h2>

              <p className="preview-hero-desc">{data.homeAbout.description}</p>

              <div className="preview-mini-pills">
                <div className="preview-mini-item">
                  <small>LOCATION</small>
                  <strong>{data.homeAbout.location}</strong>
                </div>
                <div className="preview-mini-item">
                  <small>EDUCATION</small>
                  <strong>{data.homeAbout.education}</strong>
                </div>
                <div className="preview-mini-item">
                  <small>EMAIL</small>
                  <strong>{data.homeAbout.email}</strong>
                </div>
              </div>

              <div className="preview-image-box" style={{ marginTop: '20px' }}>
                {data.homeAbout.image ? (
                  <img src={data.homeAbout.image} alt="Home About Portrait" />
                ) : (
                  <div className="preview-no-img">No Image</div>
                )}
              </div>

              <div
                className="preview-captions-row"
                style={{ marginTop: '12px', textAlign: 'center' }}
              >
                <small style={{ color: '#70baff', letterSpacing: '2px' }}>
                  {data.homeAbout.captions}
                </small>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
