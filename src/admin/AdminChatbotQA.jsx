import React, { useState, useEffect, useMemo } from 'react';
import {
  FiCpu,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
  FiSearch,
  FiRefreshCw,
  FiPlay,
  FiHelpCircle,
  FiTag,
  FiLayers,
} from 'react-icons/fi';
import { portfolioApi } from '../lib/api';
import './AdminChatbotQA.css';

export default function AdminChatbotQA() {
  const [qaList, setQaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Form State (Add / Edit)
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    keywords: '',
    category: 'General',
    active: true,
  });

  // Live Match Testing Tool
  const [testQuery, setTestQuery] = useState('');
  const [testResult, setTestResult] = useState(null);
  const [testLoading, setTestLoading] = useState(false);

  const fetchQA = async () => {
    setLoading(true);
    try {
      const res = await portfolioApi.getChatbotQA();
      if (res && res.qaList) {
        setQaList(res.qaList);
      }
    } catch (err) {
      console.error('Error fetching Chatbot QA:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQA();
  }, []);

  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      keywords: '',
      category: 'General',
      active: true,
    });
    setIsEditing(false);
    setEditId(null);
  };

  const handleEditClick = (item) => {
    setIsEditing(true);
    setEditId(item._id);
    setFormData({
      question: item.question || '',
      answer: item.answer || '',
      keywords: Array.isArray(item.keywords) ? item.keywords.join(', ') : item.keywords || '',
      category: item.category || 'General',
      active: item.active !== undefined ? item.active : true,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) {
      setToast('Question and Answer are both required.');
      setTimeout(() => setToast(''), 3000);
      return;
    }

    try {
      const payload = {
        question: formData.question.trim(),
        answer: formData.answer.trim(),
        keywords: formData.keywords,
        category: formData.category,
        active: formData.active,
      };

      if (isEditing && editId) {
        const res = await portfolioApi.updateChatbotQA(editId, payload);
        if (res && res.qa) {
          setQaList((prev) => prev.map((item) => (item._id === editId ? res.qa : item)));
          setToast('Chatbot Q&A updated successfully!');
        }
      } else {
        const res = await portfolioApi.createChatbotQA(payload);
        if (res && res.qa) {
          setQaList((prev) => [res.qa, ...prev]);
          setToast('New Chatbot Q&A added successfully!');
        }
      }

      resetForm();
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      console.error('Failed to save Chatbot Q&A:', err);
      setToast('Failed to save Q&A. Please check server.');
      setTimeout(() => setToast(''), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this Q&A?')) return;
    try {
      await portfolioApi.deleteChatbotQA(id);
      setQaList((prev) => prev.filter((item) => item._id !== id));
      setToast('Q&A deleted successfully.');
      setTimeout(() => setToast(''), 2500);
    } catch (err) {
      console.error('Failed to delete Q&A:', err);
    }
  };

  const handleToggleActive = async (item) => {
    try {
      const updatedActive = !item.active;
      await portfolioApi.updateChatbotQA(item._id, { active: updatedActive });
      setQaList((prev) =>
        prev.map((q) => (q._id === item._id ? { ...q, active: updatedActive } : q))
      );
      setToast(`Q&A marked as ${updatedActive ? 'Active' : 'Inactive'}.`);
      setTimeout(() => setToast(''), 2000);
    } catch (err) {
      console.error('Failed to toggle active status:', err);
    }
  };

  // Test Case-Insensitive matching live
  const handleTestMatch = async () => {
    if (!testQuery.trim()) return;
    setTestLoading(true);
    try {
      const res = await portfolioApi.queryChatbot(testQuery.trim());
      setTestResult(res);
    } catch (err) {
      setTestResult({ matched: false, error: true });
    } finally {
      setTestLoading(false);
    }
  };

  const categories = useMemo(() => {
    const set = new Set(['General', 'Skills', 'Projects', 'Hiring', 'Contact', 'Pricing']);
    qaList.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    return Array.from(set);
  }, [qaList]);

  const filteredQA = useMemo(() => {
    return qaList.filter((item) => {
      const matchesCat = filterCategory === 'All' || item.category === filterCategory;
      const term = searchTerm.toLowerCase().trim();
      const kwString = Array.isArray(item.keywords) ? item.keywords.join(' ') : item.keywords || '';
      const matchesSearch =
        !term ||
        item.question.toLowerCase().includes(term) ||
        item.answer.toLowerCase().includes(term) ||
        kwString.toLowerCase().includes(term);
      return matchesCat && matchesSearch;
    });
  }, [qaList, filterCategory, searchTerm]);

  return (
    <section className="chatbot-admin-page">
      {/* Toast */}
      {toast && <div className="admin-toast">{toast}</div>}

      {/* Header */}
      <div className="admin-header-box">
        <div>
          <div className="header-eyebrow">
            <span></span>
            AI CHATBOT INTELLIGENCE
          </div>
          <h1>
            Chatbot <span>Q&A Management</span>
          </h1>
          <p>
            Add questions, exact answers, and matching keywords. Chatbot answers dynamically with case-insensitive matching across capital, lowercase, and partial queries.
          </p>
        </div>

        <div className="chatbot-header-actions">
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            onClick={fetchQA}
            disabled={loading}
          >
            <FiRefreshCw className={loading ? 'spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* TOP GRID: FORM + TEST MATCHER */}
      <div className="qa-top-grid">
        {/* ADD / EDIT FORM */}
        <div className="admin-card qa-form-card">
          <div className="card-header-styled">
            <div className="card-header-left">
              <span className="card-icon-badge">
                {isEditing ? <FiEdit2 /> : <FiPlus />}
              </span>
              <div>
                <h2>{isEditing ? 'Edit Question & Answer' : 'Add New Question & Answer'}</h2>
                <span className="card-subtext">
                  Define what visitors will receive when they ask matching questions.
                </span>
              </div>
            </div>

            {isEditing && (
              <button type="button" className="btn-cancel-edit" onClick={resetForm}>
                <FiX /> Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="qa-form">
            <div className="form-group">
              <label>
                Question Prompt <span className="req">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. What is your hourly rate? / What technologies do you use?"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                required
              />
              <small className="field-hint">
                Matched case-insensitively (e.g. small letters, capitals, or mixed will match automatically).
              </small>
            </div>

            <div className="form-group">
              <label>
                Exact Answer Provided by Bot <span className="req">*</span>
              </label>
              <textarea
                rows="4"
                placeholder="Write the exact answer you want Ishwar Chatbot to reply with..."
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                required
              ></textarea>
            </div>

            <div className="form-row-dual">
              <div className="form-group">
                <label>Matching Keywords (Comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. hourly, rate, price, charges, cost, pricing"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                />
                <small className="field-hint">Extra words that trigger this answer.</small>
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="General">General</option>
                  <option value="Skills">Skills</option>
                  <option value="Projects">Projects</option>
                  <option value="Hiring">Hiring / Availability</option>
                  <option value="Contact">Contact</option>
                  <option value="Pricing">Pricing</option>
                </select>
              </div>
            </div>

            <div className="form-footer-bar">
              <label className="checkbox-active-label">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                />
                <span>Active (Enable this answer in Chatbot)</span>
              </label>

              <button type="submit" className="admin-btn admin-btn-primary">
                {isEditing ? <FiCheck /> : <FiPlus />}
                <span>{isEditing ? 'Update Q&A' : 'Save Question & Answer'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* INTERACTIVE CASE-INSENSITIVE MATCHER TESTER */}
        <div className="admin-card qa-tester-card">
          <div className="card-header-styled">
            <div className="card-header-left">
              <span className="card-icon-badge tester-badge">
                <FiPlay />
              </span>
              <div>
                <h2>Live Match Tester</h2>
                <span className="card-subtext">
                  Test case-insensitivity (type in lowercase, UPPERCASE, or keywords).
                </span>
              </div>
            </div>
          </div>

          <div className="tester-body">
            <p className="tester-description">
              Try asking a question in small letters or capital letters to verify that your admin-defined answer matches perfectly:
            </p>

            <div className="tester-input-group">
              <input
                type="text"
                placeholder="Type query e.g. 'what is your tech stack?' or 'HIRE'"
                value={testQuery}
                onChange={(e) => setTestQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTestMatch()}
              />
              <button
                type="button"
                className="btn-test-action"
                onClick={handleTestMatch}
                disabled={testLoading || !testQuery.trim()}
              >
                {testLoading ? 'Testing...' : 'Test Match'}
              </button>
            </div>

            {/* Quick Test Chips */}
            <div className="quick-test-chips">
              <small>Click to test casing:</small>
              <button type="button" onClick={() => { setTestQuery('who is ishwar?'); }}>
                'who is ishwar?' (lowercase)
              </button>
              <button type="button" onClick={() => { setTestQuery('SKILLS'); }}>
                'SKILLS' (UPPERCASE)
              </button>
              <button type="button" onClick={() => { setTestQuery('available for hire?'); }}>
                'available for hire?'
              </button>
            </div>

            {/* Test Results Output */}
            {testResult && (
              <div
                className={`test-result-box ${testResult.matched ? 'is-matched' : 'not-matched'}`}
              >
                {testResult.matched ? (
                  <>
                    <div className="match-status-header">
                      <FiCheck />
                      <strong>Match Found in Database!</strong>
                      {testResult.score && <span className="score-pill">Score: {testResult.score}%</span>}
                    </div>
                    <div className="match-detail">
                      <span className="match-label">Matched Admin Question:</span>
                      <p className="matched-q">{testResult.question}</p>
                    </div>
                    <div className="match-detail">
                      <span className="match-label">Bot Reply:</span>
                      <p className="matched-ans">{testResult.answer}</p>
                    </div>
                  </>
                ) : (
                  <div className="match-status-header not-matched">
                    <FiHelpCircle />
                    <div>
                      <strong>No Admin Database Match</strong>
                      <p>Chatbot will fall back to intelligent general portfolio assistant answers.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH */}
      <div className="qa-list-section">
        <div className="qa-controls-bar">
          <div className="qa-filter-tabs">
            <button
              className={`filter-tab ${filterCategory === 'All' ? 'active' : ''}`}
              onClick={() => setFilterCategory('All')}
            >
              All Categories ({qaList.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-tab ${filterCategory === cat ? 'active' : ''}`}
                onClick={() => setFilterCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="qa-search-box">
            <FiSearch />
            <input
              type="text"
              placeholder="Search Q&A or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Q&A CARDS LIST */}
        <div className="qa-cards-grid">
          {loading && qaList.length === 0 ? (
            <div className="empty-qa-box">
              <div className="spin-loader"></div>
              <p>Loading Q&A from database...</p>
            </div>
          ) : filteredQA.length === 0 ? (
            <div className="empty-qa-box">
              <FiCpu className="empty-icon" />
              <h3>No Questions Found</h3>
              <p>Try creating a new Q&A using the form above or adjust your search term.</p>
            </div>
          ) : (
            filteredQA.map((item) => (
              <div
                key={item._id || item.id}
                className={`qa-item-card ${!item.active ? 'is-inactive' : ''}`}
              >
                <div className="qa-card-top">
                  <div className="qa-meta-tags">
                    <span className="category-pill">{item.category || 'General'}</span>
                    <button
                      type="button"
                      className={`active-pill-btn ${item.active ? 'active' : 'inactive'}`}
                      onClick={() => handleToggleActive(item)}
                      title="Click to toggle active status"
                    >
                      {item.active ? '● Active' : '○ Inactive'}
                    </button>
                  </div>

                  <div className="qa-card-actions">
                    <button
                      type="button"
                      className="btn-card-edit"
                      onClick={() => handleEditClick(item)}
                      title="Edit Q&A"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      type="button"
                      className="btn-card-delete"
                      onClick={() => handleDelete(item._id)}
                      title="Delete Q&A"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>

                <h3 className="qa-question">{item.question}</h3>

                <p className="qa-answer">{item.answer}</p>

                {item.keywords && item.keywords.length > 0 && (
                  <div className="qa-keywords-wrap">
                    <span className="kw-label">
                      <FiTag /> Keywords:
                    </span>
                    <div className="kw-tokens">
                      {(Array.isArray(item.keywords)
                        ? item.keywords
                        : String(item.keywords).split(',')
                      ).map((kw, idx) => (
                        <span key={idx} className="kw-token">
                          {kw.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
