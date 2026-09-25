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
} from 'react-icons/fi';
import { portfolioApi } from '../lib/api';
import './AdminProjects.css';

export default function AdminProjects() {
  const defaultProjects = [
    {
      _id: 'p1',
      title: 'TeamTrack — Employee Activity Monitoring Platform',
      desc: 'A full-stack employee activity monitoring platform designed to help teams track work activity through screenshots and activity data. The platform provides a centralized interface for monitoring team members, reviewing activity records and managing workforce productivity.',
      category: 'Full Stack',
      tags: ['React', 'Node.js', 'Mongo db'],
      img: '/assets/projects-preview.png',
      liveUrl: 'https://multiclout.in/',
      githubUrl: 'https://github.com/',
      status: 'Completed',
    },
    {
      _id: 'p2',
      title: 'TheKissanCity — E-Commerce Shopping Platform',
      desc: 'A complete full-stack e-commerce platform featuring product browsing, categories, shopping cart, customer checkout and payment integration. The system also includes administrative functionality for managing products, inventory and online orders.',
      category: 'Web Apps',
      tags: ['React', 'Node.js', 'MongoDB'],
      img: '/assets/project-detail-preview.png',
      liveUrl: 'https://thekissancity.com/',
      githubUrl: 'https://github.com/',
      status: 'Completed',
    },
    {
      _id: 'p3',
      title: 'Uni10 — Modern E-Commerce Platform',
      desc: 'A scalable e-commerce web application built for online product discovery and shopping. The platform includes product and collection management, cart functionality, checkout flow, order processing and third-party service integrations for a complete online shopping experience.',
      category: 'Web',
      tags: ['React', 'Node.js', 'MongoDB'],
      img: '/assets/skills-preview.png',
      liveUrl: 'https://uni10.in/',
      githubUrl: 'https://github.com/',
      status: 'Completed',
    },
    {
      _id: 'p4',
      title: 'SkillServe Academy — Education & Learning Platform',
      desc: 'A modern educational website designed to present courses, learning programs and academy information through a clean and responsive interface. Built with React and Redux to provide structured content, smooth navigation and an engaging user experience across devices. ',
      category: 'React',
      tags: ['React', 'Redux', 'Tailwind CSS'],
      img: '/assets/home-preview.png',
      liveUrl: 'https://www.skillserveacademy.in/',
      githubUrl: 'https://github.com/',
      status: 'Completed',
    },
    {
      _id: 'p5',
      title: 'SK Classes — Study Abroad & Education Platform',
      desc: '',
      category: 'Java',
      tags: ['React', 'Node.js ', 'Mongo db'],
      img: '/assets/experience-preview.png',
      liveUrl: 'https://skclasses.com/',
      githubUrl: 'https://github.com/',
      status: 'Completed',
    },
    {
      _id: 'p6',
      title: 'Portfolio Website',
      desc: 'An education-focused web platform designed to provide information and guidance for students planning their study-abroad journey. The website presents programs, services and educational information through a responsive and user-friendly interface.',
      category: 'Web Apps',
      tags: ['React', 'Vite', 'Node.js'],
      img: '/assets/home-preview.png',
      liveUrl: 'https://ishwarweb.in/',
      githubUrl: 'https://github.com/',
      status: 'Ongoing',
    },
  ];

  const [projects, setProjects] = useState(defaultProjects);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    category: 'Full Stack',
    tags: 'React, Node.js, MongoDB',
    liveUrl: '',
    githubUrl: '',
    status: 'Completed',
    img: '/assets/projects-preview.png',
  });

  // Load from API / MongoDB
  useEffect(() => {
    portfolioApi
      .getProjects()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const newProj = {
      title: formData.title.trim(),
      desc: formData.desc.trim(),
      category: formData.category,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      liveUrl: formData.liveUrl || '#',
      githubUrl: formData.githubUrl || '#',
      status: formData.status,
      img: formData.img || '/assets/projects-preview.png',
    };

    try {
      const res = await portfolioApi.createProject(newProj);
      if (res && res.project) {
        setProjects([res.project, ...projects]);
      } else {
        setProjects([{ ...newProj, _id: Date.now().toString() }, ...projects]);
      }
    } catch (err) {
      setProjects([{ ...newProj, _id: Date.now().toString() }, ...projects]);
    }

    setShowAddModal(false);
    setFormData({
      title: '',
      desc: '',
      category: 'Full Stack',
      tags: 'React, Node.js, MongoDB',
      liveUrl: '',
      githubUrl: '',
      status: 'Completed',
      img: '/assets/projects-preview.png',
    });
    setToast('Project added successfully to portfolio!');
    setTimeout(() => setToast(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await portfolioApi.deleteProject(id);
    } catch (e) {}

    setProjects(projects.filter((p) => p._id !== id));
    setToast('Project deleted successfully.');
    setTimeout(() => setToast(''), 3000);
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesFilter = filter === 'All' || p.category === filter;
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.desc?.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [projects, filter, search]);

  const categories = ['All', 'Full Stack', 'Web Apps', 'React', 'Java'];

  return (
    <section className="projects-admin-page">
      <div className="admin-header-box">
        <div>
          <div className="header-eyebrow">
            <span></span>
            SHOWCASE MANAGEMENT
          </div>
          <h1>
            Portfolio <span>Projects</span>
          </h1>
          <p>
            Add, edit, inspect and manage featured development projects and links.
          </p>
        </div>

        <button
          type="button"
          className="admin-btn admin-btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          <FiPlus />
          Add New Project
        </button>
      </div>

      {toast && (
        <div className="admin-alert success">
          <FiCheckCircle />
          <span>{toast}</span>
        </div>
      )}

      {/* SEARCH AND FILTERS */}
      <div className="projects-toolbar">
        <div className="filter-tab-pills">
          {categories.map((c) => (
            <button
              key={c}
              className={`filter-pill-btn ${filter === c ? 'active' : ''}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="toolbar-search">
          <FiSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
          />
        </div>
      </div>

      {/* PROJECTS GRID */}
      <div className="projects-admin-grid">
        {filteredProjects.map((p, idx) => (
          <article className="project-admin-card" key={p._id || idx}>
            <div className="project-thumbnail-wrap">
              <img
                src={p.img || '/assets/projects-preview.png'}
                alt={p.title}
                onError={(e) => {
                  e.target.src = '/assets/projects-preview.png';
                }}
              />
              <span className="project-category-badge">{p.category}</span>
              <span
                className={`project-status-tag ${
                  p.status === 'Completed' ? 'done' : 'ongoing'
                }`}
              >
                {p.status}
              </span>
            </div>

            <div className="project-card-body">
              <h3 className="project-card-title">{p.title}</h3>
              <p className="project-card-desc">{p.desc}</p>

              <div className="project-tags-list">
                {Array.isArray(p.tags) &&
                  p.tags.map((t) => (
                    <span className="tech-tag-chip" key={t}>
                      {t}
                    </span>
                  ))}
              </div>
            </div>

            <div className="project-card-actions">
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="card-btn demo"
                >
                  <FiExternalLink /> Live Demo
                </a>
              )}

              {p.githubUrl && (
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="card-btn github"
                >
                  <FiGithub /> Source
                </a>
              )}

              <button
                type="button"
                className="admin-btn-icon danger delete-btn"
                onClick={() => handleDelete(p._id)}
                title="Delete Project"
              >
                <FiTrash2 />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* ADD PROJECT MODAL */}
      {showAddModal && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card">
            <div className="modal-header">
              <div className="modal-title">
                <FiFolder className="modal-icon" />
                <h3>Add New Project</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowAddModal(false)}
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleCreate} className="modal-form">
              <div className="admin-input-group">
                <label>Project Title</label>
                <input
                  type="text"
                  className="admin-input"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g. AI Powered Chat Application"
                  required
                />
              </div>

              <div className="two-col-inputs">
                <div className="admin-input-group">
                  <label>Category</label>
                  <select
                    className="admin-select"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="Web Apps">Web Apps</option>
                    <option value="React">React</option>
                    <option value="Java">Java</option>
                  </select>
                </div>

                <div className="admin-input-group">
                  <label>Status</label>
                  <select
                    className="admin-select"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="Completed">Completed</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="admin-input-group">
                <label>Technologies / Tags (comma separated)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="React, Node.js, MongoDB, Tailwind"
                />
              </div>

              <div className="admin-input-group">
                <label>Project Description</label>
                <textarea
                  className="admin-textarea"
                  value={formData.desc}
                  onChange={(e) =>
                    setFormData({ ...formData, desc: e.target.value })
                  }
                  placeholder="Brief overview of features, architecture and problem solved..."
                  style={{ minHeight: '80px' }}
                />
              </div>

              <div className="two-col-inputs">
                <div className="admin-input-group">
                  <label>Live Demo URL</label>
                  <input
                    type="url"
                    className="admin-input"
                    value={formData.liveUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, liveUrl: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>

                <div className="admin-input-group">
                  <label>GitHub Repository URL</label>
                  <input
                    type="url"
                    className="admin-input"
                    value={formData.githubUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, githubUrl: e.target.value })
                    }
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  <FiPlus />
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
