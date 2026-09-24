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
  FiPlus,
  FiCode,
  FiLayers,
  FiZap,
  FiSliders,
  FiTool,
  FiDatabase,
  FiServer,
  FiMonitor,
  FiCloud,
  FiBookOpen,
} from 'react-icons/fi';
import { portfolioApi } from '../lib/api';
import './AdminSkills.css';

const defaultSkillsData = {
  hero: {
    eyebrow: 'MY SKILLS',
    headingLine1: 'Skills That',
    headingLine2: 'Turn Ideas Into',
    headingHighlight: 'Reality',
    description:
      "I'm constantly learning and improving my skills to build better, faster and more scalable web applications.",
    projectsBtnText: 'View My Projects',
    projectsBtnLink: '/projects',
    contactBtnText: 'Get In Touch',
    contactBtnLink: '/contact',
    image: '/assets/ishwar-profile.jpg',
    quoteText:
      'The more you learn, the more you realize how much there is left to learn.',
    quoteAuthor: 'Ishwar Sharma',
  },
  technical: {
    eyebrow: 'MY TECHNICAL SKILLS',
    heading: 'Technologies I Work With',
    description:
      'I work with a wide range of modern technologies to build scalable, secure and high-performance applications.',
    categories: [
      {
        title: 'Frontend Development',
        skillsList: 'HTML, CSS, JavaScript, React, Redux, Bootstrap, Tailwind CSS',
        level: 90,
        badge: 'Frontend',
        iconType: 'monitor',
        image: '',
      },
      {
        title: 'Backend Development',
        skillsList: 'Java, Spring Boot, Spring Data JPA, Node.js, Express.js, PHP',
        level: 85,
        badge: 'Backend',
        iconType: 'server',
        image: '',
      },
      {
        title: 'Database',
        skillsList: 'MySQL, MongoDB, MariaDB, Oracle',
        level: 80,
        badge: 'Database',
        iconType: 'database',
        image: '',
      },
      {
        title: 'Tools & Platforms',
        skillsList: 'Git, GitHub, Postman, VS Code, Eclipse, IntelliJ, XAMPP',
        level: 85,
        badge: 'DevOps & Tools',
        iconType: 'tool',
        image: '',
      },
      {
        title: 'Cloud & Deployment',
        skillsList: 'AWS (S3), Vercel, Netlify, Hostinger, CyberPanel',
        level: 75,
        badge: 'Cloud',
        iconType: 'cloud',
        image: '',
      },
      {
        title: 'Additional Skills',
        skillsList: 'REST APIs, JWT, Spring Security, Thymeleaf, JSP, Servlets',
        level: 80,
        badge: 'APIs & Security',
        iconType: 'code',
        image: '',
      },
      {
        title: 'Other Skills',
        skillsList: 'Data Structures & Algorithms, Problem Solving, Linux Basics',
        level: 70,
        badge: 'Core Computer Science',
        iconType: 'code',
        image: '',
      },
      {
        title: 'Currently Learning',
        skillsList: 'System Design, Docker, Kubernetes, CI/CD, Advanced AWS',
        level: 60,
        badge: 'Advanced & Cloud',
        iconType: 'book',
        image: '',
      },
    ],
  },
  toolkit: {
    eyebrow: 'TOOLS I USE',
    heading: 'My Development Toolkit',
    tools: [
      'VS Code',
      'IntelliJ',
      'Eclipse',
      'Git',
      'GitHub',
      'Postman',
      'MySQL',
      'MongoDB',
      'AWS',
      'Docker',
      'Figma',
      'Netlify',
    ],
  },
  stats: {
    stat1Value: '10+',
    stat1Label: 'Technologies',
    stat2Value: '20+',
    stat2Label: 'Projects Built',
    stat3Value: '2+',
    stat3Label: 'Years Experience',
    stat4Value: 'Continuous',
    stat4Label: 'Learning',
  },
};

