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
  FiBriefcase,
  FiCalendar,
  FiMapPin,
  FiLayers,
  FiTool,
  FiTrendingUp,
  FiUsers,
  FiCode,
} from 'react-icons/fi';
import { portfolioApi } from '../lib/api';
import './AdminExperience.css';

const defaultExperienceData = {
  hero: {
    eyebrow: 'MY EXPERIENCE',
    headingLine1: 'A Journey of',
    headingHighlight: 'Learning & Building',
    description:
      "Every experience has shaped me into a better developer. Here's a timeline of my professional journey, internships and the skills I've gained along the way.",
    resumeLink: '/resume.pdf',
    resumeText: 'Download Resume',
    connectLink: '/contact',
    connectText: "Let's Connect",
    image: '/assets/experience-preview.png',
  },
  stats: {
    stat1Value: '3+',
    stat1Label: 'Years Experience',
    stat2Value: '10+',
    stat2Label: 'Projects Completed',
    stat3Value: '4+',
    stat3Label: 'Companies/Clients',
    stat4Value: '100%',
    stat4Label: 'Continuous Learning',
  },
  timeline: {
    eyebrow: 'MY PROFESSIONAL JOURNEY',
    heading: 'Work Experience Timeline',
    items: [
      {
        role: 'Technical Supervisor',
        company: 'Wipro (On-Site)',
        period: 'Mar 2024 – Present',
        location: 'Gurugram, Haryana',
        type: 'Full-time',
        description:
          'Handling technical operations and team support at client site. Working on system maintenance, troubleshooting and user support.',
        technologies: ['Technical Operations', 'Troubleshooting', 'System Support'],
        image: '',
      },
      {
        role: 'HVAC Plant Operations',
        company: 'DLF Corporate Greens, Gurugram',
        period: 'Mar 2022 – Mar 2024',
        location: 'Gurugram, Haryana',
        type: 'Full-time',
        description:
          'Worked in HVAC plant operations and technical systems, managing maintenance and day-to-day operations.',
        technologies: ['Plant Operations', 'Maintenance', 'Diagnostics'],
        image: '',
      },
      {
        role: 'Full Stack Developer (Intern)',
        company: 'AAM Infotech Pvt. Ltd., Gurugram',
        period: 'Sep 2023 – Feb 2024',
        location: 'Gurugram, Haryana',
        type: 'Internship',
        description:
          'Worked on Java, Spring Boot, REST APIs, MySQL and frontend technologies. Built and tested web applications.',
        technologies: ['Java', 'Spring Boot', 'REST APIs', 'MySQL', 'React'],
        image: '',
      },
      {
        role: 'BCA & MCA',
        company: 'Maharshi Dayanand University, Rohtak (MDU)',
        period: '2019 – 2024',
        location: 'Rohtak, Haryana',
        type: 'Education',
        description:
          'Completed BCA and MCA with a strong foundation in computer applications and software development.',
        technologies: ['Computer Science', 'Software Engineering', 'Data Structures'],
        image: '',
      },
    ],
  },
  tools: {
    heading: "Tools & Environments I've Worked With",
    list: [
      'Windows',
      'Linux',
      'MySQL',
      'Git',
      'GitHub',
      'VS Code',
      'Postman',
      'Docker',
      'AWS',
      'Nginx',
      'XAMPP',
      'Figma',
    ],
  },
};

