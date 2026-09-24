import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiFolder,
  FiBriefcase,
  FiCode,
  FiMail,
  FiArrowUpRight,
  FiActivity,
  FiGlobe,
  FiCheckCircle,
  FiEdit3,
  FiExternalLink,
  FiDatabase,
  FiCpu,
  FiShield,
} from 'react-icons/fi';
import { portfolioApi } from '../lib/api';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalInquiries: 0,
    unreadInquiries: 0,
    totalProjects: 6,
    totalSkills: 12,
    totalExperience: 3,
    dbStatus: 'MongoDB Atlas Connected',
  });

  useEffect(() => {
    portfolioApi
      .getStats()
      .then((res) => {
        if (res && res.stats) {
          setStats((prev) => ({ ...prev, ...res.stats }));
        }
      })
      .catch(() => {});
  }, []);

  const cards = [
    {
      name: 'Projects',
      value: `${stats.totalProjects}`,
      label: 'Portfolio Projects',
      to: '/admin/projects',
      icon: FiFolder,
      color: '#1597ff',
    },
    {
      name: 'Experience',
      value: `${stats.totalExperience}+`,
      label: 'Career Milestones',
      to: '/admin/experience',
      icon: FiBriefcase,
      color: '#10b981',
    },
    {
      name: 'Skills',
      value: `${stats.totalSkills}+`,
      label: 'Technologies & Tools',
      to: '/admin/skills',
      icon: FiCode,
      color: '#8b5cf6',
    },
    {
      name: 'Inquiries',
      value: `${stats.totalInquiries}`,
      badge: stats.unreadInquiries > 0 ? `${stats.unreadInquiries} New` : null,
      label: 'Client Messages',
      to: '/admin/inquiries',
      icon: FiMail,
      color: '#f59e0b',
    },
  ];

  const quickActions = [
    {
      title: 'Manage Projects',
      desc: 'Add, update or remove portfolio showcase projects.',
      to: '/admin/projects',
      icon: FiFolder,
    },
    {
      title: 'Update Skills',
      desc: 'Adjust proficiency levels and technical stack.',
      to: '/admin/skills',
      icon: FiCode,
    },
    {
      title: 'Experience Timeline',
      desc: 'Edit work history, companies and roles.',
      to: '/admin/experience',
      icon: FiBriefcase,
    },
    {
      title: 'Contact Details',
      desc: 'Update email, phone, location & socials.',
      to: '/admin/contact',
      icon: FiMail,
    },
    {
      title: 'Client Inquiries',
      desc: 'Read and respond to incoming contact submissions.',
      to: '/admin/inquiries',
      icon: FiMail,
    },
    {
      title: 'Hero & Home',
      desc: 'Refine hero tagline, biography and counters.',
      to: '/admin/home',
      icon: FiGlobe,
    },
  ];

  return (
    <section className="dash-page">
      {/* Header */}
      <div className="admin-page-head">
        <div className="dashboard-heading">
          <div className="dashboard-eyebrow">
            <span></span>
            ADMIN CONTROL CENTER
          </div>

          <h1>
            Welcome back, <span>Ishwar</span>
          </h1>

          <p>
            Connected to MongoDB Cluster: <b>Ishwarweb</b>. Manage portfolio
            content, inquiries, and technical details in real-time.
          </p>
        </div>

        <div className="dash-head-actions">
          <Link className="admin-btn admin-btn-primary" to="/admin/projects">
            <FiFolder />
            Add Project
          </Link>
          <a
            className="admin-btn admin-btn-secondary"
            href="/"
            target="_blank"
            rel="noreferrer"
          >
            <FiGlobe />
            View Site
            <FiExternalLink />
          </a>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="dash-cards">
        {cards.map(({ name, value, label, to, icon: Icon, color, badge }) => (
          <Link to={to} className="dashboard-stat-card" key={name}>
            <div className="stat-top">
              <div className="stat-icon" style={{ color }}>
                <Icon />
              </div>
              {badge ? (
                <span className="stat-badge-new">{badge}</span>
              ) : (
                <FiArrowUpRight className="stat-arrow" />
              )}
            </div>

            <div className="stat-content">
              <span className="stat-name">{name}</span>
              <strong>{value}</strong>
              <small>{label}</small>
            </div>

            <div
              className="stat-line"
              style={{
                background: `linear-gradient(90deg, ${color}, transparent)`,
              }}
            ></div>
          </Link>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="dash-grid">
        {/* System & Database Status */}
        <div className="dash-panel status-panel">
          <div className="panel-header">
            <div>
              <span className="panel-label">SYSTEM HEALTH & DATABASE</span>
              <h2>Platform Overview</h2>
            </div>

            <div className="live-status">
              <span></span>
              Live & Synced
            </div>
          </div>

          <div className="status-list">
            <div className="status-row">
              <div className="status-info">
                <span className="status-icon">
                  <FiDatabase />
                </span>
                <div>
                  <b>MongoDB Atlas DB</b>
                  <small>Database: Ishwarweb</small>
                </div>
              </div>
              <strong className="status-badge-ok">Connected</strong>
            </div>

            <div className="status-row">
              <div className="status-info">
                <span className="status-icon">
                  <FiShield />
                </span>
                <div>
                  <b>Admin Authentication</b>
                  <small>JWT + Bcrypt Secure Token</small>
                </div>
              </div>
              <strong className="status-badge-ok">Active</strong>
            </div>

            <div className="status-row">
              <div className="status-info">
                <span className="status-icon">
                  <FiGlobe />
                </span>
                <div>
                  <b>Frontend Website</b>
                  <small>React + Vite Single Page App</small>
                </div>
              </div>
              <strong>Ready</strong>
            </div>

            <div className="status-row">
              <div className="status-info">
                <span className="status-icon">
                  <FiCpu />
                </span>
                <div>
                  <b>Backend API Engine</b>
                  <small>Express + Node.js (Port 6095)</small>
                </div>
              </div>
              <strong className="status-badge-ok">Online</strong>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dash-panel quick-panel">
          <div className="panel-header">
            <div>
              <span className="panel-label">ACTIONS</span>
              <h2>Quick Management</h2>
            </div>
          </div>

          <div className="quick-grid">
            {quickActions.map(({ title, desc, to, icon: Icon }) => (
              <Link to={to} className="quick-card" key={title}>
                <div className="quick-icon">
                  <Icon />
                </div>

                <div className="quick-content">
                  <b>{title}</b>
                  <span>{desc}</span>
                </div>

                <FiArrowUpRight className="quick-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}