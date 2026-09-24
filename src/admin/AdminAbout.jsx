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
  FiUser,
  FiBookOpen,
  FiMapPin,
  FiMail,
  FiGlobe,
  FiPlus,
  FiCalendar,
  FiLayers,
  FiZap,
} from 'react-icons/fi';
import { portfolioApi } from '../lib/api';
import './AdminAbout.css';

const defaultAboutData = {
  hero: {
    eyebrow: 'ABOUT ME',
    heading: 'Get To Know',
    headingHighlight: 'Me Better',
    description:
      "I'm Ishwar Sharma, a Full Stack Developer who loves building modern web applications, solving real-world problems, learning new technologies, and turning ideas into useful digital products.",
    resumeLink: '/resume.pdf',
    contactLink: '/contact',
    image: '/assets/ishwar-profile.jpg',
    stat1Value: '2+',
    stat1Label: 'Years Experience',
    stat2Value: '10+',
    stat2Label: 'Projects Completed',
    stat3Value: 'MCA',
    stat3Label: 'MDU Rohtak',
    stat4Value: 'Rohtak',
    stat4Label: 'Haryana, India',
  },
  story: {
    eyebrow: 'MY STORY',
    heading: 'From Curiosity',
    headingHighlight: 'to Code',
    paragraph1:
      'I started my journey with a curiosity about how websites work, and that curiosity turned into a passion for development. Over time, I have worked on multiple projects, learned modern technologies, and gained hands-on experience in building real-world applications.',
    paragraph2:
      'I believe in continuous learning and always try to improve my skills, explore new tools, and take on challenging projects that create value.',
    name: 'Ishwar Sharma',
    email: 'ishwarweb@gmail.com',
    location: 'Rohtak, Haryana',
    education: 'MCA – MDU Rohtak',
    languages: 'English, Hindi',
    image: '/assets/about-preview.png',
  },
  journey: {
    eyebrow: 'MY JOURNEY',
    heading: 'Education & Experience',
    milestones: [
      {
        title: 'BCA – MDU Rohtak',
        period: '2019 – 2022',
        description: "Bachelor's in Computer Applications.",
      },
      {
        title: 'MCA – MDU Rohtak',
        period: '2022 – 2024',
        description: "Master's in Computer Applications.",
      },
      {
        title: 'Full Stack Developer (Intern)',
        period: 'Sep 2023 – Feb 2024',
        description: 'Java, Spring Boot, React and real-world projects.',
      },
      {
        title: 'Technical Supervisor',
        period: 'Wipro',
        description: 'Technical operations, monitoring and troubleshooting.',
      },
    ],
  },
};