export default function AdminExperience() {
  const [activeTab, setActiveTab] = useState('timeline'); // 'hero' | 'timeline' | 'stats'
  const [data, setData] = useState(() => {
    const cached = localStorage.getItem('ishwar_experience_page_data');
    return cached ? JSON.parse(cached) : defaultExperienceData;
  });

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const heroImageInputRef = useRef(null);

  // New Item State
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState({
    role: '',
    company: '',
    period: '',
    location: '',
    type: 'Full-time',
    description: '',
    technologies: '',
    image: '',
  });

  // Tool tag input state
  const [newTool, setNewTool] = useState('');

  // Fetch data from MongoDB
  useEffect(() => {
    portfolioApi
      .getExperience()
      .then((res) => {
        if (res && res.data && res.data.hero) {
          setData(res.data);
          localStorage.setItem(
            'ishwar_experience_page_data',
            JSON.stringify(res.data)
          );
        }
      })
      .catch(() => {});
  }, []);

  // Save to MongoDB & localStorage
  const handleSave = async () => {
    setSaving(true);
    try {
      localStorage.setItem('ishwar_experience_page_data', JSON.stringify(data));
      await portfolioApi.saveExperience(data);
      setToast('Experience content, timeline & images saved successfully to MongoDB!');
    } catch (err) {
      console.warn('Backend save notice:', err.message);
      setToast('Experience saved to local storage!');
    } finally {
      setSaving(false);
      setTimeout(() => setToast(''), 4000);
    }
  };

  const handleReset = () => {
    if (!window.confirm('Reset all Experience page settings to default?')) return;
    setData(defaultExperienceData);
    localStorage.removeItem('ishwar_experience_page_data');
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
      setToast('Workspace image uploaded! Click "Save All Changes" to store.');
      setTimeout(() => setToast(''), 3000);
    };
    reader.readAsDataURL(file);
  };

  // Direct File Upload for a Timeline Item image
  const handleItemImageUpload = (index, file) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Please upload an image smaller than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setData((prev) => {
        const updated = [...(prev.timeline?.items || [])];
        updated[index] = { ...updated[index], image: event.target.result };
        return {
          ...prev,
          timeline: {
            ...prev.timeline,
            items: updated,
          },
        };
      });
      setToast('Company logo/image uploaded! Remember to save.');
      setTimeout(() => setToast(''), 3000);
    };
    reader.readAsDataURL(file);
  };

  // Add Timeline Item
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.role.trim() || !newItem.company.trim()) {
      alert('Please enter both Role and Company.');
      return;
    }

    const techArray = typeof newItem.technologies === 'string'
      ? newItem.technologies.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const itemToAdd = {
      ...newItem,
      technologies: techArray,
    };

    setData((prev) => ({
      ...prev,
      timeline: {
        ...prev.timeline,
        items: [itemToAdd, ...(prev.timeline?.items || [])],
      },
    }));

    setNewItem({
      role: '',
      company: '',
      period: '',
      location: '',
      type: 'Full-time',
      description: '',
      technologies: '',
      image: '',
    });
    setShowAddItem(false);
    setToast('New experience added! Remember to save changes.');
    setTimeout(() => setToast(''), 3000);
  };

  // Update Timeline Item
  const handleUpdateItem = (index, field, value) => {
    setData((prev) => {
      const updated = [...(prev.timeline?.items || [])];
      if (field === 'technologies' && typeof value === 'string') {
        updated[index] = {
          ...updated[index],
          technologies: value.split(',').map((t) => t.trim()).filter(Boolean),
        };
      } else {
        updated[index] = { ...updated[index], [field]: value };
      }
      return {
        ...prev,
        timeline: {
          ...prev.timeline,
          items: updated,
        },
      };
    });
  };

  // Delete Timeline Item
  const handleDeleteItem = (index) => {
    if (!window.confirm('Are you sure you want to delete this experience entry?')) return;
    setData((prev) => {
      const updated = [...(prev.timeline?.items || [])];
      updated.splice(index, 1);
      return {
        ...prev,
        timeline: {
          ...prev.timeline,
          items: updated,
        },
      };
    });
  };

  // Tool tags management
  const handleAddTool = (e) => {
    e.preventDefault();
    if (!newTool.trim()) return;
    if (data.tools?.list?.includes(newTool.trim())) {
      alert('Tool already in list!');
      return;
    }

    setData((prev) => ({
      ...prev,
      tools: {
        ...prev.tools,
        list: [...(prev.tools?.list || []), newTool.trim()],
      },
    }));
    setNewTool('');
  };

  const handleDeleteTool = (toolName) => {
    setData((prev) => ({
      ...prev,
      tools: {
        ...prev.tools,
        list: (prev.tools?.list || []).filter((t) => t !== toolName),
      },
    }));
  };

  return (
    <section className="exp-admin-page">
      {/* Header */}
      <div className="admin-header-box">
        <div>
          <div className="header-eyebrow">
            <span></span>
            EXPERIENCE BUILDER
          </div>
          <h1>
            Experience Page <span>Timeline & Details</span>
          </h1>
          <p>
            Complete management of your professional career journey: add, edit, update and delete work experiences, hero workspace photo, statistics and development environments.
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
            href="/experience"
            target="_blank"
            rel="noreferrer"
            className="admin-btn admin-btn-secondary"
          >
            <FiEye />
            <span>View Live Experience</span>
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
      <div className="exp-section-tabs">
        <button
          type="button"
          className={`section-tab-btn ${activeTab === 'timeline' ? 'active' : ''}`}
          onClick={() => setActiveTab('timeline')}
        >
          <FiBriefcase />
          <span>1. Work Experience Timeline ({data.timeline?.items?.length || 0})</span>
        </button>

        <button
          type="button"
          className={`section-tab-btn ${activeTab === 'hero' ? 'active' : ''}`}
          onClick={() => setActiveTab('hero')}
        >
          <FiImage />
          <span>2. Hero Section & Workspace Photo</span>
        </button>

        <button
          type="button"
          className={`section-tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          <FiLayers />
          <span>3. Stats & Environments</span>
        </button>
      </div>

      {/* =========================================================
          TAB 1: WORK EXPERIENCE TIMELINE (ADD/EDIT/UPDATE/DELETE)
      ========================================================== */}
      {activeTab === 'timeline' && (
        <div className="exp-admin-layout">
          <div className="admin-card-box exp-form-panel">
            <div className="panel-title">
              <FiBriefcase className="panel-title-icon" />
              <h2>Timeline Headings</h2>
            </div>

            <div className="two-col-inputs">
              <div className="admin-input-group">
                <label>Section Eyebrow</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.timeline?.eyebrow || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      timeline: { ...data.timeline, eyebrow: e.target.value },
                    })
                  }
                  placeholder="e.g. MY PROFESSIONAL JOURNEY"
                />
              </div>

              <div className="admin-input-group">
                <label>Main Section Heading</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.timeline?.heading || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      timeline: { ...data.timeline, heading: e.target.value },
                    })
                  }
                  placeholder="e.g. Work Experience Timeline"
                />
              </div>
            </div>

            {/* ADD EXPERIENCE BUTTON & FORM */}
            <div
              className="panel-title"
              style={{
                marginTop: '24px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiBriefcase className="panel-title-icon" />
                <h2>Career Entries ({data.timeline?.items?.length || 0})</h2>
              </div>

              <button
                type="button"
                className="admin-btn admin-btn-primary"
                style={{ padding: '6px 14px', fontSize: '12px' }}
                onClick={() => setShowAddItem(!showAddItem)}
              >
                <FiPlus />
                {showAddItem ? 'Cancel' : 'Add Experience'}
              </button>
            </div>

            {/* ADD NEW EXPERIENCE FORM */}
            {showAddItem && (
              <form onSubmit={handleAddItem} className="new-exp-card-box">
                <h4>Add New Experience Position</h4>

                <div className="two-col-inputs">
                  <div className="admin-input-group">
                    <label>Role / Position Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Full Stack Developer"
                      value={newItem.role}
                      onChange={(e) =>
                        setNewItem({ ...newItem, role: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="admin-input-group">
                    <label>Company / Organization</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Google, Wipro, TCS..."
                      value={newItem.company}
                      onChange={(e) =>
                        setNewItem({ ...newItem, company: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="three-col-inputs">
                  <div className="admin-input-group">
                    <label>Duration / Period</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Mar 2024 – Present"
                      value={newItem.period}
                      onChange={(e) =>
                        setNewItem({ ...newItem, period: e.target.value })
                      }
                    />
                  </div>

                  <div className="admin-input-group">
                    <label>Location</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Gurugram, Haryana / Remote"
                      value={newItem.location}
                      onChange={(e) =>
                        setNewItem({ ...newItem, location: e.target.value })
                      }
                    />
                  </div>

                  <div className="admin-input-group">
                    <label>Employment Type / Badge</label>
                    <select
                      className="admin-select"
                      value={newItem.type}
                      onChange={(e) =>
                        setNewItem({ ...newItem, type: e.target.value })
                      }
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Education">Education</option>
                    </select>
                  </div>
                </div>

                <div className="admin-input-group">
                  <label>Description & Responsibilities</label>
                  <textarea
                    className="admin-textarea"
                    style={{ minHeight: '80px' }}
                    placeholder="Describe your role, projects handled, accomplishments..."
                    value={newItem.description}
                    onChange={(e) =>
                      setNewItem({ ...newItem, description: e.target.value })
                    }
                  />
                </div>

                <div className="admin-input-group">
                  <label>Technologies Used (comma separated)</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. Java, Spring Boot, React, MySQL"
                    value={newItem.technologies}
                    onChange={(e) =>
                      setNewItem({ ...newItem, technologies: e.target.value })
                    }
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                  <button type="submit" className="admin-btn admin-btn-primary">
                    <FiPlus /> Add to Experience Timeline
                  </button>
                  <button
                    type="button"
                    className="admin-btn admin-btn-secondary"
                    onClick={() => setShowAddItem(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* LIST OF TIMELINE ITEMS */}
            <div className="exp-items-editor-list">
              {data.timeline?.items?.map((item, idx) => (
                <div className="exp-item-editor-card" key={idx}>
                  <div className="exp-item-header">
                    <div className="exp-header-left">
                      <span className="exp-idx-pill">#{idx + 1}</span>
                      <span className="exp-type-badge">{item.type}</span>
                      <strong className="exp-title-bold">{item.role}</strong>
                      <span className="exp-company-sub">@ {item.company}</span>
                    </div>

                    <div className="exp-header-right">
                      <span className="exp-period-pill">{item.period}</span>
                      <button
                        type="button"
                        className="milestone-delete-btn"
                        onClick={() => handleDeleteItem(idx)}
                        title="Delete Experience"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>

                  <div className="two-col-inputs" style={{ marginTop: '14px' }}>
                    <div className="admin-input-group">
                      <label>Role / Position</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={item.role || ''}
                        onChange={(e) => handleUpdateItem(idx, 'role', e.target.value)}
                      />
                    </div>

                    <div className="admin-input-group">
                      <label>Company / Organization</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={item.company || ''}
                        onChange={(e) => handleUpdateItem(idx, 'company', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="three-col-inputs">
                    <div className="admin-input-group">
                      <label>Period / Duration</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={item.period || ''}
                        onChange={(e) => handleUpdateItem(idx, 'period', e.target.value)}
                      />
                    </div>

                    <div className="admin-input-group">
                      <label>Location</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={item.location || ''}
                        onChange={(e) => handleUpdateItem(idx, 'location', e.target.value)}
                      />
                    </div>

                    <div className="admin-input-group">
                      <label>Type / Category Badge</label>
                      <select
                        className="admin-select"
                        value={item.type || 'Full-time'}
                        onChange={(e) => handleUpdateItem(idx, 'type', e.target.value)}
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Education">Education</option>
                      </select>
                    </div>
                  </div>

                  <div className="admin-input-group">
                    <label>Description</label>
                    <textarea
                      className="admin-textarea"
                      style={{ minHeight: '65px' }}
                      value={item.description || ''}
                      onChange={(e) => handleUpdateItem(idx, 'description', e.target.value)}
                    />
                  </div>

                  <div className="two-col-inputs">
                    <div className="admin-input-group">
                      <label>Technologies (comma separated)</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={
                          Array.isArray(item.technologies)
                            ? item.technologies.join(', ')
                            : item.technologies || ''
                        }
                        onChange={(e) => handleUpdateItem(idx, 'technologies', e.target.value)}
                      />
                    </div>

                    <div className="admin-input-group">
                      <label>Upload Company / Role Image (from device)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleItemImageUpload(idx, e.target.files?.[0])}
                      />
                      {item.image && (
                        <div style={{ marginTop: '6px' }}>
                          <img
                            src={item.image}
                            alt="Logo"
                            style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }}
                          />
                        </div>
                      )}
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
                {saving ? 'Saving...' : 'Save Experience Timeline'}
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

          {/* REAL-TIME PREVIEW OF TIMELINE */}
          <div className="exp-preview-wrapper">
            <div className="preview-header">
              <div className="preview-label">
                <span className="live-dot" />
                TIMELINE PREVIEW
              </div>
              <span className="preview-sub">Real-Time Sync</span>
            </div>

            <div className="admin-card-box hero-preview-card">
              <div className="preview-badge">
                <span>{data.timeline?.eyebrow}</span>
              </div>

              <h2 className="preview-hero-title">{data.timeline?.heading}</h2>

              <div className="preview-timeline-stack">
                {data.timeline?.items?.map((item, i) => (
                  <div className="preview-exp-card" key={i}>
                    <div className="preview-card-top">
                      <div>
                        <span className="preview-mini-badge">{item.type}</span>
                        <h4>{item.role}</h4>
                        <strong className="preview-company-name">
                          {item.company}
                        </strong>
                      </div>
                      <span className="preview-time-tag">{item.period}</span>
                    </div>

                    <p className="preview-exp-desc">{item.description}</p>

                    {item.technologies && item.technologies.length > 0 && (
                      <div className="preview-tech-chips">
                        {item.technologies.map((t) => (
                          <span className="preview-mini-chip" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: HERO SECTION & WORKSPACE PHOTO
      ========================================================== */}
      {activeTab === 'hero' && (
        <div className="exp-admin-layout">
          <div className="admin-card-box exp-form-panel">
            {/* HERO PHOTO CONTROLS */}
            <div className="admin-image-manager-card">
              <div className="img-manager-head">
                <FiImage className="img-mgr-icon" />
                <div>
                  <h3>Experience Page Workspace Photo</h3>
                  <small>Upload workspace/developer setup photo directly from device</small>
                </div>
              </div>

              <div className="img-manager-body">
                <div className="current-image-preview">
                  {data.hero?.image ? (
                    <img src={data.hero.image} alt="Workspace Preview" />
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
                    ref={heroImageInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleHeroImageUpload}
                  />

                  <button
                    type="button"
                    className="admin-btn admin-btn-primary img-action-btn"
                    onClick={() => heroImageInputRef.current?.click()}
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
                          hero: {
                            ...prev.hero,
                            image: '/assets/experience-preview.png',
                          },
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
              <FiBriefcase className="panel-title-icon" />
              <h2>Hero Headings & Bio</h2>
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
                  placeholder="e.g. MY EXPERIENCE"
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
                  placeholder="e.g. A Journey of"
                />
              </div>
            </div>

            <div className="admin-input-group">
              <label>Heading Highlight (Colored Words)</label>
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
                placeholder="e.g. Learning & Building"
              />
            </div>

            <div className="admin-input-group">
              <label>Hero Description</label>
              <textarea
                className="admin-textarea"
                style={{ minHeight: '90px' }}
                value={data.hero?.description || ''}
                onChange={(e) =>
                  setData({
                    ...data,
                    hero: { ...data.hero, description: e.target.value },
                  })
                }
              />
            </div>

            <div className="two-col-inputs">
              <div className="admin-input-group">
                <label>Resume Download URL</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero?.resumeLink || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, resumeLink: e.target.value },
                    })
                  }
                  placeholder="/resume.pdf"
                />
              </div>

              <div className="admin-input-group">
                <label>Contact Button URL</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero?.connectLink || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, connectLink: e.target.value },
                    })
                  }
                  placeholder="/contact"
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
                {saving ? 'Saving...' : 'Save Experience Hero'}
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
          <div className="exp-preview-wrapper">
            <div className="preview-header">
              <div className="preview-label">
                <span className="live-dot" />
                HERO PREVIEW
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
                <span className="accent-span">{data.hero?.headingHighlight}</span>
              </h1>

              <p className="preview-hero-desc">{data.hero?.description}</p>

              <div className="preview-image-box">
                {data.hero?.image ? (
                  <img src={data.hero.image} alt="Workspace Preview" />
                ) : (
                  <div className="preview-no-img">No Image</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: 4 STATS & TOOLS / ENVIRONMENTS
      ========================================================== */}
      {activeTab === 'stats' && (
        <div className="exp-admin-layout">
          <div className="admin-card-box exp-form-panel">
            {/* STATS SECTION */}
            <div className="panel-title">
              <FiLayers className="panel-title-icon" />
              <h2>Experience Page 4 Key Statistics</h2>
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

            {/* TOOLS & ENVIRONMENTS */}
            <div className="panel-title" style={{ marginTop: '28px' }}>
              <FiTool className="panel-title-icon" />
              <h2>Tools & Environments List</h2>
            </div>

            <div className="admin-input-group">
              <label>Section Heading</label>
              <input
                type="text"
                className="admin-input"
                value={data.tools?.heading || ''}
                onChange={(e) =>
                  setData({
                    ...data,
                    tools: { ...data.tools, heading: e.target.value },
                  })
                }
              />
            </div>

            {/* ADD TOOL FORM */}
            <form onSubmit={handleAddTool} className="add-tool-form">
              <input
                type="text"
                className="admin-input"
                placeholder="Enter tool or OS (e.g. Linux, Docker, Postman)..."
                value={newTool}
                onChange={(e) => setNewTool(e.target.value)}
              />
              <button type="submit" className="admin-btn admin-btn-primary">
                <FiPlus /> Add Environment
              </button>
            </form>

            {/* TOOLS CHIPS */}
            <div className="tools-chips-container">
              {data.tools?.list?.map((tool) => (
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

            <div className="form-action-row" style={{ marginTop: '24px' }}>
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={handleSave}
                disabled={saving}
              >
                <FiSave />
                {saving ? 'Saving...' : 'Save Stats & Environments'}
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

          {/* REAL-TIME PREVIEW OF STATS & TOOLS */}
          <div className="exp-preview-wrapper">
            <div className="preview-header">
              <div className="preview-label">
                <span className="live-dot" />
                STATS & TOOLS PREVIEW
              </div>
              <span className="preview-sub">Real-Time Sync</span>
            </div>

            <div className="admin-card-box hero-preview-card">
              <h2 className="preview-hero-title">{data.tools?.heading}</h2>

              <div className="preview-stats-bar" style={{ marginBottom: '20px' }}>
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

              <div className="preview-toolkit-tags">
                {data.tools?.list?.map((t) => (
                  <span className="preview-tag-pill" key={t}>
                    <FiCode /> {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
