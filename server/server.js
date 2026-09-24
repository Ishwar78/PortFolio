require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const seedAdmin = require('./config/seedAdmin');

// Routes
const { router: authRouter } = require('./route/auth');
const inquiriesRouter = require('./route/inquiries');
const projectsRouter = require('./route/projects');
const Inquiry = require('./module/Inquiry');
const Project = require('./module/Project');

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    const [totalInquiries, unreadInquiries, totalProjects] = await Promise.all([
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'unread' }),
      Project.countDocuments(),
    ]);

    res.json({
      success: true,
      stats: {
        totalInquiries,
        unreadInquiries,
        totalProjects: totalProjects || 6,
        totalSkills: 12,
        totalExperience: 3,
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

// 404 Route handler
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
