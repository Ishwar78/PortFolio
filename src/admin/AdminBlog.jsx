import React, { useState, useEffect, useMemo } from 'react';
import {
  FiBookOpen,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiSearch,
  FiCheckCircle,
  FiX,
  FiCalendar,
  FiClock,
  FiUploadCloud,
  FiTag,
  FiLayers,
} from 'react-icons/fi';
import { portfolioApi } from '../lib/api';
import RichTextEditor from '../components/RichTextEditor';
import './AdminBlog.css';

const defaultBlogs = [
  {
    title: 'How I Build Modern Full Stack Web Applications',
    slug: 'how-i-build-modern-full-stack-web-applications',
    category: 'Development',
    date: 'Sep 24, 2026',
    readTime: '6 min read',
    image: '/assets/projects-preview.png',
    excerpt:
      'A practical look at how I approach building scalable and modern full stack web applications.',
    tags: ['React', 'Java', 'Spring Boot', 'MySQL'],
    published: true,
  },
  {
    title: 'Why React Is Useful for Modern Frontend Development',
    slug: 'why-react-is-useful-for-modern-frontend-development',
    category: 'React',
    date: 'Sep 20, 2026',
    readTime: '5 min read',
    image: '/assets/project-detail-preview.png',
    excerpt:
      'Understanding component-based development and why React is widely used for modern web applications.',
    tags: ['React', 'JavaScript', 'Frontend'],
    published: true,
  },
  {
    title: 'My Developer Journey and What I Am Learning',
    slug: 'my-developer-journey-and-what-i-am-learning',
    category: 'Career',
    date: 'Sep 15, 2026',
    readTime: '4 min read',
    image: '/assets/skills-preview.png',
    excerpt:
      'A personal update about my development journey, projects, and technologies I am exploring.',
    tags: ['Career', 'Learning', 'Developer'],
    published: true,
  },
];

