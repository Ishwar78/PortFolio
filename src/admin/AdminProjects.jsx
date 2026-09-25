import React, { useState, useEffect, useMemo } from 'react';
import {
  FiPlus,
  FiTrash2,
  FiExternalLink,
  FiGithub,
  FiSearch,
  FiFolder,
  FiCheckCircle,
  FiX,
  FiEdit,
  FiUploadCloud,
  FiLayers,
  FiCalendar,
  FiUser,
  FiList,
  FiEye,
  FiClock,
} from 'react-icons/fi';
import { portfolioApi } from '../lib/api';
import RichTextEditor from '../components/RichTextEditor';
import './AdminProjects.css';

const defaultProjects = [
  {
    slug: 'teamtrack',
    title: 'TeamTrack — Employee Activity Monitoring Platform',
    desc: 'A full-stack employee activity monitoring platform designed to help teams track work activity through screenshots and activity data. The platform provides a centralized interface for monitoring team members, reviewing activity records and managing workforce productivity.',
    overview:
      '<h2>Enterprise Workforce Intelligence</h2><p>TeamTrack is an enterprise-grade employee activity and productivity tracking system. It enables organizations to monitor real-time active sessions, track periodic desktop screenshots, review active vs. idle hours, and analyze aggregate workforce metrics through an intuitive dashboard.</p>',
    category: 'Full Stack',
    tags: ['React', 'Spring Boot', 'MySQL', 'Activity Monitoring', 'REST API'],
    img: '/assets/projects-preview.png',
    gallery: ['/assets/projects-preview.png', '/assets/project-detail-preview.png'],
    liveUrl: 'https://multiclout.in/',
    githubUrl: 'https://github.com/Ishwar78',
    status: 'Live & Operational',
    duration: '4+ Months',
    role: 'Lead Developer',
    features: [
      { title: 'Automated Screenshots', desc: 'Secure periodic desktop captures stored with encrypted timestamps.' },
      { title: 'Activity Analysis', desc: 'Calculates active versus idle duration and productivity ratios.' },
      { title: 'Team Management', desc: 'Role-based access control for team leads, admins, and members.' },
      { title: 'Real-time Metrics', desc: 'Live employee status indicators and daily summary breakdowns.' },
    ],
    challenges: [
      'Handling high-volume desktop screenshot uploads without server bottlenecks.',
      'Distinguishing active keyboard/mouse events from system idle states accurately.',
    ],
    solutions: [
      'Implemented chunked image compression and asynchronous cloud storage pipelines.',
      'Designed lightweight background heartbeat listeners with configurable idle thresholds.',
    ],
    techStack: 'React · Spring Boot · Java · MySQL · REST APIs',
    learned: 'Mastered high-concurrency background data processing and role-based security.',
  },
  {
    slug: 'thekissancity',
    title: 'TheKissanCity — E-Commerce Shopping Platform',
    desc: 'A complete full-stack e-commerce platform featuring product browsing, categories, shopping cart, customer checkout and payment integration. The system also includes administrative functionality for managing products, inventory and online orders.',
    overview:
      '<h2>Direct Farmer-to-Consumer Commerce</h2><p>TheKissanCity is an agricultural and consumer-focused e-commerce marketplace empowering direct trade between rural producers and urban buyers. Built with high performance and smooth checkout flows in mind, it handles product cataloging, order fulfillment, and multi-channel payment gateways.</p>',
    category: 'Web Apps',
    tags: ['React', 'Node.js', 'MongoDB', 'E-Commerce', 'Payment Integration'],
    img: '/assets/project-detail-preview.png',
    gallery: ['/assets/project-detail-preview.png', '/assets/skills-preview.png'],
    liveUrl: 'https://thekissancity.com/',
    githubUrl: 'https://github.com/Ishwar78',
    status: 'Live & In Production',
    duration: '5+ Months',
    role: 'Full Stack Developer',
    features: [
      { title: 'Product Catalog', desc: 'Multi-category filtering, responsive search, and detailed product variants.' },
      { title: 'Smart Shopping Cart', desc: 'Persistent local and cloud-synced cart with dynamic discount calculations.' },
      { title: 'Payment Gateway', desc: 'Seamless integration with Razorpay/Stripe with webhook verification.' },
    ],
    challenges: [
      'Preventing race conditions during checkout for high-demand, limited-stock goods.',
      'Handling payment callback edge-cases and network timeouts cleanly.',
    ],
    solutions: [
      'Implemented MongoDB atomic update operations with optimistic locking on inventory decrement.',
      'Built a resilient idempotent webhook listener with auto-reconciliation for payments.',
    ],
    techStack: 'React · Node.js · Express · MongoDB · Razorpay',
    learned: 'Gained comprehensive experience in building transactional payment pipelines.',
  },
];

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState('basic'); // 'basic' | 'images' | 'details' | 'features'

  // Comprehensive Form State
  const initialFormState = {
    title: '',
    slug: '',
    desc: '',
    category: 'Full Stack',
    tags: 'React, Node.js, MongoDB',
    liveUrl: '',
    githubUrl: '',
    status: 'Completed',
    duration: '3+ Months',
    role: 'Full Stack Developer',
    img: '/assets/projects-preview.png',
    gallery: [],
    overview: '',
    techStack: 'React · Node.js · MongoDB · Express',
    learned: 'Gained rich experience in modular design, API integration, and full-stack deployment.',
    features: [
      { title: 'User Authentication', desc: 'Secure signup, login, session tokens, and protected customer profiles.' },
      { title: 'Core Functionality', desc: 'High performance backend workflows with responsive frontend interface.' },
    ],
    challenges: ['Managing complex application state and real-time validation across modules.'],
    solutions: ['Adopted modular architecture, reusable components, and robust error boundaries.'],
  };

  const [formData, setFormData] = useState(initialFormState);

  // Load from API / MongoDB
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await portfolioApi.getProjects();
      if (Array.isArray(data) && data.length > 0) {
        setProjects(data);
      } else {
        setProjects(defaultProjects);
      }
    } catch (err) {
      console.error('Failed to fetch projects, using fallback:', err);
      setProjects(defaultProjects);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData(initialFormState);
    setActiveTab('basic');
    setShowModal(true);
  };

  const openEditModal = (p) => {
    setIsEditing(true);
    setEditId(p._id || p.id || p.slug);
    setFormData({
      title: p.title || '',
      slug: p.slug || p.id || '',
      desc: p.desc || '',
      category: p.category || 'Full Stack',
      tags: Array.isArray(p.tags) ? p.tags.join(', ') : p.tags || '',
      liveUrl: p.liveUrl || '',
      githubUrl: p.githubUrl || '',
      status: p.status || 'Completed',
      duration: p.duration || '3+ Months',
      role: p.role || 'Full Stack Developer',
      img: p.img || '/assets/projects-preview.png',
      gallery: Array.isArray(p.gallery) ? p.gallery : [],
      overview: p.overview || '',
      techStack: p.techStack || (Array.isArray(p.tags) ? p.tags.join(' · ') : ''),
      learned: p.learned || '',
      features:
        Array.isArray(p.features) && p.features.length > 0
          ? p.features.map((f) => (Array.isArray(f) ? { title: f[0], desc: f[2] || f[1] } : f))
          : initialFormState.features,
      challenges: Array.isArray(p.challenges) && p.challenges.length > 0 ? p.challenges : initialFormState.challenges,
      solutions: Array.isArray(p.solutions) && p.solutions.length > 0 ? p.solutions : initialFormState.solutions,
    });
    setActiveTab('basic');
    setShowModal(true);
  };

  // Handle Cover Image File Upload -> Base64
  const handleCoverImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WEBP, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, img: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Handle Gallery Images Upload -> Multiple Base64
  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          gallery: [...prev.gallery, reader.result],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, idx) => idx !== index),
    }));
  };

  // Features list handlers
  const handleAddFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, { title: '', desc: '' }],
    }));
  };

  const handleUpdateFeature = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.features];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, features: updated };
    });
  };

  const handleRemoveFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, idx) => idx !== index),
    }));
  };

  // Challenges list handlers
  const handleAddChallenge = () => {
    setFormData((prev) => ({
      ...prev,
      challenges: [...prev.challenges, ''],
    }));
  };

  const handleUpdateChallenge = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.challenges];
      updated[index] = value;
      return { ...prev, challenges: updated };
    });
  };

  const handleRemoveChallenge = (index) => {
    setFormData((prev) => ({
      ...prev,
      challenges: prev.challenges.filter((_, idx) => idx !== index),
    }));
  };

  // Solutions list handlers
  const handleAddSolution = () => {
    setFormData((prev) => ({
      ...prev,
      solutions: [...prev.solutions, ''],
    }));
  };

  const handleUpdateSolution = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.solutions];
      updated[index] = value;
      return { ...prev, solutions: updated };
    });
  };

  const handleRemoveSolution = (index) => {
    setFormData((prev) => ({
      ...prev,
      solutions: prev.solutions.filter((_, idx) => idx !== index),
    }));
  };

  // Save / Update Project
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Project Title is required.');
      return;
    }

    const slug =
      formData.slug.trim() ||
      formData.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

    const payload = {
      title: formData.title.trim(),
      slug: slug,
      desc: formData.desc.trim(),
      category: formData.category,
      tags: typeof formData.tags === 'string' ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean) : formData.tags,
      liveUrl: formData.liveUrl.trim(),
      githubUrl: formData.githubUrl.trim(),
      status: formData.status,
      duration: formData.duration,
      role: formData.role,
      img: formData.img,
      gallery: formData.gallery,
      overview: formData.overview,
      techStack: formData.techStack,
      learned: formData.learned,
      features: formData.features.filter((f) => f.title.trim()),
      challenges: formData.challenges.filter((c) => c.trim()),
      solutions: formData.solutions.filter((s) => s.trim()),
    };

    try {
      if (isEditing && editId) {
        const res = await portfolioApi.updateProject(editId, payload);
        if (res && res.project) {
          setProjects((prev) => prev.map((p) => ((p._id === editId || p.slug === editId || p.id === editId) ? res.project : p)));
        } else {
          setProjects((prev) => prev.map((p) => ((p._id === editId || p.slug === editId || p.id === editId) ? { ...p, ...payload } : p)));
        }
        setToast('Project details updated successfully!');
      } else {
        const res = await portfolioApi.createProject(payload);
        if (res && res.project) {
          setProjects((prev) => [res.project, ...prev]);
        } else {
          setProjects((prev) => [{ ...payload, _id: Date.now().toString() }, ...prev]);
        }
        setToast('New project created and published successfully!');
      }
      setShowModal(false);
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      console.error('Error saving project:', err);
      setToast('Saved locally (Server error)');
      setShowModal(false);
      setTimeout(() => setToast(''), 3000);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await portfolioApi.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id && p.slug !== id && p.id !== id));
      setToast('Project deleted successfully.');
      setTimeout(() => setToast(''), 2500);
    } catch (err) {
      console.error('Failed to delete project:', err);
      setProjects((prev) => prev.filter((p) => p._id !== id && p.slug !== id && p.id !== id));
      setToast('Project removed.');
      setTimeout(() => setToast(''), 2500);
    }
  };

  // Filter & Search
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesFilter = filter === 'All' || p.category === filter;
      const term = search.toLowerCase().trim();
      const tagsStr = Array.isArray(p.tags) ? p.tags.join(' ') : p.tags || '';
      const matchesSearch =
        !term ||
        p.title.toLowerCase().includes(term) ||
        p.desc?.toLowerCase().includes(term) ||
        tagsStr.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [projects, filter, search]);

  const categories = ['All', 'Full Stack', 'Web Apps', 'React', 'Java', 'Mobile'];

  return (
    <section className="projects-admin-page">
      {/* Toast Feedback */}
      {toast && <div className="admin-toast">{toast}</div>}

      {/* Header */}
      <div className="admin-header-box">
        <div>
          <div className="header-eyebrow">
            <span></span>
            PORTFOLIO SHOWCASE
          </div>
          <h1>
            Projects <span>Management</span>
          </h1>
          <p>
            Add, edit, upload screenshots, and manage complete project cards and individual detail pages. All changes sync in real-time across Home & Projects pages.
          </p>
        </div>

        <button
          type="button"
          className="admin-btn admin-btn-primary"
          onClick={openCreateModal}
        >
          <FiPlus />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Toolbar: Category Filters & Search */}
      <div className="projects-toolbar">
        <div className="filter-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="toolbar-search">
          <FiSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search projects by name, tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-admin-grid">
        {loading && projects.length === 0 ? (
          <div className="empty-projects-state">
            <div className="spin-loader"></div>
            <p>Loading projects from database...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="empty-projects-state">
            <FiFolder className="empty-icon" />
            <h3>No projects found</h3>
            <p>Try searching with another keyword or click "Add New Project".</p>
          </div>
        ) : (
          filteredProjects.map((p) => {
            const projId = p._id || p.slug || p.id;
            return (
              <div key={projId} className="project-admin-card">
                <div className="project-thumbnail-wrap">
                  <img
                    src={p.img || '/assets/projects-preview.png'}
                    alt={p.title}
                    onError={(e) => {
                      e.target.src = '/assets/projects-preview.png';
                    }}
                  />
                  <span className="project-category-badge">{p.category || 'Full Stack'}</span>
                  <span className="project-status-tag">{p.status || 'Live'}</span>
                </div>

                <div className="project-admin-card-body">
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.desc}</p>

                  <div className="project-meta-chips">
                    {p.duration && (
                      <span className="meta-chip">
                        <FiClock /> {p.duration}
                      </span>
                    )}
                    {p.role && (
                      <span className="meta-chip">
                        <FiUser /> {p.role}
                      </span>
                    )}
                  </div>

                  <div className="project-tags-cloud">
                    {(Array.isArray(p.tags) ? p.tags : String(p.tags).split(',')).map((tag, idx) => (
                      <span key={idx} className="tag-chip">
                        {String(tag).trim()}
                      </span>
                    ))}
                  </div>

                  <div className="project-admin-footer">
                    <div className="card-external-links">
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          title="Open Live URL"
                        >
                          <FiExternalLink /> Live
                        </a>
                      )}
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          title="Open GitHub"
                        >
                          <FiGithub /> Code
                        </a>
                      )}
                    </div>

                    <div className="card-actions-btn-group">
                      <button
                        type="button"
                        className="btn-card-edit"
                        onClick={() => openEditModal(p)}
                        title="Edit Project & Detail Page"
                      >
                        <FiEdit /> Edit
                      </button>

                      <button
                        type="button"
                        className="btn-card-delete"
                        onClick={() => handleDelete(projId, p.title)}
                        title="Delete Project"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ADD / EDIT COMPREHENSIVE MODAL */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="admin-modal-box modal-wide"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-title-wrap">
                <FiFolder className="modal-header-icon" />
                <div>
                  <h2>{isEditing ? 'Edit Project & Detail Page' : 'Add New Portfolio Project'}</h2>
                  <span>All inputs dynamically update both project cards and detail pages.</span>
                </div>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowModal(false)}
              >
                <FiX />
              </button>
            </div>

            {/* Modal Tabs Navigation */}
            <div className="modal-nav-tabs">
              <button
                type="button"
                className={`modal-tab ${activeTab === 'basic' ? 'active' : ''}`}
                onClick={() => setActiveTab('basic')}
              >
                1. Basic Info & Links
              </button>
              <button
                type="button"
                className={`modal-tab ${activeTab === 'images' ? 'active' : ''}`}
                onClick={() => setActiveTab('images')}
              >
                2. Images & Screenshots
              </button>
              <button
                type="button"
                className={`modal-tab ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                3. Detail Overview (Rich Text)
              </button>
              <button
                type="button"
                className={`modal-tab ${activeTab === 'features' ? 'active' : ''}`}
                onClick={() => setActiveTab('features')}
              >
                4. Features & Challenges
              </button>
            </div>

            <form onSubmit={handleSubmit} className="project-modal-form">
              {/* TAB 1: BASIC INFO */}
              {activeTab === 'basic' && (
                <div className="tab-pane-content">
                  <div className="form-group">
                    <label>
                      Project Title <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. TeamTrack — Employee Activity Monitoring Platform"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-row-dual">
                    <div className="form-group">
                      <label>URL Slug / Unique ID</label>
                      <input
                        type="text"
                        placeholder="e.g. teamtrack"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      />
                      <small className="field-hint">Used for URL: /projects/your-slug</small>
                    </div>

                    <div className="form-group">
                      <label>Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="Full Stack">Full Stack</option>
                        <option value="Web Apps">Web Apps</option>
                        <option value="React">React</option>
                        <option value="Java">Java / Spring Boot</option>
                        <option value="Mobile">Mobile App</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Short Description (Shown on Project Cards)</label>
                    <textarea
                      rows="3"
                      placeholder="Concise overview of what this project accomplishes..."
                      value={formData.desc}
                      onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                    />
                  </div>

                  <div className="form-row-dual">
                    <div className="form-group">
                      <label>Live Demo URL</label>
                      <input
                        type="text"
                        placeholder="https://..."
                        value={formData.liveUrl}
                        onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>GitHub Repository URL</label>
                      <input
                        type="text"
                        placeholder="https://github.com/..."
                        value={formData.githubUrl}
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row-three">
                    <div className="form-group">
                      <label>Duration</label>
                      <input
                        type="text"
                        placeholder="e.g. 4+ Months"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Project Role</label>
                      <input
                        type="text"
                        placeholder="e.g. Lead Developer"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Deployment Status</label>
                      <input
                        type="text"
                        placeholder="e.g. Live & Operational"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Technologies / Tags (Comma separated)</label>
                    <input
                      type="text"
                      placeholder="React, Spring Boot, MySQL, REST API, Tailwind CSS"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: IMAGE UPLOADS */}
              {activeTab === 'images' && (
                <div className="tab-pane-content">
                  {/* Main Cover Image */}
                  <div className="form-group upload-section-card">
                    <label className="section-subtitle">
                      Main Project Cover Image (Upload from Device)
                    </label>
                    <div className="upload-controls-row">
                      <label className="file-upload-dropzone">
                        <FiUploadCloud className="upload-cloud-icon" />
                        <span className="upload-prompt-text">
                          Click to browse and upload cover image
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCoverImageUpload}
                          style={{ display: 'none' }}
                        />
                      </label>

                      {formData.img && (
                        <div className="image-preview-box">
                          <img
                            src={formData.img}
                            alt="Cover Preview"
                            onError={(e) => (e.target.src = '/assets/projects-preview.png')}
                          />
                          <span className="preview-label">Active Cover</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Gallery Screenshots Upload */}
                  <div className="form-group upload-section-card">
                    <label className="section-subtitle">
                      Detail Page Screenshots Gallery (Upload Multiple)
                    </label>
                    <label className="file-upload-dropzone multiple">
                      <FiUploadCloud className="upload-cloud-icon" />
                      <span className="upload-prompt-text">
                        Click to upload project screenshot images for the gallery
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryUpload}
                        style={{ display: 'none' }}
                      />
                    </label>

                    {formData.gallery && formData.gallery.length > 0 && (
                      <div className="gallery-thumbnails-grid">
                        {formData.gallery.map((imgSrc, idx) => (
                          <div key={idx} className="gallery-thumb-item">
                            <img src={imgSrc} alt={`Gallery ${idx + 1}`} />
                            <button
                              type="button"
                              className="btn-remove-thumb"
                              onClick={() => removeGalleryImage(idx)}
                              title="Remove image"
                            >
                              <FiX />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: DETAIL OVERVIEW WITH RICH TEXT */}
              {activeTab === 'details' && (
                <div className="tab-pane-content">
                  <div className="form-group">
                    <label>
                      Detailed Project Overview (Rich Text Editor)
                    </label>
                    <small className="field-hint" style={{ marginBottom: '8px', display: 'block' }}>
                      Format headings, bold text, bullet points, quotes, and links for the Project Detail page.
                    </small>
                    <RichTextEditor
                      value={formData.overview}
                      onChange={(html) => setFormData({ ...formData, overview: html })}
                      placeholder="Write an in-depth project overview, technical architecture, and implementation details..."
                    />
                  </div>

                  <div className="form-group" style={{ marginTop: '16px' }}>
                    <label>Tech Stack Summary</label>
                    <input
                      type="text"
                      placeholder="e.g. React · Spring Boot · MySQL · REST APIs · Postman"
                      value={formData.techStack}
                      onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>What I Learned</label>
                    <textarea
                      rows="3"
                      placeholder="Key takeaways, architectural improvements, and lessons learned..."
                      value={formData.learned}
                      onChange={(e) => setFormData({ ...formData, learned: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: FEATURES & CHALLENGES */}
              {activeTab === 'features' && (
                <div className="tab-pane-content">
                  {/* Features */}
                  <div className="form-group dynamic-list-card">
                    <div className="dynamic-list-header">
                      <label className="section-subtitle">
                        Key Features ({formData.features.length})
                      </label>
                      <button
                        type="button"
                        className="btn-add-dynamic"
                        onClick={handleAddFeature}
                      >
                        <FiPlus /> Add Feature
                      </button>
                    </div>

                    <div className="dynamic-items-list">
                      {formData.features.map((feat, idx) => (
                        <div key={idx} className="dynamic-feature-row">
                          <input
                            type="text"
                            placeholder="Feature Title (e.g. Real-Time Tracking)"
                            value={feat.title}
                            onChange={(e) => handleUpdateFeature(idx, 'title', e.target.value)}
                            className="input-feature-title"
                          />
                          <input
                            type="text"
                            placeholder="Brief explanation of this feature..."
                            value={feat.desc}
                            onChange={(e) => handleUpdateFeature(idx, 'desc', e.target.value)}
                            className="input-feature-desc"
                          />
                          <button
                            type="button"
                            className="btn-del-dynamic"
                            onClick={() => handleRemoveFeature(idx)}
                            title="Delete Feature"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Challenges */}
                  <div className="form-group dynamic-list-card">
                    <div className="dynamic-list-header">
                      <label className="section-subtitle">
                        Key Technical Challenges ({formData.challenges.length})
                      </label>
                      <button
                        type="button"
                        className="btn-add-dynamic"
                        onClick={handleAddChallenge}
                      >
                        <FiPlus /> Add Challenge
                      </button>
                    </div>

                    <div className="dynamic-items-list">
                      {formData.challenges.map((c, idx) => (
                        <div key={idx} className="dynamic-bullet-row">
                          <input
                            type="text"
                            placeholder="Challenge statement..."
                            value={c}
                            onChange={(e) => handleUpdateChallenge(idx, e.target.value)}
                          />
                          <button
                            type="button"
                            className="btn-del-dynamic"
                            onClick={() => handleRemoveChallenge(idx)}
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Solutions */}
                  <div className="form-group dynamic-list-card">
                    <div className="dynamic-list-header">
                      <label className="section-subtitle">
                        Technical Solutions ({formData.solutions.length})
                      </label>
                      <button
                        type="button"
                        className="btn-add-dynamic"
                        onClick={handleAddSolution}
                      >
                        <FiPlus /> Add Solution
                      </button>
                    </div>

                    <div className="dynamic-items-list">
                      {formData.solutions.map((s, idx) => (
                        <div key={idx} className="dynamic-bullet-row">
                          <input
                            type="text"
                            placeholder="How you solved the problem..."
                            value={s}
                            onChange={(e) => handleUpdateSolution(idx, e.target.value)}
                          />
                          <button
                            type="button"
                            className="btn-del-dynamic"
                            onClick={() => handleRemoveSolution(idx)}
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer Controls */}
              <div className="modal-footer-actions">
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  <FiCheckCircle />
                  <span>{isEditing ? 'Save All Project Changes' : 'Publish New Project'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
