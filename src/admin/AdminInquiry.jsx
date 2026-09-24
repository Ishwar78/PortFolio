import React, { useState, useEffect, useMemo } from 'react';
import {
  FiMail,
  FiTrash2,
  FiCheckCircle,
  FiClock,
  FiSend,
  FiRefreshCw,
  FiMessageSquare,
  FiUser,
  FiCheck,
} from 'react-icons/fi';
import { portfolioApi } from '../lib/api';
import './AdminInquiry.css';

export default function AdminInquiry() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState('');

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await portfolioApi.getInquiries();
      if (res && res.inquiries) {
        setInquiries(res.inquiries);
      }
    } catch (err) {
      console.error('Error fetching inquiries from MongoDB:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
    const interval = setInterval(() => {
      portfolioApi
        .getInquiries()
        .then((res) => {
          if (res && res.inquiries) {
            setInquiries(res.inquiries);
          }
        })
        .catch(() => {});
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await portfolioApi.updateInquiryStatus(id, 'read');
      setInquiries(
        inquiries.map((item) =>
          item._id === id ? { ...item, status: 'read' } : item
        )
      );
      setToast('Message marked as read.');
      setTimeout(() => setToast(''), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await portfolioApi.deleteInquiry(id);
      setInquiries(inquiries.filter((item) => item._id !== id));
      setToast('Inquiry deleted successfully.');
      setTimeout(() => setToast(''), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredInquiries = useMemo(() => {
    if (filter === 'all') return inquiries;
    return inquiries.filter((x) => x.status === filter);
  }, [inquiries, filter]);

  const unreadCount = inquiries.filter((x) => x.status === 'unread').length;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recently';
    const d = new Date(dateStr);
    return isNaN(d.getTime())
      ? dateStr
      : d.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
  };

  return (
    <section className="inquiry-admin-page">
      <div className="admin-header-box">
        <div>
          <div className="header-eyebrow">
            <span></span>
            CLIENT COMMUNICATIONS
          </div>
          <h1>
            Messages & <span>Inquiries</span>
          </h1>
          <p>
            Real-time messages submitted from your public portfolio contact form, stored in MongoDB.
          </p>
        </div>

        <div className="inquiry-header-actions">
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            onClick={fetchInquiries}
            disabled={loading}
          >
            <FiRefreshCw className={loading ? 'spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {toast && (
        <div className="admin-alert success">
          <FiCheckCircle />
          <span>{toast}</span>
        </div>
      )}

      {/* FILTER TABS */}
      <div className="inquiry-toolbar">
        <div className="filter-tab-pills">
          <button
            type="button"
            className={`filter-pill-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Messages
            <span className="pill-count">{inquiries.length}</span>
          </button>

          <button
            type="button"
            className={`filter-pill-btn ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Unread
            <span className="pill-count warn">{unreadCount}</span>
          </button>

          <button
            type="button"
            className={`filter-pill-btn ${filter === 'read' ? 'active' : ''}`}
            onClick={() => setFilter('read')}
          >
            Read
            <span className="pill-count">
              {inquiries.filter((x) => x.status === 'read').length}
            </span>
          </button>
        </div>
      </div>

      {/* MESSAGES LIST */}
      {loading ? (
        <div className="inquiries-loading">
          <div className="loading-spinner"></div>
          <span>Syncing inquiries from MongoDB...</span>
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="inquiry-empty-state admin-card-box">
          <div className="empty-icon-box">
            <FiMessageSquare />
          </div>
          <h3>No Messages Found</h3>
          <p>
            {filter === 'unread'
              ? 'You have read all received inquiries! Good job.'
              : 'Messages submitted through your portfolio contact form will automatically appear here.'}
          </p>
        </div>
      ) : (
        <div className="inquiries-stack">
          {filteredInquiries.map((item) => (
            <article
              className={`inquiry-item-card ${
                item.status === 'unread' ? 'unread' : 'read'
              }`}
              key={item._id}
            >
              <div className="inquiry-sender-meta">
                <div className="sender-avatar">
                  {item.name ? item.name.charAt(0).toUpperCase() : 'U'}
                </div>

                <div className="sender-info">
                  <div className="sender-name-row">
                    <h3 className="sender-name">{item.name}</h3>
                    {item.status === 'unread' ? (
                      <span className="unread-badge">New Message</span>
                    ) : (
                      <span className="read-badge">Read</span>
                    )}
                  </div>
                  <span className="sender-email">{item.email}</span>
                </div>

                <div className="inquiry-timestamp">
                  <FiClock className="time-icon" />
                  <span>{formatDate(item.createdAt)}</span>
                </div>
              </div>

              <div className="inquiry-content">
                <div className="inquiry-subject-tag">
                  <strong>Subject:</strong> {item.subject || 'Portfolio Inquiry'}
                </div>
                <div className="inquiry-body-text">{item.message}</div>
              </div>

              <div className="inquiry-footer-actions">
                <a
                  href={`mailto:${item.email}?subject=Re: ${encodeURIComponent(
                    item.subject || 'Portfolio Inquiry'
                  )}&body=Hi ${item.name},%0D%0A%0D%0AThank you for reaching out via my portfolio.%0D%0A`}
                  className="admin-btn admin-btn-primary action-btn-reply"
                >
                  <FiSend /> Reply via Email
                </a>

                {item.status === 'unread' && (
                  <button
                    type="button"
                    className="admin-btn admin-btn-secondary"
                    onClick={() => handleMarkAsRead(item._id)}
                  >
                    <FiCheck /> Mark as Read
                  </button>
                )}

                <button
                  type="button"
                  className="admin-btn-icon danger action-btn-del"
                  onClick={() => handleDelete(item._id)}
                  title="Delete Inquiry"
                >
                  <FiTrash2 />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