export default function AdminSkills() {
  const [activeTab, setActiveTab] = useState('hero'); // 'hero' | 'cards' | 'toolkit'
  const [data, setData] = useState(() => {
    const cached = localStorage.getItem('ishwar_skills_page_data');
    return cached ? JSON.parse(cached) : defaultSkillsData;
  });

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const heroFileInputRef = useRef(null);

  // New Skill Card Form State
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    title: '',
    badge: 'Frontend',
    skillsList: '',
    level: 85,
    iconType: 'code',
    image: '',
  });

  // Tools input string
  const [newTool, setNewTool] = useState('');

  // Fetch from MongoDB
  useEffect(() => {
    portfolioApi
      .getSkills()
      .then((res) => {
        if (res && res.data && res.data.hero) {
          setData(res.data);
          localStorage.setItem('ishwar_skills_page_data', JSON.stringify(res.data));
        }
      })
      .catch(() => {});
  }, []);

  // Save to MongoDB & localStorage
  const handleSave = async () => {
    setSaving(true);
    try {
      localStorage.setItem('ishwar_skills_page_data', JSON.stringify(data));
      await portfolioApi.saveSkills(data);
      setToast('Skills page content, badges & images saved successfully to MongoDB!');
    } catch (err) {
      console.warn('Backend save notice:', err.message);
      setToast('Skills saved to local storage!');
    } finally {
      setSaving(false);
      setTimeout(() => setToast(''), 4000);
    }
  };

  const handleReset = () => {
    if (!window.confirm('Reset all Skills page settings to default?')) return;
    setData(defaultSkillsData);
    localStorage.removeItem('ishwar_skills_page_data');
    setToast('Reset to defaults.');
    setTimeout(() => setToast(''), 2500);
  };

  // Direct File Upload for Hero Image
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
      setToast('Hero image uploaded! Click "Save All Changes" to store.');
      setTimeout(() => setToast(''), 3000);
    };
    reader.readAsDataURL(file);
  };

  // Direct File Upload for a specific Skill Card image/icon
  const handleCardImageUpload = (index, file) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Please upload an image smaller than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setData((prev) => {
        const updated = [...(prev.technical?.categories || [])];
        updated[index] = { ...updated[index], image: event.target.result };
        return {
          ...prev,
          technical: {
            ...prev.technical,
            categories: updated,
          },
        };
      });
      setToast('Skill icon/image updated! Remember to save.');
      setTimeout(() => setToast(''), 3000);
    };
    reader.readAsDataURL(file);
  };

  // Direct File Upload for New Card
  const handleNewCardImageUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setNewCard((prev) => ({ ...prev, image: event.target.result }));
    };
    reader.readAsDataURL(file);
  };

  // Add Skill Card
  const handleAddCard = (e) => {
    e.preventDefault();
    if (!newCard.title.trim()) {
      alert('Please enter a skill card title.');
      return;
    }

    setData((prev) => ({
      ...prev,
      technical: {
        ...prev.technical,
        categories: [
          ...(prev.technical?.categories || []),
          { ...newCard, level: Number(newCard.level) || 85 },
        ],
      },
    }));

    setNewCard({
      title: '',
      badge: 'Frontend',
      skillsList: '',
      level: 85,
      iconType: 'code',
      image: '',
    });
    setShowAddCard(false);
    setToast('New skill category added! Remember to save changes.');
    setTimeout(() => setToast(''), 3000);
  };

  // Update Skill Card Field
  const handleUpdateCard = (index, field, value) => {
    setData((prev) => {
      const updated = [...(prev.technical?.categories || [])];
      updated[index] = { ...updated[index], [field]: value };
      return {
        ...prev,
        technical: {
          ...prev.technical,
          categories: updated,
        },
      };
    });
  };

  // Delete Skill Card
  const handleDeleteCard = (index) => {
    if (!window.confirm('Are you sure you want to delete this skill card?')) return;
    setData((prev) => {
      const updated = [...(prev.technical?.categories || [])];
      updated.splice(index, 1);
      return {
        ...prev,
        technical: {
          ...prev.technical,
          categories: updated,
        },
      };
    });
  };

  // Tools management
  const handleAddTool = (e) => {
    e.preventDefault();
    if (!newTool.trim()) return;
    if (data.toolkit?.tools?.includes(newTool.trim())) {
      alert('Tool already in toolkit!');
      return;
    }

    setData((prev) => ({
      ...prev,
      toolkit: {
        ...prev.toolkit,
        tools: [...(prev.toolkit?.tools || []), newTool.trim()],
      },
    }));
    setNewTool('');
  };

  const handleDeleteTool = (toolName) => {
    setData((prev) => ({
      ...prev,
      toolkit: {
        ...prev.toolkit,
        tools: (prev.toolkit?.tools || []).filter((t) => t !== toolName),
      },
    }));
  };

  return (
    <section className="skills-admin-page">
      {/* Header */}
      <div className="admin-header-box">
        <div>
          <div className="header-eyebrow">
            <span></span>
            SKILLS PAGE BUILDER
          </div>
          <h1>
            Skills Page <span>Content & Badges</span>
          </h1>
          <p>
            Complete management of the public Skills page: hero photo, quote, technical skill cards with badges & direct image upload, development toolkit and stats.
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
            href="/skills"
            target="_blank"
            rel="noreferrer"
            className="admin-btn admin-btn-secondary"
          >
            <FiEye />
            <span>View Live Skills</span>
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
      <div className="skills-section-tabs">
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
          className={`section-tab-btn ${activeTab === 'cards' ? 'active' : ''}`}
          onClick={() => setActiveTab('cards')}
        >
          <FiSliders />
          <span>2. Technical Skill Cards ({data.technical?.categories?.length || 0})</span>
        </button>

        <button
          type="button"
          className={`section-tab-btn ${activeTab === 'toolkit' ? 'active' : ''}`}
          onClick={() => setActiveTab('toolkit')}
        >
          <FiTool />
          <span>3. Toolkit & Stats</span>
        </button>
      </div>

      {/* =========================================================
          TAB 1: HERO SECTION & RIGHT PHOTO & QUOTE
      ========================================================== */}
      {activeTab === 'hero' && (
        <div className="skills-admin-layout">
          <div className="admin-card-box skills-form-panel">
            {/* HERO PHOTO CONTROLS */}
            <div className="admin-image-manager-card">
              <div className="img-manager-head">
                <FiImage className="img-mgr-icon" />
                <div>
                  <h3>Skills Hero Photo</h3>
                  <small>Upload your portrait directly from device (accepts PNG, JPG, WEBP)</small>
                </div>
              </div>

              <div className="img-manager-body">
                <div className="current-image-preview">
                  {data.hero?.image ? (
                    <img src={data.hero.image} alt="Hero Portrait" />
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
                      onClick={() =>
                        setData((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, image: '/assets/ishwar-profile.jpg' },
                        }))
                      }
                    >
                      <FiRotateCcw /> Default Image
                    </button>

                    <button
                      type="button"
                      className="admin-btn admin-btn-danger"
                      onClick={() =>
                        setData((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, image: '' },
                        }))
                      }
                    >
                      <FiTrash2 /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* HEADINGS & TEXT */}
            <div className="panel-title" style={{ marginTop: '24px' }}>
              <FiZap className="panel-title-icon" />
              <h2>Skills Hero Headings & Bio</h2>
            </div>

            <div className="two-col-inputs">
              <div className="admin-input-group">
                <label>Top Eyebrow Badge</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero?.eyebrow || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, eyebrow: e.target.value },
                    })
                  }
                  placeholder="e.g. MY SKILLS"
                />
              </div>

              <div className="admin-input-group">
                <label>Heading Line 1</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero?.headingLine1 || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, headingLine1: e.target.value },
                    })
                  }
                  placeholder="e.g. Skills That"
                />
              </div>
            </div>

            <div className="two-col-inputs">
              <div className="admin-input-group">
                <label>Heading Line 2</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero?.headingLine2 || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, headingLine2: e.target.value },
                    })
                  }
                  placeholder="e.g. Turn Ideas Into"
                />
              </div>

              <div className="admin-input-group">
                <label>Highlighted Words</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero?.headingHighlight || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, headingHighlight: e.target.value },
                    })
                  }
                  placeholder="e.g. Reality"
                />
              </div>
            </div>

            <div className="admin-input-group">
              <label>Hero Description</label>
              <textarea
                className="admin-textarea"
                style={{ minHeight: '80px' }}
                value={data.hero?.description || ''}
                onChange={(e) =>
                  setData({
                    ...data,
                    hero: { ...data.hero, description: e.target.value },
                  })
                }
              />
            </div>

            {/* BUTTONS & QUOTE */}
            <div className="two-col-inputs">
              <div className="admin-input-group">
                <label>Quote Text</label>
                <textarea
                  className="admin-textarea"
                  style={{ minHeight: '70px' }}
                  value={data.hero?.quoteText || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, quoteText: e.target.value },
                    })
                  }
                />
              </div>

              <div className="admin-input-group">
                <label>Quote Author</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero?.quoteAuthor || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, quoteAuthor: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div className="two-col-inputs">
              <div className="admin-input-group">
                <label>Button 1 Text</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero?.projectsBtnText || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, projectsBtnText: e.target.value },
                    })
                  }
                />
              </div>

              <div className="admin-input-group">
                <label>Button 1 Link</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero?.projectsBtnLink || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, projectsBtnLink: e.target.value },
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
                {saving ? 'Saving...' : 'Save Skills Hero'}
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

          {/* REAL-TIME PREVIEW OF HERO */}
          <div className="skills-preview-wrapper">
            <div className="preview-header">
              <div className="preview-label">
                <span className="live-dot" />
                SKILLS HERO PREVIEW
              </div>
              <span className="preview-sub">Real-Time Sync</span>
            </div>

            <div className="admin-card-box hero-preview-card">
              <div className="preview-badge">
                <span>{data.hero?.eyebrow}</span>
              </div>

              <h1 className="preview-hero-title">
                {data.hero?.headingLine1}
                <br />
                {data.hero?.headingLine2}
                <br />
                <span className="accent-span">{data.hero?.headingHighlight}</span>
              </h1>

              <p className="preview-hero-desc">{data.hero?.description}</p>

              <div className="preview-image-box">
                {data.hero?.image ? (
                  <img src={data.hero.image} alt="Hero Portrait" />
                ) : (
                  <div className="preview-no-img">No Image</div>
                )}
              </div>

              <div className="preview-quote-card">
                <b>“</b>
                <p>{data.hero?.quoteText}</p>
                <small>— {data.hero?.quoteAuthor}</small>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: TECHNICAL SKILL CARDS WITH BADGES & IMAGE UPLOADS
      ========================================================== */}
      {activeTab === 'cards' && (
        <div className="skills-admin-layout">
          <div className="admin-card-box skills-form-panel">
            <div className="panel-title">
              <FiSliders className="panel-title-icon" />
              <h2>Technical Section Headings</h2>
            </div>

            <div className="two-col-inputs">
              <div className="admin-input-group">
                <label>Section Eyebrow</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.technical?.eyebrow || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      technical: { ...data.technical, eyebrow: e.target.value },
                    })
                  }
                />
              </div>

              <div className="admin-input-group">
                <label>Main Section Heading</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.technical?.heading || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      technical: { ...data.technical, heading: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div className="admin-input-group">
              <label>Section Description</label>
              <textarea
                className="admin-textarea"
                style={{ minHeight: '60px' }}
                value={data.technical?.description || ''}
                onChange={(e) =>
                  setData({
                    ...data,
                    technical: { ...data.technical, description: e.target.value },
                  })
                }
              />
            </div>

            {/* ADD SKILL CARD BUTTON */}
            <div
              className="panel-title"
              style={{
                marginTop: '24px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiCode className="panel-title-icon" />
                <h2>Skill Categories & Cards ({data.technical?.categories?.length || 0})</h2>
              </div>

              <button
                type="button"
                className="admin-btn admin-btn-primary"
                style={{ padding: '6px 14px', fontSize: '12px' }}
                onClick={() => setShowAddCard(!showAddCard)}
              >
                <FiPlus />
                {showAddCard ? 'Cancel' : 'Add Skill Card'}
              </button>
            </div>

            {/* ADD NEW CARD FORM */}
            {showAddCard && (
              <form onSubmit={handleAddCard} className="new-skill-card-box">
                <h4>Add New Skill Category Card</h4>

                <div className="two-col-inputs">
                  <div className="admin-input-group">
                    <label>Card Title / Domain</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Mobile App Development"
                      value={newCard.title}
                      onChange={(e) =>
                        setNewCard({ ...newCard, title: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="admin-input-group">
                    <label>Badge / Category</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Mobile, Frontend, Cloud"
                      value={newCard.badge}
                      onChange={(e) =>
                        setNewCard({ ...newCard, badge: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="admin-input-group">
                  <label>Technologies / Skills List (comma separated)</label>
                  <textarea
                    className="admin-textarea"
                    style={{ minHeight: '60px' }}
                    placeholder="e.g. React Native, Flutter, Swift, Kotlin"
                    value={newCard.skillsList}
                    onChange={(e) =>
                      setNewCard({ ...newCard, skillsList: e.target.value })
                    }
                  />
                </div>

                <div className="two-col-inputs">
                  <div className="admin-input-group">
                    <label>Proficiency Level % ({newCard.level}%)</label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={newCard.level}
                      onChange={(e) =>
                        setNewCard({ ...newCard, level: Number(e.target.value) })
                      }
                      className="proficiency-slider"
                    />
                  </div>

                  <div className="admin-input-group">
                    <label>Default Icon Type</label>
                    <select
                      className="admin-select"
                      value={newCard.iconType}
                      onChange={(e) =>
                        setNewCard({ ...newCard, iconType: e.target.value })
                      }
                    >
                      <option value="monitor">Monitor (Frontend)</option>
                      <option value="server">Server (Backend)</option>
                      <option value="database">Database</option>
                      <option value="tool">Tool (DevOps)</option>
                      <option value="cloud">Cloud</option>
                      <option value="code">Code (General)</option>
                      <option value="book">Book (Learning)</option>
                    </select>
                  </div>
                </div>

                <div className="admin-input-group">
                  <label>Or Upload Custom Card Image/Icon (from device)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleNewCardImageUpload(e.target.files?.[0])}
                  />
                  {newCard.image && (
                    <div style={{ marginTop: '8px' }}>
                      <img
                        src={newCard.image}
                        alt="Preview"
                        style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
                      />
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                  <button type="submit" className="admin-btn admin-btn-primary">
                    <FiPlus /> Add to Skills List
                  </button>
                  <button
                    type="button"
                    className="admin-btn admin-btn-secondary"
                    onClick={() => setShowAddCard(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* LIST OF SKILL CARDS */}
            <div className="skill-cards-editor-list">
              {data.technical?.categories?.map((card, idx) => (
                <div className="skill-card-editor-item" key={idx}>
                  <div className="skill-card-editor-header">
                    <div className="skill-card-header-left">
                      <span className="skill-idx-pill">#{idx + 1}</span>
                      <span className="skill-badge-tag">{card.badge}</span>
                      <strong className="skill-card-title">{card.title}</strong>
                    </div>

                    <div className="skill-card-header-right">
                      <span className="skill-level-display">{card.level}%</span>
                      <button
                        type="button"
                        className="milestone-delete-btn"
                        onClick={() => handleDeleteCard(idx)}
                        title="Delete Card"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>

                  <div className="two-col-inputs" style={{ marginTop: '12px' }}>
                    <div className="admin-input-group">
                      <label>Title</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={card.title || ''}
                        onChange={(e) => handleUpdateCard(idx, 'title', e.target.value)}
                      />
                    </div>

                    <div className="admin-input-group">
                      <label>Badge / Category</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={card.badge || ''}
                        onChange={(e) => handleUpdateCard(idx, 'badge', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="admin-input-group">
                    <label>Skills & Technologies</label>
                    <textarea
                      className="admin-textarea"
                      style={{ minHeight: '50px' }}
                      value={card.skillsList || ''}
                      onChange={(e) => handleUpdateCard(idx, 'skillsList', e.target.value)}
                    />
                  </div>

                  <div className="two-col-inputs">
                    <div className="admin-input-group">
                      <label>Proficiency ({card.level}%)</label>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="5"
                        value={card.level || 80}
                        onChange={(e) =>
                          handleUpdateCard(idx, 'level', Number(e.target.value))
                        }
                        className="proficiency-slider"
                      />
                    </div>

                    <div className="admin-input-group">
                      <label>Upload Custom Icon/Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleCardImageUpload(idx, e.target.files?.[0])
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="form-action-row" style={{ marginTop: '24px' }}>
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={handleSave}
                disabled={saving}
              >
                <FiSave />
                {saving ? 'Saving...' : 'Save Skill Cards'}
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

          {/* REAL-TIME PREVIEW OF SKILL CARDS */}
          <div className="skills-preview-wrapper">
            <div className="preview-header">
              <div className="preview-label">
                <span className="live-dot" />
                TECHNICAL CARDS PREVIEW
              </div>
              <span className="preview-sub">Real-Time Sync</span>
            </div>

            <div className="admin-card-box hero-preview-card">
              <div className="preview-badge">
                <span>{data.technical?.eyebrow}</span>
              </div>

              <h2 className="preview-hero-title">{data.technical?.heading}</h2>
              <p className="preview-hero-desc">{data.technical?.description}</p>

              <div className="preview-cards-stack">
                {data.technical?.categories?.map((c, i) => (
                  <div className="preview-card-item" key={i}>
                    <div className="preview-card-top">
                      <div>
                        <span className="preview-mini-badge">{c.badge}</span>
                        <h4>{c.title}</h4>
                      </div>
                      <strong>{c.level}%</strong>
                    </div>
                    <p>{c.skillsList}</p>
                    <div className="preview-level-bar">
                      <div
                        className="preview-level-fill"
                        style={{ width: `${c.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: DEVELOPMENT TOOLKIT & STATS
      ========================================================== */}
      {activeTab === 'toolkit' && (
        <div className="skills-admin-layout">
          <div className="admin-card-box skills-form-panel">
            {/* TOOLKIT SECTION */}
            <div className="panel-title">
              <FiTool className="panel-title-icon" />
              <h2>Development Toolkit Tags</h2>
            </div>

            <div className="two-col-inputs">
              <div className="admin-input-group">
                <label>Toolkit Eyebrow</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.toolkit?.eyebrow || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      toolkit: { ...data.toolkit, eyebrow: e.target.value },
                    })
                  }
                />
              </div>

              <div className="admin-input-group">
                <label>Toolkit Heading</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.toolkit?.heading || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      toolkit: { ...data.toolkit, heading: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            {/* ADD TOOL FORM */}
            <form onSubmit={handleAddTool} className="add-tool-form">
              <input
                type="text"
                className="admin-input"
                placeholder="Enter tool name (e.g. Redis, Tailwind, Next.js)..."
                value={newTool}
                onChange={(e) => setNewTool(e.target.value)}
              />
              <button type="submit" className="admin-btn admin-btn-primary">
                <FiPlus /> Add Tool
              </button>
            </form>

            {/* TOOLS CHIPS */}
            <div className="tools-chips-container">
              {data.toolkit?.tools?.map((tool) => (
                <div className="tool-chip" key={tool}>
                  <span>{tool}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteTool(tool)}
                    title="Remove Tool"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* STATS SECTION */}
            <div className="panel-title" style={{ marginTop: '28px' }}>
              <FiLayers className="panel-title-icon" />
              <h2>Skills Page 4 Statistics Counters</h2>
            </div>

            <div className="two-col-inputs">
              <div className="stat-edit-box">
                <label>Stat 1 Value</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.stats?.stat1Value || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      stats: { ...data.stats, stat1Value: e.target.value },
                    })
                  }
                />
                <label>Stat 1 Label</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.stats?.stat1Label || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      stats: { ...data.stats, stat1Label: e.target.value },
                    })
                  }
                />
              </div>

              <div className="stat-edit-box">
                <label>Stat 2 Value</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.stats?.stat2Value || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      stats: { ...data.stats, stat2Value: e.target.value },
                    })
                  }
                />
                <label>Stat 2 Label</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.stats?.stat2Label || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      stats: { ...data.stats, stat2Label: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div className="two-col-inputs" style={{ marginTop: '12px' }}>
              <div className="stat-edit-box">
                <label>Stat 3 Value</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.stats?.stat3Value || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      stats: { ...data.stats, stat3Value: e.target.value },
                    })
                  }
                />
                <label>Stat 3 Label</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.stats?.stat3Label || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      stats: { ...data.stats, stat3Label: e.target.value },
                    })
                  }
                />
              </div>

              <div className="stat-edit-box">
                <label>Stat 4 Value</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.stats?.stat4Value || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      stats: { ...data.stats, stat4Value: e.target.value },
                    })
                  }
                />
                <label>Stat 4 Label</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.stats?.stat4Label || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      stats: { ...data.stats, stat4Label: e.target.value },
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
                {saving ? 'Saving...' : 'Save Toolkit & Stats'}
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

          {/* REAL-TIME PREVIEW OF TOOLKIT & STATS */}
          <div className="skills-preview-wrapper">
            <div className="preview-header">
              <div className="preview-label">
                <span className="live-dot" />
                TOOLKIT & STATS PREVIEW
              </div>
              <span className="preview-sub">Real-Time Sync</span>
            </div>

            <div className="admin-card-box hero-preview-card">
              <div className="preview-badge">
                <span>{data.toolkit?.eyebrow}</span>
              </div>

              <h2 className="preview-hero-title">{data.toolkit?.heading}</h2>

              <div className="preview-toolkit-tags">
                {data.toolkit?.tools?.map((t) => (
                  <span className="preview-tag-pill" key={t}>
                    <FiCode /> {t}
                  </span>
                ))}
              </div>

              <div className="preview-stats-bar" style={{ marginTop: '24px' }}>
                <div className="preview-stat-item">
                  <strong>{data.stats?.stat1Value}</strong>
                  <span>{data.stats?.stat1Label}</span>
                </div>
                <div className="stat-separator"></div>
                <div className="preview-stat-item">
                  <strong>{data.stats?.stat2Value}</strong>
                  <span>{data.stats?.stat2Label}</span>
                </div>
                <div className="stat-separator"></div>
                <div className="preview-stat-item">
                  <strong>{data.stats?.stat3Value}</strong>
                  <span>{data.stats?.stat3Label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
