const express = require('express');
const router = express.Router();
const Blog = require('../module/Blog');

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
    content: `
      <h2>Planning the Application</h2>
      <p>Building a modern web application is not only about writing code. A good application requires a clear architecture, thoughtful user experience, reliable backend APIs, and a maintainable codebase.</p>
      <p>Before starting development, I first understand the core requirements and divide the application into smaller modular domains. This makes the project easier to develop, test, and scale.</p>
      
      <h2>Frontend Development with React</h2>
      <p>For frontend development, I prefer React because it allows me to create reusable components and build interactive interfaces efficiently. I focus on responsive layouts, clean navigation, state management, and intuitive user experiences.</p>
      
      <h2>Backend Architecture & APIs</h2>
      <p>The backend is responsible for business logic, authentication, database communication, and secure APIs. Depending on the project requirements, I work with Java and Spring Boot or Node.js with Express.</p>
      
      <h2>Database & Data Integrity</h2>
      <p>A well-designed database structure is important for application performance and scalability. I normally use MySQL for relational data or MongoDB for flexible document-based models.</p>
      
      <h2>Final Thoughts</h2>
      <p>The goal is always to build software that is easy to understand, easy to maintain, and delivers real value for real users.</p>
    `,
    author: {
      name: 'Ishwar Sharma',
      role: 'Full Stack Developer',
      avatar: 'I',
    },
    featured: true,
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
    tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
    content: `
      <h2>Component-Based Architecture</h2>
      <p>React provides a modular component-based approach for building modern user interfaces. Instead of creating an entire page as one large block, applications are divided into isolated, reusable building blocks.</p>
      
      <h2>Smooth User Experience & Virtual DOM</h2>
      <p>React applications update specific parts of the interface seamlessly without requiring a complete browser reload, resulting in an app-like fast experience.</p>
      
      <h2>Ecosystem and Tooling</h2>
      <p>With tools like Vite, React Router, Redux Toolkit, and Tailwind CSS, building responsive and production-grade applications is faster and more reliable than ever.</p>
    `,
    author: {
      name: 'Ishwar Sharma',
      role: 'Full Stack Developer',
      avatar: 'I',
    },
    featured: false,
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
    tags: ['Career', 'Learning', 'Full Stack', 'Developer'],
    content: `
      <h2>Learning Through Real Projects</h2>
      <p>Every project teaches something new. My development journey has involved building full-stack applications with Spring Boot, Node.js, React, and databases like MySQL and MongoDB.</p>
      
      <h2>Continuous Growth</h2>
      <p>I continue exploring modern frontend development, scalable backend architecture, cloud hosting, REST APIs, and automated deployment pipelines.</p>
    `,
    author: {
      name: 'Ishwar Sharma',
      role: 'Full Stack Developer',
      avatar: 'I',
    },
    featured: false,
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

// GET /api/blogs - Fetch all blogs
router.get('/', async (req, res) => {
  try {
    let blogs = await Blog.find().sort({ createdAt: -1 });

    if (blogs.length === 0) {
      blogs = await Blog.insertMany(defaultBlogs);
    }

    return res.json({ success: true, count: blogs.length, blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return res.json({ success: true, count: defaultBlogs.length, blogs: defaultBlogs });
  }
});

// GET /api/blogs/:slug - Fetch single blog by slug or ID
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    let blog = null;

    // 1. Try finding by MongoDB ID
    if (slug.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(slug);
    }

    // 2. Try finding by slug
    if (!blog) {
      blog = await Blog.findOne({ slug });
    }

    // 3. Fallback to default blogs
    if (!blog) {
      blog = defaultBlogs.find(
        (b) => b.slug === slug || slugify(b.title) === slug || String(b.id) === String(slug)
      );
    }

    if (blog) {
      return res.json({ success: true, blog });
    }

    return res.status(404).json({ success: false, message: 'Blog article not found.' });
  } catch (error) {
    console.error('Error fetching blog detail:', error);
    const fallback = defaultBlogs.find((b) => b.slug === slug) || defaultBlogs[0];
    return res.json({ success: true, blog: fallback });
  }
});

// POST /api/blogs - Create new blog article
router.post('/', async (req, res) => {
  try {
    const { title, slug, category, excerpt, content, image, date, readTime, tags, featured, published } =
      req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Article title is required.' });
    }

    let finalSlug = (slug && slug.trim() ? slug : slugify(title)).trim();

    // Check slug collision
    const existing = await Blog.findOne({ slug: finalSlug });
    if (existing) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    let parsedTags = [];
    if (Array.isArray(tags)) {
      parsedTags = tags.map((t) => String(t).trim()).filter(Boolean);
    } else if (typeof tags === 'string') {
      parsedTags = tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    }

    const newBlog = new Blog({
      title: title.trim(),
      slug: finalSlug,
      category: category ? category.trim() : 'Development',
      excerpt: excerpt ? excerpt.trim() : '',
      content: content || '',
      image: image || '/assets/projects-preview.png',
      date: date || undefined,
      readTime: readTime ? readTime.trim() : '5 min read',
      tags: parsedTags,
      featured: Boolean(featured),
      published: published !== undefined ? Boolean(published) : true,
    });

    await newBlog.save();
    return res.status(201).json({ success: true, blog: newBlog });
  } catch (error) {
    console.error('Error creating blog article:', error);
    return res.status(500).json({ success: false, message: 'Failed to create blog article.' });
  }
});

// PUT /api/blogs/:id - Update existing blog
router.put('/:id', async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.title && !updateData.slug) {
      updateData.slug = slugify(updateData.title);
    }

    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    }

    const updated = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Blog article not found.' });
    }

    return res.json({ success: true, blog: updated });
  } catch (error) {
    console.error('Error updating blog article:', error);
    return res.status(500).json({ success: false, message: 'Failed to update blog article.' });
  }
});

// DELETE /api/blogs/:id - Delete blog article
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Blog article not found.' });
    }
    return res.json({ success: true, message: 'Blog article deleted successfully.' });
  } catch (error) {
    console.error('Error deleting blog article:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete blog article.' });
  }
});

module.exports = router;