export default function AdminAbout() {
  const [activeTab, setActiveTab] = useState('hero'); // 'hero' | 'story' | 'journey'
  const [data, setData] = useState(() => {
    const cached = localStorage.getItem('ishwar_about_content');
    return cached ? JSON.parse(cached) : defaultAboutData;
  });

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const heroImageInputRef = useRef(null);
  const storyImageInputRef = useRef(null);

  // New milestone draft state
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    period: '',
    description: '',
  });
  const [showAddMilestone, setShowAddMilestone] = useState(false);

  // Fetch current about data from MongoDB
  useEffect(() => {
    portfolioApi
      .getAbout()
      .then((res) => {
        if (res && res.data && res.data.hero) {
          setData(res.data);
          localStorage.setItem('ishwar_about_content', JSON.stringify(res.data));
        }
      })
      .catch(() => {});
  }, []);

  // Save to MongoDB & localStorage
  const handleSave = async () => {
    setSaving(true);
    try {
      localStorage.setItem('ishwar_about_content', JSON.stringify(data));
      await portfolioApi.saveAbout(data);
      setToast('About page content & images saved successfully to MongoDB!');
    } catch (err) {
      console.warn('Backend save notice:', err.message);
      setToast('About content saved to local storage!');
    } finally {
      setSaving(false);
      setTimeout(() => setToast(''), 4000);
    }
  };

  const handleReset = () => {
    if (!window.confirm('Reset all About page settings to default?')) return;
    setData(defaultAboutData);
    localStorage.removeItem('ishwar_about_content');
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
      setToast('Hero portrait uploaded! Click "Save Changes" to store.');
      setTimeout(() => setToast(''), 3000);
    };
    reader.readAsDataURL(file);
  };

  // Direct File Upload for Story Workspace Image
  const handleStoryImageUpload = (e) => {
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
        story: { ...prev.story, image: event.target.result },
      }));
      setToast('Workspace image uploaded! Click "Save Changes" to store.');
      setTimeout(() => setToast(''), 3000);
    };
    reader.readAsDataURL(file);
  };

  // Milestone management
  const handleAddMilestone = () => {
    if (!newMilestone.title.trim()) {
      alert('Please enter a milestone title.');
      return;
    }

    setData((prev) => ({
      ...prev,
      journey: {
        ...prev.journey,
        milestones: [...(prev.journey.milestones || []), { ...newMilestone }],
      },
    }));

    setNewMilestone({ title: '', period: '', description: '' });
    setShowAddMilestone(false);
    setToast('Milestone added! Remember to save changes.');
    setTimeout(() => setToast(''), 3000);
  };

  const handleUpdateMilestone = (index, field, value) => {
    setData((prev) => {
      const updated = [...(prev.journey.milestones || [])];
      updated[index] = { ...updated[index], [field]: value };
      return {
        ...prev,
        journey: {
          ...prev.journey,
          milestones: updated,
        },
      };
    });
  };

  const handleDeleteMilestone = (index) => {
    if (!window.confirm('Are you sure you want to delete this milestone?')) return;
    setData((prev) => {
      const updated = [...(prev.journey.milestones || [])];
      updated.splice(index, 1);
      return {
        ...prev,
        journey: {
          ...prev.journey,
          milestones: updated,
        },
      };
    });
  };

  return (
    <section className="about-admin-page">
      {/* Header */}
      <div className="admin-header-box">
        <div>
          <div className="header-eyebrow">
            <span></span>
            ABOUT PAGE BUILDER
          </div>
          <h1>
            About Page <span>Content & Images</span>
          </h1>
          <p>
            Manage "Get To Know Me Better", "My Story", personal info grid, and "My Journey" timeline with direct image uploads and MongoDB storage.
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
            href="/about"
            target="_blank"
            rel="noreferrer"
            className="admin-btn admin-btn-secondary"
          >
            <FiEye />
            <span>View Live About</span>
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
      <div className="about-section-tabs">
        <button
          type="button"
          className={`section-tab-btn ${activeTab === 'hero' ? 'active' : ''}`}
          onClick={() => setActiveTab('hero')}
        >
          <FiUser />
          <span>1. Get To Know (Hero & Photo)</span>
        </button>

        <button
          type="button"
          className={`section-tab-btn ${activeTab === 'story' ? 'active' : ''}`}
          onClick={() => setActiveTab('story')}
        >
          <FiBookOpen />
          <span>2. My Story & Details</span>
        </button>

        <button
          type="button"
          className={`section-tab-btn ${activeTab === 'journey' ? 'active' : ''}`}
          onClick={() => setActiveTab('journey')}
        >
          <FiCalendar />
          <span>3. My Journey (Timeline)</span>
        </button>
      </div>

      {/* =========================================================
          TAB 1: HERO SECTION & RIGHT PHOTO & 4 STATS
      ========================================================== */}
      {activeTab === 'hero' && (
        <div className="about-admin-layout">
          <div className="admin-card-box about-form-panel">
            {/* HERO PHOTO CONTROLS */}
            <div className="admin-image-manager-card">
              <div className="img-manager-head">
                <FiImage className="img-mgr-icon" />
                <div>
                  <h3>About Page Portrait Photo</h3>
                  <small>Upload your portrait directly from device (accepts PNG, JPG, WEBP)</small>
                </div>
              </div>

              <div className="img-manager-body">
                <div className="current-image-preview">
                  {data.hero?.image ? (
                    <img src={data.hero.image} alt="About Hero Portrait" />
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
              <FiUser className="panel-title-icon" />
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
                  placeholder="e.g. ABOUT ME"
                />
              </div>

              <div className="admin-input-group">
                <label>Heading Line 1</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero?.heading || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, heading: e.target.value },
                    })
                  }
                  placeholder="e.g. Get To Know"
                />
              </div>
            </div>

            <div className="admin-input-group">
              <label>Heading Highlight (Line 2 / Colored Words)</label>
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
                placeholder="e.g. Me Better"
              />
            </div>

            <div className="admin-input-group">
              <label>Hero Description</label>
              <textarea
                className="admin-textarea"
                style={{ minHeight: '100px' }}
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
                  value={data.hero?.contactLink || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, contactLink: e.target.value },
                    })
                  }
                  placeholder="/contact"
                />
              </div>
            </div>

            {/* 4 STAT CHIPS */}
            <div className="panel-title" style={{ marginTop: '20px' }}>
              <FiLayers className="panel-title-icon" />
              <h2>Right Image 4 Statistics / Highlights</h2>
            </div>

            <div className="two-col-inputs">
              <div className="stat-edit-box">
                <label>Stat 1 Value</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero?.stat1Value || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, stat1Value: e.target.value },
                    })
                  }
                />
                <label>Stat 1 Label</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero?.stat1Label || ''}
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
                  value={data.hero?.stat2Value || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, stat2Value: e.target.value },
                    })
                  }
                />
                <label>Stat 2 Label</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero?.stat2Label || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, stat2Label: e.target.value },
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
                  value={data.hero?.stat3Value || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, stat3Value: e.target.value },
                    })
                  }
                />
                <label>Stat 3 Label</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero?.stat3Label || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, stat3Label: e.target.value },
                    })
                  }
                />
              </div>

              <div className="stat-edit-box">
                <label>Stat 4 Value</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero?.stat4Value || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, stat4Value: e.target.value },
                    })
                  }
                />
                <label>Stat 4 Label</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.hero?.stat4Label || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, stat4Label: e.target.value },
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
                {saving ? 'Saving...' : 'Save About Hero Content'}
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
          <div className="about-preview-wrapper">
            <div className="preview-header">
              <div className="preview-label">
                <span className="live-dot" />
                ABOUT HERO PREVIEW
              </div>
              <span className="preview-sub">Real-Time Sync</span>
            </div>

            <div className="admin-card-box hero-preview-card">
              <div className="preview-badge">
                <span>{data.hero?.eyebrow}</span>
              </div>

              <h1 className="preview-hero-title">
                {data.hero?.heading}
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

              <div className="preview-stats-bar">
                <div className="preview-stat-item">
                  <strong>{data.hero?.stat1Value}</strong>
                  <span>{data.hero?.stat1Label}</span>
                </div>
                <div className="stat-separator"></div>
                <div className="preview-stat-item">
                  <strong>{data.hero?.stat2Value}</strong>
                  <span>{data.hero?.stat2Label}</span>
                </div>
                <div className="stat-separator"></div>
                <div className="preview-stat-item">
                  <strong>{data.hero?.stat3Value}</strong>
                  <span>{data.hero?.stat3Label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: MY STORY SECTION & WORKSPACE IMAGE & DETAILS
      ========================================================== */}
      {activeTab === 'story' && (
        <div className="about-admin-layout">
          <div className="admin-card-box about-form-panel">
            {/* WORKSPACE PHOTO CONTROLS */}
            <div className="admin-image-manager-card">
              <div className="img-manager-head">
                <FiImage className="img-mgr-icon" />
                <div>
                  <h3>Story Section Workspace Photo</h3>
                  <small>Upload workspace/setup photo directly from device</small>
                </div>
              </div>

              <div className="img-manager-body">
                <div className="current-image-preview">
                  {data.story?.image ? (
                    <img src={data.story.image} alt="Workspace Preview" />
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
                    ref={storyImageInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleStoryImageUpload}
                  />

                  <button
                    type="button"
                    className="admin-btn admin-btn-primary img-action-btn"
                    onClick={() => storyImageInputRef.current?.click()}
                  >
                    <FiUploadCloud />
                    Upload Workspace Photo
                  </button>

                  <div className="img-quick-buttons">
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary"
                      onClick={() =>
                        setData((prev) => ({
                          ...prev,
                          story: { ...prev.story, image: '/assets/about-preview.png' },
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
                          story: { ...prev.story, image: '' },
                        }))
                      }
                    >
                      <FiTrash2 /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* HEADINGS & PARAGRAPHS */}
            <div className="panel-title" style={{ marginTop: '24px' }}>
              <FiBookOpen className="panel-title-icon" />
              <h2>Story Headings & Narrative</h2>
            </div>

            <div className="two-col-inputs">
              <div className="admin-input-group">
                <label>Story Eyebrow</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.story?.eyebrow || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      story: { ...data.story, eyebrow: e.target.value },
                    })
                  }
                  placeholder="MY STORY"
                />
              </div>

              <div className="admin-input-group">
                <label>Main Heading</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.story?.heading || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      story: { ...data.story, heading: e.target.value },
                    })
                  }
                  placeholder="From Curiosity"
                />
              </div>
            </div>

            <div className="admin-input-group">
              <label>Heading Highlight (Colored Line)</label>
              <input
                type="text"
                className="admin-input"
                value={data.story?.headingHighlight || ''}
                onChange={(e) =>
                  setData({
                    ...data,
                    story: { ...data.story, headingHighlight: e.target.value },
                  })
                }
                placeholder="to Code"
              />
            </div>

            <div className="admin-input-group">
              <label>Story Paragraph 1</label>
              <textarea
                className="admin-textarea"
                style={{ minHeight: '90px' }}
                value={data.story?.paragraph1 || ''}
                onChange={(e) =>
                  setData({
                    ...data,
                    story: { ...data.story, paragraph1: e.target.value },
                  })
                }
              />
            </div>

            <div className="admin-input-group">
              <label>Story Paragraph 2</label>
              <textarea
                className="admin-textarea"
                style={{ minHeight: '80px' }}
                value={data.story?.paragraph2 || ''}
                onChange={(e) =>
                  setData({
                    ...data,
                    story: { ...data.story, paragraph2: e.target.value },
                  })
                }
              />
            </div>

            {/* DETAILS GRID */}
            <div className="panel-title" style={{ marginTop: '20px' }}>
              <FiUser className="panel-title-icon" />
              <h2>Personal Information & Details</h2>
            </div>

            <div className="two-col-inputs">
              <div className="admin-input-group">
                <label>
                  <FiUser /> Full Name
                </label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.story?.name || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      story: { ...data.story, name: e.target.value },
                    })
                  }
                />
              </div>

              <div className="admin-input-group">
                <label>
                  <FiMail /> Contact Email
                </label>
                <input
                  type="email"
                  className="admin-input"
                  value={data.story?.email || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      story: { ...data.story, email: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div className="three-col-inputs">
              <div className="admin-input-group">
                <label>
                  <FiMapPin /> Location
                </label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.story?.location || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      story: { ...data.story, location: e.target.value },
                    })
                  }
                />
              </div>

              <div className="admin-input-group">
                <label>
                  <FiBookOpen /> Education
                </label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.story?.education || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      story: { ...data.story, education: e.target.value },
                    })
                  }
                />
              </div>

              <div className="admin-input-group">
                <label>
                  <FiGlobe /> Languages
                </label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.story?.languages || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      story: { ...data.story, languages: e.target.value },
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
                {saving ? 'Saving...' : 'Save My Story'}
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

          {/* REAL-TIME PREVIEW OF STORY */}
          <div className="about-preview-wrapper">
            <div className="preview-header">
              <div className="preview-label">
                <span className="live-dot" />
                MY STORY PREVIEW
              </div>
              <span className="preview-sub">Real-Time Sync</span>
            </div>

            <div className="admin-card-box hero-preview-card">
              <div className="preview-badge">
                <span>{data.story?.eyebrow}</span>
              </div>

              <h2 className="preview-hero-title">
                {data.story?.heading}
                <br />
                <span className="accent-span">{data.story?.headingHighlight}</span>
              </h2>

              <p className="preview-hero-desc">{data.story?.paragraph1}</p>
              <p className="preview-hero-desc">{data.story?.paragraph2}</p>

              <div className="preview-mini-pills">
                <div className="preview-mini-item">
                  <small>NAME</small>
                  <strong>{data.story?.name}</strong>
                </div>
                <div className="preview-mini-item">
                  <small>EMAIL</small>
                  <strong>{data.story?.email}</strong>
                </div>
                <div className="preview-mini-item">
                  <small>LOCATION</small>
                  <strong>{data.story?.location}</strong>
                </div>
                <div className="preview-mini-item">
                  <small>EDUCATION</small>
                  <strong>{data.story?.education}</strong>
                </div>
                <div className="preview-mini-item">
                  <small>LANGUAGES</small>
                  <strong>{data.story?.languages}</strong>
                </div>
              </div>

              <div className="preview-image-box" style={{ marginTop: '16px' }}>
                {data.story?.image ? (
                  <img src={data.story.image} alt="Workspace" />
                ) : (
                  <div className="preview-no-img">No Workspace Image</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: MY JOURNEY (EDUCATION & EXPERIENCE TIMELINE)
      ========================================================== */}
      {activeTab === 'journey' && (
        <div className="about-admin-layout">
          <div className="admin-card-box about-form-panel">
            <div className="panel-title">
              <FiCalendar className="panel-title-icon" />
              <h2>Journey Section Headings</h2>
            </div>

            <div className="two-col-inputs">
              <div className="admin-input-group">
                <label>Journey Eyebrow</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.journey?.eyebrow || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      journey: { ...data.journey, eyebrow: e.target.value },
                    })
                  }
                  placeholder="MY JOURNEY"
                />
              </div>

              <div className="admin-input-group">
                <label>Main Heading</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.journey?.heading || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      journey: { ...data.journey, heading: e.target.value },
                    })
                  }
                  placeholder="Education & Experience"
                />
              </div>
            </div>

            {/* MILESTONES LIST */}
            <div
              className="panel-title"
              style={{
                marginTop: '24px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiLayers className="panel-title-icon" />
                <h2>Milestones & Timeline Items ({data.journey?.milestones?.length || 0})</h2>
              </div>

              <button
                type="button"
                className="admin-btn admin-btn-primary"
                style={{ padding: '6px 14px', fontSize: '12px' }}
                onClick={() => setShowAddMilestone(!showAddMilestone)}
              >
                <FiPlus />
                {showAddMilestone ? 'Cancel' : 'Add Milestone'}
              </button>
            </div>

            {/* ADD MILESTONE FORM */}
            {showAddMilestone && (
              <div className="new-milestone-box">
                <h4>Add New Milestone</h4>
                <div className="two-col-inputs">
                  <div className="admin-input-group">
                    <label>Title / Degree / Role</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Full Stack Developer (Intern)"
                      value={newMilestone.title}
                      onChange={(e) =>
                        setNewMilestone({ ...newMilestone, title: e.target.value })
                      }
                    />
                  </div>

                  <div className="admin-input-group">
                    <label>Period / Year / Institution</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Sep 2023 – Feb 2024 or Wipro"
                      value={newMilestone.period}
                      onChange={(e) =>
                        setNewMilestone({ ...newMilestone, period: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="admin-input-group">
                  <label>Description / Details</label>
                  <textarea
                    className="admin-textarea"
                    style={{ minHeight: '70px' }}
                    placeholder="Brief description of skills, role or achievements..."
                    value={newMilestone.description}
                    onChange={(e) =>
                      setNewMilestone({
                        ...newMilestone,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                  <button
                    type="button"
                    className="admin-btn admin-btn-primary"
                    onClick={handleAddMilestone}
                  >
                    <FiPlus /> Add to Journey
                  </button>
                  <button
                    type="button"
                    className="admin-btn admin-btn-secondary"
                    onClick={() => setShowAddMilestone(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* EXISTING MILESTONES LIST */}
            <div className="milestones-editor-list">
              {data.journey?.milestones?.map((milestone, idx) => (
                <div className="milestone-editor-card" key={idx}>
                  <div className="milestone-card-top">
                    <span className="milestone-card-idx">#{idx + 1}</span>
                    <button
                      type="button"
                      className="milestone-delete-btn"
                      onClick={() => handleDeleteMilestone(idx)}
                      title="Delete Milestone"
                    >
                      <FiTrash2 />
                    </button>
                  </div>

                  <div className="two-col-inputs">
                    <div className="admin-input-group">
                      <label>Title / Degree / Role</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={milestone.title || ''}
                        onChange={(e) =>
                          handleUpdateMilestone(idx, 'title', e.target.value)
                        }
                      />
                    </div>

                    <div className="admin-input-group">
                      <label>Period / Institution</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={milestone.period || ''}
                        onChange={(e) =>
                          handleUpdateMilestone(idx, 'period', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="admin-input-group">
                    <label>Description</label>
                    <textarea
                      className="admin-textarea"
                      style={{ minHeight: '60px' }}
                      value={milestone.description || ''}
                      onChange={(e) =>
                        handleUpdateMilestone(idx, 'description', e.target.value)
                      }
                    />
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
                {saving ? 'Saving...' : 'Save Journey Timeline'}
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

          {/* REAL-TIME PREVIEW OF JOURNEY */}
          <div className="about-preview-wrapper">
            <div className="preview-header">
              <div className="preview-label">
                <span className="live-dot" />
                JOURNEY TIMELINE PREVIEW
              </div>
              <span className="preview-sub">Real-Time Sync</span>
            </div>

            <div className="admin-card-box hero-preview-card">
              <div className="preview-badge">
                <span>{data.journey?.eyebrow}</span>
              </div>

              <h2 className="preview-hero-title">{data.journey?.heading}</h2>

              <div className="preview-journey-timeline">
                {data.journey?.milestones?.map((item, i) => (
                  <div className="preview-journey-node" key={i}>
                    <span className="journey-node-dot"></span>
                    <div className="journey-node-content">
                      <strong>{item.title}</strong>
                      <small>{item.period}</small>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
