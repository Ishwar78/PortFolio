const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const seedAdmin = require('./config/seedAdmin');

// Routes
const { router: authRouter } = require('./route/auth');
const inquiriesRouter = require('./route/inquiries');
const projectsRouter = require('./route/projects');
const contentRouter = require('./route/content');
const aboutRouter = require('./route/about');
const contactRouter = require('./route/contact');
const skillsRouter = require('./route/skills');
const experienceRouter = require('./route/experience');
const chatbotRouter = require('./route/chatbot');
const blogsRouter = require('./route/blogs');
const Inquiry = require('./module/Inquiry');
const Project = require('./module/Project');
const ChatbotLead = require('./module/ChatbotLead');
const Blog = require('./module/Blog');

const app = express();
const PORT = process.env.PORT || 6095;

// Middleware
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    message: 'Ishwar Portfolio Server running smoothly 🚀',
  });
});

// Admin Stats Endpoint
app.get('/api/admin/stats', async (req, res) => {
  try {
    const [totalInquiries, unreadInquiries, totalProjects, totalBotLeads, newBotLeads, totalBlogs] =
      await Promise.all([
        Inquiry.countDocuments(),
        Inquiry.countDocuments({ status: 'unread' }),
        Project.countDocuments(),
        ChatbotLead.countDocuments(),
        ChatbotLead.countDocuments({ status: 'new' }),
        Blog.countDocuments(),
      ]);

    res.json({
      success: true,
      stats: {
        totalInquiries,
        unreadInquiries,
        totalProjects: totalProjects || 6,
        totalSkills: 12,
        totalExperience: 3,
        totalBotLeads,
        newBotLeads,
        totalBlogs: totalBlogs || 3,
        dbStatus: 'Connected',
      },
    });
  } catch (error) {
    res.json({
      success: true,
      stats: {
        totalInquiries: 0,
        unreadInquiries: 0,
        totalProjects: 6,
        totalSkills: 12,
        totalExperience: 3,
        totalBotLeads: 0,
        newBotLeads: 0,
        totalBlogs: 3,
        dbStatus: 'Fallback',
      },
    });
  }
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/admin', authRouter); // Supports both /api/admin/login and /api/auth/login
app.use('/api/inquiries', inquiriesRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/content', contentRouter);
app.use('/api/about', aboutRouter);
app.use('/api/contact', contactRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/experience', experienceRouter);
app.use('/api/chatbot', chatbotRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/homeskills', require('./route/homeSkills'));

// =====================================================
// DYNAMIC SEO META TAG INJECTOR FOR BLOGS & WEB PAGES
// Enables SEO Title, Description, Keywords to appear in:
// 1. Browser Tab & Page Elements
// 2. DevTools Console (styled logs)
// 3. Page Source Code (Ctrl + U)
// =====================================================
const serveWithSeoMeta = async (req, res, next) => {
  const distHtml = path.join(__dirname, '..', 'dist', 'index.html');
  const rootHtml = path.join(__dirname, '..', 'index.html');
  const templatePath = fs.existsSync(distHtml) ? distHtml : (fs.existsSync(rootHtml) ? rootHtml : null);

  if (!templatePath) {
    return next();
  }

  try {
    let html = fs.readFileSync(templatePath, 'utf8');
    const slug = req.params.slug;

    let seoTitle = 'Ishwar Sharma | Full Stack Developer';
    let seoDesc = 'Full-stack software developer specializing in React, Node.js, Spring Boot, MySQL, and scalable cloud solutions.';
    let seoKeywords = 'Ishwar Sharma, Full Stack Developer, React, Node.js, Spring Boot, Web Development, Portfolio';
    let seoImg = '/assets/projects-preview.png';
    let pageUrl = `https://ishwarweb.in/blog/${slug || ''}`;

    if (slug) {
      let blog = null;
      if (slug.match(/^[0-9a-fA-F]{24}$/)) {
        blog = await Blog.findById(slug);
      }
      if (!blog) {
        blog = await Blog.findOne({ slug });
      }

      if (blog) {
        seoTitle = blog.metaTitle || blog.title || seoTitle;
        seoDesc = blog.metaDescription || blog.excerpt || seoDesc;
        seoKeywords = blog.metaKeywords || (Array.isArray(blog.tags) ? blog.tags.join(', ') : '') || seoKeywords;
        seoImg = blog.image || seoImg;
      }
    }

    const clean = (str = '') => String(str).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const metaTags = `
    <!-- Dynamic SEO Meta Tags (Visible in Ctrl+U Source Code) -->
    <title>${clean(seoTitle)} | Ishwar Sharma</title>
    <meta name="title" content="${clean(seoTitle)}" />
    <meta name="description" content="${clean(seoDesc)}" />
    <meta name="keywords" content="${clean(seoKeywords)}" />
    <meta name="author" content="Ishwar Sharma" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${pageUrl}" />

    <!-- Open Graph / Social Sharing -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:title" content="${clean(seoTitle)}" />
    <meta property="og:description" content="${clean(seoDesc)}" />
    <meta property="og:image" content="${seoImg}" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${pageUrl}" />
    <meta name="twitter:title" content="${clean(seoTitle)}" />
    <meta name="twitter:description" content="${clean(seoDesc)}" />
    <meta name="twitter:image" content="${seoImg}" />
    `;

    // Remove old title and inject metaTags before </head>
    html = html.replace(/<title>.*?<\/title>/i, '');
    html = html.replace('</head>', `${metaTags}\n  </head>`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(html);
  } catch (error) {
    console.error('Error injecting dynamic SEO tags:', error);
    return next();
  }
};

// Route for blog details with SEO metadata injected
app.get('/blog/:slug', serveWithSeoMeta);

// Serve static build if dist directory exists
const distDir = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));

  // SPA fallback for all other frontend routes
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.originalUrl.startsWith('/api')) {
      return res.sendFile(path.join(distDir, 'index.html'));
    }
    next();
  });
}

// 404 Route handler for unhandled API routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start Server and Connect Database
const startServer = async () => {
  try {
    const conn = await connectDB();
    if (conn) {
      await seedAdmin();
    }

    app.listen(PORT, () => {
      console.log(`
=====================================================
🚀 Server is running on http://localhost:${PORT}
📁 API Base URL: http://localhost:${PORT}/api
🔐 Admin Portal: http://localhost:${PORT}/api/auth/login
⚡ MongoDB: ${conn ? 'Connected & Ready' : 'Connection Pending'}
=====================================================
      `);
    });
  } catch (error) {
    console.error('Fatal error starting server:', error);
  }
};

startServer();
