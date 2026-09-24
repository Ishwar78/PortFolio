import React, { useState } from 'react';
import {
  FiPlus,
  FiTrash2,
  FiBriefcase,
  FiCalendar,
  FiMapPin,
  FiCheckCircle,
  FiX,
} from 'react-icons/fi';
import './AdminExperience.css';

export default function AdminExperience() {
  const defaultExperiences = [
    {
      role: 'Technical Supervisor',
      company: 'Wipro (On-Site)',
      period: 'Mar 2024 – Present',
      location: 'Gurugram, Haryana',
      type: 'Full-time',
      desc: 'Supervising on-site technical operations, IT system stability, troubleshooting infrastructure workflows, and ensuring 99.9% uptime compliance.',
      techs: ['System Administration', 'Network Troubleshooting', 'Operations Management'],
    },
    {
      role: 'HVAC Plant Operations',
      company: 'DLF Corporate Greens, Gurugram',
      period: 'Mar 2022 – Mar 2024',
      location: 'Gurugram, Haryana',
      type: 'Full-time',
      desc: 'Managed technical plant operations, automated building management systems (BMS), preventive diagnostics and maintenance schedules.',
      techs: ['Facility Operations', 'BMS Systems', 'Diagnostics'],
    },
    {
      role: 'Full Stack Developer (Intern)',
      company: 'AAM Infotech Pvt. Ltd.',
      period: 'Sep 2023 – Feb 2024',
      location: 'Gurugram, Haryana',
      type: 'Internship',
      desc: 'Developed responsive user interfaces with React, implemented RESTful API endpoints with Node.js/Express, and handled database modeling in MongoDB & MySQL.',
      techs: ['React', 'Node.js', 'Express', 'MongoDB', 'MySQL'],
    },
  ];

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('ishwar_experience_list');
    return saved ? JSON.parse(saved) : defaultExperiences;
  });

  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState('');

  const [formData, setFormData] = useState({
    role: '',
    company: '',
    period: '',
    location: '',
    type: 'Full-time',
    desc: '',
    techs: '',
  });

  const saveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem('ishwar_experience_list', JSON.stringify(newItems));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.role.trim() || !formData.company.trim()) return;

    const newItem = {
      role: formData.role.trim(),
      company: formData.company.trim(),
      period: formData.period.trim() || 'Present',
      location: formData.location.trim() || 'Gurugram, Haryana',
      type: formData.type,
      desc: formData.desc.trim(),
      techs: formData.techs
        ? formData.techs.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
    };

    const updated = [newItem, ...items];
    saveItems(updated);
    setShowAdd(false);
    setFormData({
      role: '',
      company: '',
      period: '',
      location: '',
      type: 'Full-time',
      desc: '',
      techs: '',
    });
    setToast('Experience entry added successfully!');
    setTimeout(() => setToast(''), 3000);
  };

  const handleDelete = (index) => {
    if (!window.confirm('Delete this experience entry?')) return;
    const updated = items.filter((_, idx) => idx !== index);
    saveItems(updated);
    setToast('Experience entry removed.');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <section className="exp-admin-page">
      <div className="admin-header-box">
        <div>
          <div className="header-eyebrow">
            <span></span>
            CAREER JOURNEY
          </div>
          <h1>
            Professional <span>Experience</span>
          </h1>
          <p>
            Manage your career history, job positions, companies, responsibilities and dates.
          </p>
        </div>

        <button
          type="button"
          className="admin-btn admin-btn-primary"
          onClick={() => setShowAdd(true)}
        >
          <FiPlus />
          Add Experience
        </button>
      </div>

      {toast && (
        <div className="admin-alert success">
          <FiCheckCircle />
          <span>{toast}</span>
        </div>
      )}

      {/* TIMELINE LIST */}
      <div className="exp-timeline">
        {items.map((item, index) => (
          <div className="timeline-item" key={item.role + item.company + index}>
            <div className="timeline-marker">
              <div className="marker-dot"></div>
              {index < items.length - 1 && <div className="marker-line"></div>}
            </div>

            <div className="timeline-card admin-card-box">
              <div className="timeline-card-header">
                <div className="role-company-wrap">
                  <div className="company-icon-box">
                    <FiBriefcase />
                  </div>
                  <div>
                    <h3 className="item-role">{item.role}</h3>
                    <div className="item-meta">
                      <span className="item-company">{item.company}</span>
                      <span className="meta-dot">•</span>
                      <span className="item-location">
                        <FiMapPin className="sub-icon" /> {item.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="timeline-top-right">
                  <div className="period-pill">
                    <FiCalendar className="cal-icon" />
                    <span>{item.period}</span>
                  </div>

                  <button
                    type="button"
                    className="admin-btn-icon danger"
                    onClick={() => handleDelete(index)}
                    title="Delete Entry"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>

              {item.desc && <p className="item-desc">{item.desc}</p>}

              {item.techs && item.techs.length > 0 && (
                <div className="item-tech-tags">
                  {item.techs.map((t) => (
                    <span className="tech-tag-chip" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ADD MODAL */}
      {showAdd && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card">
            <div className="modal-header">
              <div className="modal-title">
                <FiBriefcase className="modal-icon" />
                <h3>Add Work Experience</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowAdd(false)}
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleAdd} className="modal-form">
              <div className="two-col-inputs">
                <div className="admin-input-group">
                  <label>Role / Position</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    placeholder="e.g. Senior Frontend Engineer"
                    required
                  />
                </div>

                <div className="admin-input-group">
                  <label>Company / Organization</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="e.g. Google, Wipro, TCS..."
                    required
                  />
                </div>
              </div>

              <div className="two-col-inputs">
                <div className="admin-input-group">
                  <label>Duration / Period</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.period}
                    onChange={(e) =>
                      setFormData({ ...formData, period: e.target.value })
                    }
                    placeholder="e.g. Jan 2024 – Present"
                    required
                  />
                </div>

                <div className="admin-input-group">
                  <label>Location</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="e.g. Gurugram, India / Remote"
                  />
                </div>
              </div>

              <div className="admin-input-group">
                <label>Key Responsibilities & Achievements</label>
                <textarea
                  className="admin-textarea"
                  value={formData.desc}
                  onChange={(e) =>
                    setFormData({ ...formData, desc: e.target.value })
                  }
                  placeholder="Describe your role, projects handled, and impact..."
                  style={{ minHeight: '90px' }}
                />
              </div>

              <div className="admin-input-group">
                <label>Key Technologies / Skills (comma separated)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={formData.techs}
                  onChange={(e) =>
                    setFormData({ ...formData, techs: e.target.value })
                  }
                  placeholder="React, Java, Spring Boot, MySQL"
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setShowAdd(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  <FiPlus />
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
