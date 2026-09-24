import React, { useState, useMemo } from 'react';
import {
  FiPlus,
  FiTrash2,
  FiCode,
  FiCheckCircle,
  FiTrendingUp,
  FiSliders,
} from 'react-icons/fi';
import './AdminSkills.css';

export default function AdminSkills() {
  const defaultSkills = [
    { name: 'React', category: 'Frontend', level: 90 },
    { name: 'JavaScript (ES6+)', category: 'Frontend', level: 92 },
    { name: 'Java', category: 'Backend', level: 88 },
    { name: 'Spring Boot', category: 'Backend', level: 85 },
    { name: 'Node.js', category: 'Backend', level: 84 },
    { name: 'Express.js', category: 'Backend', level: 85 },
    { name: 'MongoDB', category: 'Database', level: 86 },
    { name: 'MySQL', category: 'Database', level: 82 },
    { name: 'HTML5 & CSS3', category: 'Frontend', level: 95 },
    { name: 'Git & GitHub', category: 'Tools', level: 88 },
    { name: 'AWS Cloud', category: 'Tools', level: 75 },
    { name: 'REST APIs', category: 'Backend', level: 90 },
  ];

  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem('ishwar_skills_list');
    return saved ? JSON.parse(saved) : defaultSkills;
  });

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Frontend');
  const [level, setLevel] = useState(85);
  const [activeTab, setActiveTab] = useState('All');
  const [toast, setToast] = useState('');

  const saveSkills = (newSkills) => {
    setSkills(newSkills);
    localStorage.setItem('ishwar_skills_list', JSON.stringify(newSkills));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const exists = skills.some(
      (s) => s.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (exists) {
      alert('Skill already exists!');
      return;
    }

    const updated = [
      { name: name.trim(), category, level: Number(level) },
      ...skills,
    ];
    saveSkills(updated);
    setName('');
    setLevel(85);
    setToast(`Skill "${name.trim()}" added successfully!`);
    setTimeout(() => setToast(''), 3000);
  };

  const handleDelete = (index) => {
    const target = filteredSkills[index];
    const updated = skills.filter((s) => s.name !== target.name);
    saveSkills(updated);
    setToast(`Skill "${target.name}" removed.`);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAdjustLevel = (skillName, delta) => {
    const updated = skills.map((s) => {
      if (s.name === skillName) {
        const newLvl = Math.min(100, Math.max(10, s.level + delta));
        return { ...s, level: newLvl };
      }
      return s;
    });
    saveSkills(updated);
  };

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools'];

  const filteredSkills = useMemo(() => {
    if (activeTab === 'All') return skills;
    return skills.filter((s) => s.category === activeTab);
  }, [skills, activeTab]);

  return (
    <section className="skills-admin-page">
      <div className="admin-header-box">
        <div>
          <div className="header-eyebrow">
            <span></span>
            TECHNICAL EXPERTISE
          </div>
          <h1>
            Skills & <span>Proficiencies</span>
          </h1>
          <p>
            Manage technical skill cards, category tags and proficiency levels displayed on the portfolio.
          </p>
        </div>

        <div className="skills-summary-pill">
          <FiCode />
          <span>{skills.length} Total Technologies</span>
        </div>
      </div>

      {toast && (
        <div className="admin-alert success">
          <FiCheckCircle />
          <span>{toast}</span>
        </div>
      )}

      {/* ADD SKILL FORM */}
      <div className="admin-card-box skill-add-box">
        <div className="panel-title">
          <FiPlus className="panel-title-icon" />
          <h2>Add New Technology</h2>
        </div>

        <form onSubmit={handleAdd} className="skill-add-form">
          <div className="admin-input-group">
            <label>Technology / Skill Name</label>
            <input
              type="text"
              className="admin-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Next.js, Docker, Tailwind CSS..."
              required
            />
          </div>

          <div className="admin-input-group">
            <label>Category</label>
            <select
              className="admin-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="Tools">Tools & DevOps</option>
            </select>
          </div>

          <div className="admin-input-group slider-group">
            <label>
              <span>Proficiency Level</span>
              <strong className="level-badge">{level}%</strong>
            </label>
            <div className="slider-wrapper">
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="proficiency-slider"
              />
            </div>
          </div>

          <button type="submit" className="admin-btn admin-btn-primary add-submit-btn">
            <FiPlus />
            Add Skill
          </button>
        </form>
      </div>

      {/* FILTER TABS */}
      <div className="skills-filter-row">
        <div className="filter-tab-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill-btn ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
              <span className="pill-count">
                {cat === 'All'
                  ? skills.length
                  : skills.filter((s) => s.category === cat).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* SKILLS GRID */}
      <div className="skills-admin-grid">
        {filteredSkills.map((s, idx) => (
          <div className="skill-card-item" key={s.name}>
            <div className="skill-card-top">
              <div>
                <span className="skill-cat-tag">{s.category}</span>
                <h3 className="skill-name">{s.name}</h3>
              </div>
              <span className="skill-percentage">{s.level}%</span>
            </div>

            <div className="skill-progress-bar">
              <div
                className="skill-progress-fill"
                style={{ width: `${s.level}%` }}
              />
            </div>

            <div className="skill-card-footer">
              <div className="level-controls">
                <button
                  type="button"
                  className="lvl-btn"
                  onClick={() => handleAdjustLevel(s.name, -5)}
                  title="Decrease 5%"
                >
                  -5%
                </button>
                <button
                  type="button"
                  className="lvl-btn"
                  onClick={() => handleAdjustLevel(s.name, +5)}
                  title="Increase 5%"
                >
                  +5%
                </button>
              </div>

              <button
                type="button"
                className="admin-btn-icon danger"
                onClick={() => handleDelete(idx)}
                title="Delete Skill"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
