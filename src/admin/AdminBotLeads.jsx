import React, { useState, useEffect, useMemo } from 'react';
import {
  FiMessageCircle,
  FiTrash2,
  FiCheckCircle,
  FiClock,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiUser,
  FiRefreshCw,
  FiCheck,
  FiSearch,
  FiCopy,
} from 'react-icons/fi';
import { portfolioApi } from '../lib/api';
import './AdminBotLeads.css';

export default function AdminBotLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState('');

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await portfolioApi.getChatbotLeads();
      if (res && res.leads) {
        setLeads(res.leads);
      }
    } catch (err) {
      console.error('Error fetching chatbot leads from MongoDB:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    const interval = setInterval(() => {
      portfolioApi
        .getChatbotLeads()
        .then((res) => {
          if (res && res.leads) {
            setLeads(res.leads);
          }
        })
        .catch(() => {});
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await portfolioApi.updateChatbotLeadStatus(id, newStatus);
      setLeads((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
      );
      setToast(`Lead marked as ${newStatus}.`);
      setTimeout(() => setToast(''), 2500);
    } catch (err) {
      console.error('Failed to update lead status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this chatbot lead?')) return;
    try {
      await portfolioApi.deleteChatbotLead(id);
      setLeads((prev) => prev.filter((item) => item._id !== id));
      setToast('Bot lead deleted successfully.');
      setTimeout(() => setToast(''), 2500);
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setToast(`Copied ${label} to clipboard!`);
    setTimeout(() => setToast(''), 2200);
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((item) => {
      const matchesFilter = filter === 'all' || item.status === filter;
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        (item.name && item.name.toLowerCase().includes(term)) ||
        (item.contact && item.contact.toLowerCase().includes(term)) ||
        (item.company && item.company.toLowerCase().includes(term));
      return matchesFilter && matchesSearch;
    });
  }, [leads, filter, searchTerm]);

  const newCount = leads.filter((x) => x.status === 'new').length;
  const contactedCount = leads.filter((x) => x.status === 'contacted').length;

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
    <section className="botleads-admin-page">
      {/* Toast Feedback */}
      {toast && <div className="admin-toast">{toast}</div>}

      {/* Page Header */}
      <div className="admin-header-box">
        <div>
          <div className="header-eyebrow">
            <span></span>
            CHATBOT VISITOR LEADS
          </div>
          <h1>
            Bot <span>Inquiries</span>
          </h1>
          <p>
            Real-time leads and visitor inquiries collected interactively through Ishwar Chatbot, saved directly in MongoDB.
          </p>
        </div>

        <div className="botleads-header-actions">
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            onClick={fetchLeads}
            disabled={loading}
          >
            <FiRefreshCw className={loading ? 'spin' : ''} />
            <span>Refresh Leads</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Badges */}
      <div className="botleads-stats-row">
        <div className="stat-card">
          <div className="stat-icon-wrap total">
            <FiMessageCircle />
          </div>
          <div className="stat-meta">
            <span className="stat-num">{leads.length}</span>
            <span className="stat-label">Total Bot Leads</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap new">
            <FiClock />
          </div>
          <div className="stat-meta">
            <span className="stat-num">{newCount}</span>
            <span className="stat-label">New / Pending</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap contacted">
            <FiCheckCircle />
          </div>
          <div className="stat-meta">
            <span className="stat-num">{contactedCount}</span>
            <span className="stat-label">Contacted</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="botleads-controls-bar">
        <div className="filter-pills">
          <button
            className={`filter-pill ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Leads ({leads.length})
          </button>
          <button
            className={`filter-pill ${filter === 'new' ? 'active' : ''}`}
            onClick={() => setFilter('new')}
          >
            New ({newCount})
          </button>
          <button
            className={`filter-pill ${filter === 'contacted' ? 'active' : ''}`}
            onClick={() => setFilter('contacted')}
          >
            Contacted ({contactedCount})
          </button>
        </div>

        <div className="botleads-search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="Search by name, contact, company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Leads List */}
      <div className="botleads-list">
        {loading && leads.length === 0 ? (
          <div className="empty-leads-box">
            <div className="spin-loader"></div>
            <p>Loading chatbot inquiries from database...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="empty-leads-box">
            <FiMessageCircle className="empty-icon" />
            <h3>No Chatbot Leads Found</h3>
            <p>
              {searchTerm || filter !== 'all'
                ? 'Try resetting your search query or filter.'
                : 'Whenever visitors interact with Ishwar Chatbot and enter their name and contact info, their inquiries will appear here automatically.'}
            </p>
          </div>
        ) : (
          filteredLeads.map((item) => {
            const isEmail = item.contact && item.contact.includes('@');
            return (
              <div
                key={item._id || item.id}
                className={`botlead-card ${item.status === 'new' ? 'is-new' : 'is-contacted'}`}
              >
                <div className="botlead-header">
                  <div className="lead-identity">
                    <div className="lead-avatar">
                      <FiUser />
                    </div>
                    <div>
                      <div className="name-row">
                        <h3>{item.name}</h3>
                        <span className={`status-badge ${item.status}`}>
                          {item.status === 'new' ? 'NEW INQUIRY' : 'CONTACTED'}
                        </span>
                      </div>
                      <span className="lead-time">
                        <FiClock /> {formatDate(item.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className="lead-actions">
                    {item.status === 'new' ? (
                      <button
                        className="btn-action-status mark-contacted"
                        onClick={() => handleStatusChange(item._id, 'contacted')}
                        title="Mark as Contacted"
                      >
                        <FiCheck />
                        <span>Mark Contacted</span>
                      </button>
                    ) : (
                      <button
                        className="btn-action-status mark-new"
                        onClick={() => handleStatusChange(item._id, 'new')}
                        title="Mark as New"
                      >
                        <FiClock />
                        <span>Mark New</span>
                      </button>
                    )}

                    <button
                      className="btn-action-delete"
                      onClick={() => handleDelete(item._id)}
                      title="Delete Lead"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>

                <div className="botlead-details-grid">
                  <div className="detail-item">
                    <span className="detail-label">
                      {isEmail ? <FiMail /> : <FiPhone />} Contact Details
                    </span>
                    <div className="detail-val-box">
                      <strong className="detail-value">{item.contact}</strong>
                      <button
                        type="button"
                        className="btn-copy-chip"
                        onClick={() => copyToClipboard(item.contact, 'Contact')}
                        title="Copy contact"
                      >
                        <FiCopy /> Copy
                      </button>
                      {isEmail && (
                        <a
                          href={`mailto:${item.contact}`}
                          className="btn-quick-link"
                          title="Send Email"
                        >
                          Send Email
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">
                      <FiBriefcase /> Company / Organization
                    </span>
                    <strong className="detail-value highlight">
                      {item.company || 'Not Specified'}
                    </strong>
                  </div>
                </div>

                {item.notes && (
                  <div className="botlead-notes">
                    <span className="notes-label">Visitor Query / Notes:</span>
                    <p>{item.notes}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