const slugify = (text = '') =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export default function AdminBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [toast, setToast] = useState('');

  const initialForm = {
    title: '',
    slug: '',
    category: 'Development',
    excerpt: '',
    content: '',
    image: '/assets/projects-preview.png',
    date: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    readTime: '5 min read',
    tags: 'React, Java, Spring Boot',
    published: true,
    featured: false,
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await portfolioApi.getBlogs();
      if (res && res.blogs) {
        setBlogs(res.blogs);
      } else {
        setBlogs(defaultBlogs);
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setBlogs(defaultBlogs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openAddModal = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData(initialForm);
    setShowModal(true);
  };

  const openEditModal = (blog) => {
    setIsEditing(true);
    setEditId(blog._id || blog.slug || blog.id);
    setFormData({
      title: blog.title || '',
      slug: blog.slug || slugify(blog.title || ''),
      category: blog.category || 'Development',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      image: blog.image || '/assets/projects-preview.png',
      date: blog.date || '',
      readTime: blog.readTime || '5 min read',
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags || '',
      published: blog.published !== undefined ? blog.published : true,
      featured: Boolean(blog.featured),
    });
    setShowModal(true);
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: !isEditing ? slugify(val) : prev.slug,
    }));
  };

  // Image Upload Base64
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Blog Title is required.');
      return;
    }

    const finalSlug = (formData.slug.trim() || slugify(formData.title)).trim();

    const payload = {
      title: formData.title.trim(),
      slug: finalSlug,
      category: formData.category,
      excerpt: formData.excerpt.trim(),
      content: formData.content,
      image: formData.image,
      date: formData.date || undefined,
      readTime: formData.readTime,
      tags: formData.tags,
      published: formData.published,
      featured: formData.featured,
    };

    try {
      if (isEditing && editId) {
        const res = await portfolioApi.updateBlog(editId, payload);
        if (res && res.blog) {
          setBlogs((prev) =>
            prev.map((b) => ((b._id === editId || b.slug === editId || b.id === editId) ? res.blog : b))
          );
        } else {
          setBlogs((prev) =>
            prev.map((b) => ((b._id === editId || b.slug === editId || b.id === editId) ? { ...b, ...payload } : b))
          );
        }
        setToast('Blog article updated successfully!');
      } else {
        const res = await portfolioApi.createBlog(payload);
        if (res && res.blog) {
          setBlogs((prev) => [res.blog, ...prev]);
        } else {
          setBlogs((prev) => [{ ...payload, _id: Date.now().toString() }, ...prev]);
        }
        setToast('New blog article published successfully!');
      }
      setShowModal(false);
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      console.error('Error saving blog:', err);
      setToast('Saved locally (Server error)');
      setShowModal(false);
      setTimeout(() => setToast(''), 3000);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await portfolioApi.deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b._id !== id && b.slug !== id && b.id !== id));
      setToast('Blog article deleted successfully.');
      setTimeout(() => setToast(''), 2500);
    } catch (err) {
      console.error('Failed to delete blog:', err);
      setBlogs((prev) => prev.filter((b) => b._id !== id && b.slug !== id && b.id !== id));
      setToast('Article removed.');
      setTimeout(() => setToast(''), 2500);
    }
  };

  const handleTogglePublish = async (blog) => {
    try {
      const updatedStatus = !blog.published;
      const bId = blog._id || blog.slug || blog.id;
      await portfolioApi.updateBlog(bId, { published: updatedStatus });
      setBlogs((prev) =>
        prev.map((b) => (b._id === bId || b.slug === bId ? { ...b, published: updatedStatus } : b))
      );
      setToast(`Article marked as ${updatedStatus ? 'Published' : 'Draft'}.`);
      setTimeout(() => setToast(''), 2000);
    } catch (err) {
      console.error('Failed to toggle publish status:', err);
    }
  };

  const categories = useMemo(() => {
    const set = new Set(['All', 'Development', 'React', 'Career', 'Programming', 'Tutorials']);
    blogs.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return Array.from(set);
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchesCat = filterCategory === 'All' || b.category === filterCategory;
      const term = searchTerm.toLowerCase().trim();
      const tagsStr = Array.isArray(b.tags) ? b.tags.join(' ') : b.tags || '';
      const matchesSearch =
        !term ||
        b.title.toLowerCase().includes(term) ||
        b.excerpt?.toLowerCase().includes(term) ||
        tagsStr.toLowerCase().includes(term);
      return matchesCat && matchesSearch;
    });
  }, [blogs, filterCategory, searchTerm]);

  return (
    <section className="blog-admin-page">
      {/* Toast Feedback */}
      {toast && <div className="admin-toast">{toast}</div>}

      {/* Header Box */}
      <div className="admin-header-box">
        <div>
          <div className="header-eyebrow">
            <span></span>
            BLOG & ARTICLES MANAGEMENT
          </div>
          <h1>
            Blog <span>Articles</span>
          </h1>
          <p>
            Create, edit, and publish technical insights, project journeys, and tutorials with rich text formatting and cover image uploads.
          </p>
        </div>

        <button
          type="button"
          className="admin-btn admin-btn-primary"
          onClick={openAddModal}
        >
          <FiPlus />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Toolbar: Category Pills & Search */}
      <div className="blog-toolbar">
        <div className="filter-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${filterCategory === cat ? 'active' : ''}`}
              onClick={() => setFilterCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="blog-search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="Search articles by title, tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="blog-admin-grid">
        {loading && blogs.length === 0 ? (
          <div className="empty-blogs-box">
            <div className="spin-loader"></div>
            <p>Loading articles from database...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="empty-blogs-box">
            <FiBookOpen className="empty-icon" />
            <h3>No articles found</h3>
            <p>Click "Write New Article" to compose your first blog post.</p>
          </div>
        ) : (
          filteredBlogs.map((b) => {
            const blogId = b._id || b.slug || b.id;
            return (
              <div key={blogId} className="blog-admin-card">
                <div className="blog-card-thumb">
                  <img
                    src={b.image || '/assets/projects-preview.png'}
                    alt={b.title}
                    onError={(e) => (e.target.src = '/assets/projects-preview.png')}
                  />
                  <span className="blog-cat-badge">{b.category}</span>
                  <button
                    type="button"
                    className={`blog-publish-badge ${b.published ? 'live' : 'draft'}`}
                    onClick={() => handleTogglePublish(b)}
                    title="Click to toggle publish status"
                  >
                    {b.published ? '● Published' : '○ Draft'}
                  </button>
                </div>

                <div className="blog-card-body">
                  <div className="blog-meta-row">
                    <span>
                      <FiCalendar /> {b.date}
                    </span>
                    <span>
                      <FiClock /> {b.readTime || '5 min read'}
                    </span>
                  </div>

                  <h3 className="blog-title">{b.title}</h3>
                  <p className="blog-excerpt">{b.excerpt}</p>

                  <div className="blog-tags-row">
                    {(Array.isArray(b.tags) ? b.tags : String(b.tags).split(',')).map((t, idx) => (
                      <span key={idx} className="blog-tag-pill">
                        {String(t).trim()}
                      </span>
                    ))}
                  </div>

                  <div className="blog-card-footer">
                    <a
                      href={`/blog/${b.slug || blogId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-preview-link"
                    >
                      <FiEye /> View Live
                    </a>

                    <div className="blog-card-actions">
                      <button
                        type="button"
                        className="btn-card-edit"
                        onClick={() => openEditModal(b)}
                        title="Edit Article"
                      >
                        <FiEdit /> Edit
                      </button>

                      <button
                        type="button"
                        className="btn-card-delete"
                        onClick={() => handleDelete(blogId, b.title)}
                        title="Delete Article"
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

      {/* ADD / EDIT ARTICLE MODAL */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="admin-modal-box modal-wide"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-title-wrap">
                <FiBookOpen className="modal-header-icon" />
                <div>
                  <h2>{isEditing ? 'Edit Blog Article' : 'Write New Blog Article'}</h2>
                  <span>Rich text editor formatting, cover images, and tags.</span>
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

            <form onSubmit={handleSubmit} className="blog-modal-form">
              <div className="modal-scroll-body">
                <div className="form-group">
                  <label>
                    Article Title <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. How I Build Modern Full Stack Web Applications"
                    value={formData.title}
                    onChange={handleTitleChange}
                    required
                  />
                </div>

                <div className="form-row-dual">
                  <div className="form-group">
                    <label>Article Slug (URL Path)</label>
                    <input
                      type="text"
                      placeholder="e.g. how-i-build-modern-full-stack-web-applications"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    />
                    <small className="field-hint">Accessible at /blog/{formData.slug || 'your-slug'}</small>
                  </div>

                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Development">Development</option>
                      <option value="React">React</option>
                      <option value="Java">Java / Spring Boot</option>
                      <option value="Career">Career & Journey</option>
                      <option value="Programming">Programming</option>
                      <option value="Tutorials">Tutorials</option>
                    </select>
                  </div>
                </div>

                <div className="form-row-dual">
                  <div className="form-group">
                    <label>Reading Time</label>
                    <input
                      type="text"
                      placeholder="e.g. 5 min read"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Publication Date</label>
                    <input
                      type="text"
                      placeholder="e.g. Sep 24, 2026"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Excerpt / Short Summary (Shown on Blog Cards)</label>
                  <textarea
                    rows="2"
                    placeholder="Brief 1-2 sentence preview for visitors..."
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  />
                </div>

                {/* Cover Image Upload */}
                <div className="form-group upload-section-card">
                  <label className="section-subtitle">
                    Article Cover Image (Upload from Device)
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
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                    </label>

                    {formData.image && (
                      <div className="image-preview-box">
                        <img
                          src={formData.image}
                          alt="Cover Preview"
                          onError={(e) => (e.target.src = '/assets/projects-preview.png')}
                        />
                        <span className="preview-label">Cover Preview</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Rich Text Editor for Content */}
                <div className="form-group">
                  <label>
                    Complete Article Content (Rich Text Editor) <span className="req">*</span>
                  </label>
                  <small className="field-hint" style={{ marginBottom: '8px', display: 'block' }}>
                    Use the toolbar to format Headings (H2, H3), bold text, bullet points, quotes, code blocks, and links.
                  </small>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(html) => setFormData({ ...formData, content: html })}
                    placeholder="Start writing your article here..."
                  />
                </div>

                <div className="form-group">
                  <label>Tags (Comma separated)</label>
                  <input
                    type="text"
                    placeholder="React, Java, Spring Boot, Architecture"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  />
                </div>

                <div className="form-footer-switches">
                  <label className="checkbox-active-label">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    />
                    <span>Publish Immediately (Make article live on portfolio)</span>
                  </label>
                </div>
              </div>

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
                  <span>{isEditing ? 'Save Article Changes' : 'Publish Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
