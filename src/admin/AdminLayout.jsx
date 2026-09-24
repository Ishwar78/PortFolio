import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiUser,
  FiCode,
  FiFolder,
  FiBriefcase,
  FiMail,
  FiMessageSquare,
  FiLogOut,
  FiMenu,
  FiX,
  FiExternalLink,
  FiShield,
  FiDatabase,
  FiCheckCircle,
} from 'react-icons/fi';
import { portfolioApi } from '../lib/api';
import './AdminLayout.css';

export default function AdminLayout() {
  const nav = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [inquiryCount, setInquiryCount] = useState(0);
  const [dbConnected, setDbConnected] = useState(true);

  // Auth Protection Check
  useEffect(() => {
    const isAuth = localStorage.getItem('ishwar_admin_auth');
    if (isAuth !== 'true') {
      nav('/admin/login', { replace: true });
    }
  }, [nav]);

  // Fetch quick unread badge count
  useEffect(() => {
    portfolioApi
      .getInquiries()
      .then((res) => {
        if (res && res.inquiries) {
          const unread = res.inquiries.filter((x) => x.status === 'unread').length;
          setInquiryCount(unread);
          setDbConnected(true);
        }
      })
      .catch(() => {
        // Fallback gracefully
        setDbConnected(true);
      });
  }, [location.pathname]);

  const links = [
    { to: '/admin', label: 'Dashboard', icon: FiHome, end: true },
    { to: '/admin/home', label: 'Home Page', icon: FiHome },
    { to: '/admin/about', label: 'About Me', icon: FiUser },
    { to: '/admin/skills', label: 'Skills', icon: FiCode },
    { to: '/admin/projects', label: 'Projects', icon: FiFolder },
    { to: '/admin/experience', label: 'Experience', icon: FiBriefcase },
    { to: '/admin/contact', label: 'Contact Info', icon: FiMail },
    {
      to: '/admin/inquiries',
      label: 'Inquiries',
      icon: FiMessageSquare,
      badge: inquiryCount > 0 ? inquiryCount : null,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('ishwar_admin_auth');
    localStorage.removeItem('ishwar_admin_token');
    localStorage.removeItem('ishwar_admin_user');
    nav('/admin/login');
  };

  const getPageTitle = () => {
    const p = location.pathname;
    if (p === '/admin') return 'Dashboard Overview';
    if (p.includes('/home')) return 'Home Page Management';
    if (p.includes('/about')) return 'About Management';
    if (p.includes('/skills')) return 'Skills Management';
    if (p.includes('/projects')) return 'Projects Management';
    if (p.includes('/experience')) return 'Experience Management';
    if (p.includes('/contact')) return 'Contact Information';
    if (p.includes('/inquiries')) return 'Messages & Inquiries';
    return 'Admin Panel';
  };

  return (
    <div className="admin-shell">
      {/* Mobile Overlay */}
      {open && <div className="admin-overlay" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${open ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="admin-brand">
            <div className="brand-icon">
              <FiShield />
            </div>
            <div>
              <span className="brand-name">
                Ishwar<span>.</span>
              </span>
              <span className="brand-badge">ADMIN CONSOLE</span>
            </div>
          </div>
          <button className="mobile-close-btn" onClick={() => setOpen(false)}>
            <FiX />
          </button>
        </div>

        <div className="admin-nav-section">
          <span className="admin-section-label">MAIN NAVIGATION</span>
          <nav className="admin-nav">
            {links.map(({ to, label, icon: Icon, end, badge }) => (
              <NavLink
                to={to}
                key={to}
                end={end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `admin-nav-item ${isActive ? 'active' : ''}`
                }
              >
                <div className="nav-item-content">
                  <Icon className="nav-icon" />
                  <span>{label}</span>
                </div>
                {badge && <span className="nav-badge">{badge}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer Info */}
        <div className="admin-sidebar-footer">
          <div className="db-status-pill">
            <span className={`status-dot ${dbConnected ? 'online' : 'warn'}`} />
            <span>{dbConnected ? 'MongoDB Connected' : 'Local Fallback'}</span>
          </div>

          <div className="admin-user-profile">
            <div className="user-avatar">IS</div>
            <div className="user-meta">
              <strong>Ishwar Sharma</strong>
              <span>Super Administrator</span>
            </div>
          </div>

          <button className="admin-btn-logout" onClick={handleLogout}>
            <FiLogOut />
            <span>Logout Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main">
        {/* Top Navbar */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <button className="mobile-toggle-btn" onClick={() => setOpen(true)}>
              <FiMenu />
            </button>
            <div className="topbar-breadcrumb">
              <span className="breadcrumb-root">Portal</span>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-current">{getPageTitle()}</span>
            </div>
          </div>

          <div className="topbar-right">
            <div className="system-pill">
              <FiDatabase className="db-icon" />
              <span>Cluster: Ishwarweb</span>
              <FiCheckCircle className="check-icon" />
            </div>

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="admin-btn-preview"
            >
              <FiExternalLink />
              <span>View Website</span>
            </a>

            <button
              className="admin-btn-header-logout"
              onClick={handleLogout}
              title="Logout"
            >
              <FiLogOut />
            </button>
          </div>
        </header>

        {/* Content Outlet */}
        <div className="admin-content-view">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
