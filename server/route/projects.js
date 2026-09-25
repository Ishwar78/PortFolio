const express = require('express');
const router = express.Router();
const Project = require('../module/Project');

const defaultProjects = [
  {
    slug: 'teamtrack',
    title: 'TeamTrack — Employee Activity Monitoring Platform',
    desc: 'A full-stack employee activity monitoring platform designed to help teams track work activity through screenshots and activity data. The platform provides a centralized interface for monitoring team members, reviewing activity records and managing workforce productivity.',
    overview: 'TeamTrack is an enterprise-grade employee activity and productivity tracking system. It enables organizations to monitor real-time active sessions, track periodic desktop screenshots, review active vs. idle hours, and analyze aggregate workforce metrics through an intuitive dashboard.',
    img: '/assets/projects-preview.png',
    tags: ['React', 'Spring Boot', 'MySQL', 'Activity Monitoring', 'REST API'],
    category: 'Full Stack',
    liveUrl: 'https://multiclout.in/',
    githubUrl: 'https://github.com/Ishwar78',
    status: 'Live & Operational',
    duration: '4 Months',
    role: 'Lead Full Stack Developer',
    features: [
      { title: 'Automated Screenshots', desc: 'Secure periodic desktop captures stored with encrypted timestamps.' },
      { title: 'Activity Analysis', desc: 'Calculates active versus idle duration and productivity ratios.' },
      { title: 'Team Management', desc: 'Role-based access control for team leads, admins, and members.' },
      { title: 'Real-time Metrics', desc: 'Live employee status indicators and daily summary breakdowns.' },
      { title: 'Audit Logs', desc: 'Tamper-proof activity logs for organizational compliance.' },
      { title: 'Admin Controls', desc: 'Configuration for tracking intervals, working hours, and data retention.' },
    ],
    challenges: [
      'Efficient handling and streaming of high-resolution screenshot uploads without server bottlenecks.',
      'Accurate distinction between user active time and system idle periods across operating systems.',
      'Ensuring strict data security and compliance with employee privacy parameters.',
    ],
    solutions: [
      'Implemented chunked image compression and asynchronous S3 bucket upload queues.',
      'Designed heartbeat-based background polling with configurable sensitivity thresholds.',
      'Enforced role-based access control (RBAC) and encrypted storage protocols.',
    ],
    gallery: ['/assets/projects-preview.png', '/assets/project-detail-preview.png'],
  },
  {
    slug: 'thekissancity',
    title: 'TheKissanCity — E-Commerce Shopping Platform',
    desc: 'A complete full-stack e-commerce platform featuring product browsing, categories, shopping cart, customer checkout and payment integration. The system also includes administrative functionality for managing products, inventory and online orders.',
    overview: 'TheKissanCity is an agricultural and consumer-focused e-commerce marketplace empowering direct trade between rural producers and urban buyers. Built with high performance and smooth checkout flows in mind, it handles product cataloging, order fulfillment, and multi-channel payment gateways.',
    category: 'Web Apps',
    tags: ['React', 'Node.js', 'MongoDB', 'E-Commerce', 'Payment Gateway'],
    img: '/assets/project-detail-preview.png',
    liveUrl: 'https://thekissancity.com/',
    githubUrl: 'https://github.com/Ishwar78',
    status: 'Live & In Production',
    duration: '5 Months',
    role: 'Full Stack Web Developer',
    features: [
      { title: 'Product Catalog', desc: 'Multi-category filtering, responsive search, and detailed product variants.' },
      { title: 'Smart Shopping Cart', desc: 'Persistent local & cloud-synced cart with dynamic discount calculations.' },
      { title: 'Payment Gateway', desc: 'Seamless integration with Razorpay/Stripe with webhook verification.' },
      { title: 'Order Tracking', desc: 'Real-time order statuses from pending to dispatched and delivered.' },
      { title: 'Inventory Alerts', desc: 'Automated low-stock threshold notifications for store administrators.' },
      { title: 'Customer Dashboard', desc: 'Order history, profile management, and one-click re-ordering.' },
    ],
    challenges: [
      'Preventing race conditions during checkout for high-demand, limited-stock goods.',
      'Optimizing page load speeds with rich product image galleries on mobile networks.',
      'Handling payment callback edge-cases and network timeouts cleanly.',
    ],
    solutions: [
      'Implemented MongoDB atomic update operations with optimistic locking on inventory decrement.',
      'Configured WebP lazy-loading and responsive image rendering across all viewports.',
      'Built a resilient idempotent webhook listener with auto-reconciliation for payments.',
    ],
    gallery: ['/assets/project-detail-preview.png', '/assets/skills-preview.png'],
  },
  {
    slug: 'uni10',
    title: 'Uni10 — Modern E-Commerce Platform',
    desc: 'A scalable e-commerce web application built for online product discovery and shopping. The platform includes product and collection management, cart functionality, checkout flow, order processing and third-party service integrations for a complete online shopping experience.',
    overview: 'Uni10 delivers a curated shopping experience tailored for digital-native shoppers. With a modern minimalist aesthetic and blazing-fast client transitions, Uni10 handles inventory, discount coupons, real-time cart state, and streamlined invoice generation.',
    category: 'Full Stack',
    tags: ['React', 'Node.js', 'MongoDB', 'REST APIs', 'E-Commerce'],
    img: '/assets/skills-preview.png',
    liveUrl: 'https://uni10.in/',
    githubUrl: 'https://github.com/Ishwar78',
    status: 'Live',
    duration: '3 Months',
    role: 'Frontend & API Developer',
    features: [
      { title: 'Collection Browsing', desc: 'Faceted product filtering by collection, price tier, and availability.' },
      { title: 'Instant Search', desc: 'Debounced search bar with live auto-suggestions and thumbnails.' },
      { title: 'Cart Drawer', desc: 'Smooth slide-out cart drawer with instant quantity adjust and promo code input.' },
      { title: 'Checkout Pipeline', desc: 'Single-page step-by-step address validation and payment processing.' },
      { title: 'Invoice Automation', desc: 'Automatic PDF invoice generation and automated email dispatch.' },
      { title: 'Mobile First Design', desc: 'Tailored touch-friendly navigation optimized for handheld screens.' },
    ],
    challenges: [
      'Ensuring instantaneous UI feedback without excessive API calls during search and filtering.',
      'Maintaining consistent cross-browser cart sync across multiple browser tabs.',
    ],
    solutions: [
      'Implemented custom debounce hooks and in-memory query cache.',
      'Used BroadcastChannel API alongside localStorage listeners for instantaneous multi-tab sync.',
    ],
    gallery: ['/assets/skills-preview.png', '/assets/projects-preview.png'],
  },
  {
    slug: 'skillserve-academy',
    title: 'SkillServe Academy — Education & Learning Platform',
    desc: 'A modern educational website designed to present courses, learning programs and academy information through a clean and responsive interface. Built with React and Redux to provide structured content, smooth navigation and an engaging user experience across devices.',
    overview: 'SkillServe Academy provides career-oriented technical and professional education programs. The web portal features interactive course syllabi, student enrollment inquiries, instructor profiles, and scheduled cohort announcements.',
    category: 'React',
    tags: ['React', 'Redux', 'Tailwind CSS', 'Responsive UI', 'Education'],
    img: '/assets/home-preview.png',
    liveUrl: 'https://www.skillserveacademy.in/',
    githubUrl: 'https://github.com/Ishwar78',
    status: 'Live',
    duration: '2.5 Months',
    role: 'Frontend Developer & UI Specialist',
    features: [
      { title: 'Course Curriculum', desc: 'Accordion-based modular syllabus with duration and prerequisite tags.' },
      { title: 'Student Enrollment', desc: 'Multi-step admission inquiry form with automated email notification.' },
      { title: 'Testimonials & Reviews', desc: 'Interactive student testimonial sliders and alumni success stories.' },
      { title: 'Upcoming Batches', desc: 'Dynamic schedule display with countdowns to upcoming cohort starts.' },
      { title: 'Resource Downloads', desc: 'Gated syllabus brochures and downloadable course guides.' },
      { title: 'SEO Optimized', desc: 'Semantic HTML markup and meta tags targeting high-ranking education terms.' },
    ],
    challenges: [
      'Designing an intuitive course hierarchy that keeps lengthy syllabi digestible on small mobile screens.',
      'Optimizing form conversion rates for student inquiries.',
    ],
    solutions: [
      'Structured syllabi into expandable collapsible cards with quick-scroll navigation.',
      'Simplified inquiry flow to a 30-second mobile-friendly quick form with instant feedback.',
    ],
    gallery: ['/assets/home-preview.png', '/assets/experience-preview.png'],
  },
  {
    slug: 'sk-classes',
    title: 'SK Classes — Study Abroad & Education Platform',
    desc: 'An education-focused web platform designed to provide information and guidance for students planning their study-abroad journey. The website presents programs, services and educational information through a responsive and user-friendly interface.',
    overview: 'SK Classes guides students aspiring to pursue global education opportunities in top international universities. The platform aggregates country guides, visa assistance guidelines, test prep details (IELTS/PTE), and booking for 1-on-1 counseling consultations.',
    category: 'Web Apps',
    tags: ['React', 'Node.js', 'MongoDB', 'Education', 'Responsive Design'],
    img: '/assets/experience-preview.png',
    liveUrl: 'https://skclasses.com/',
    githubUrl: 'https://github.com/Ishwar78',
    status: 'Live',
    duration: '3 Months',
    role: 'Full Stack Developer',
    features: [
      { title: 'Destination Guides', desc: 'In-depth profiles for study destinations (UK, Canada, USA, Europe, Australia).' },
      { title: 'Consultation Booking', desc: 'Integrated appointment scheduler for student counseling sessions.' },
      { title: 'Test Prep Modules', desc: 'Information on training batches, practice mock tests, and faculty.' },
      { title: 'Success Metrics', desc: 'Interactive counters showcasing visa success rates and student placements.' },
      { title: 'Query Helpdesk', desc: 'Quick WhatsApp and email enquiry hooks for prospective applicants.' },
      { title: 'Admin CRM', desc: 'Backend dashboard to manage and follow up with counseling leads.' },
    ],
    challenges: [
      'Handling diverse inquiry types while ensuring counselor follow-ups are routed appropriately.',
      'Keeping international destination requirements current and easy to update.',
    ],
    solutions: [
      'Created structured categorization for inquiries with automated email alerts.',
      'Built a dedicated CMS backend allowing non-technical admins to update country pages.',
    ],
    gallery: ['/assets/experience-preview.png', '/assets/home-preview.png'],
  },
  {
    slug: 'portfolio-website',
    title: 'Ishwar Sharma — Full Stack Developer Portfolio',
    desc: 'A modern professional portfolio showcasing my development experience, technical skills, projects and professional journey. Built with React and Vite with a responsive UI, interactive sections and a Node.js-powered backend for dynamic portfolio content management.',
    overview: 'This comprehensive personal portfolio serves as the central digital showcase for Ishwar Sharma. It features dynamic admin controls for real-time content updates, an interactive AI chatbot with lead generation, case studies, and responsive design across all devices.',
    category: 'Full Stack',
    tags: ['React', 'Vite', 'Node.js', 'MongoDB', 'REST API', 'Responsive UI'],
    img: '/assets/home-preview.png',
    liveUrl: 'https://ishwarweb.in/',
    githubUrl: 'https://github.com/Ishwar78/PortFolio',
    status: 'Ongoing & Maintained',
    duration: 'Continuous',
    role: 'Owner & Full Stack Architect',
    features: [
      { title: 'Dynamic Content Management', desc: 'Comprehensive admin portal to edit hero, about, skills, projects, and contact info.' },
      { title: 'Smart AI Chatbot', desc: 'Interactive portfolio assistant with lead capture and case-insensitive Q&A matching.' },
      { title: 'Lead Capture Engine', desc: 'Automated visitor inquiry storage directly into MongoDB with admin notifications.' },
      { title: 'Dark / Light Themes', desc: 'Dual-theme support with persistent user preferences.' },
      { title: 'High Performance', desc: 'Blazing fast load times using Vite bundling and lazy-loaded assets.' },
      { title: 'Secure Admin Console', desc: 'JWT-authenticated administration suite with real-time stats.' },
    ],
    challenges: [
      'Building a cohesive architecture combining live dynamic database editing with resilient offline/fallback rendering.',
      'Implementing flexible case-insensitive matching for natural visitor questions.',
    ],
    solutions: [
      'Built dual-layer data resolution: MongoDB cloud database with rich fallback defaults.',
      'Engineered token-based multi-tier search matching for chatbot inquiries.',
    ],
    gallery: ['/assets/home-preview.png', '/assets/project-detail-preview.png'],
  },
];

// GET /api/projects - Get all projects (pinned projects first)
router.get('/', async (req, res) => {
  try {
    let projects = await Project.find().sort({ isPinned: -1, pinOrder: 1, createdAt: -1 });

    // Seed default if empty
    if (projects.length === 0) {
      projects = await Project.insertMany(defaultProjects);
    }

    return res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.json(defaultProjects);
  }
});

// PATCH /api/projects/:id/pin - Quick toggle pinned state (Max 6 limit)
router.patch('/:id/pin', async (req, res) => {
  try {
    const { id } = req.params;
    let project = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      project = await Project.findById(id);
    } else {
      project = await Project.findOne({
        $or: [{ slug: id }, { title: new RegExp(`^${id}$`, 'i') }],
      });
    }

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    const nextPinState = !project.isPinned;

    if (nextPinState) {
      const pinnedCount = await Project.countDocuments({ isPinned: true });
      if (pinnedCount >= 6) {
        return res.status(400).json({
          success: false,
          message: 'Maximum 6 projects can be pinned to top! Please unpin another project first.',
        });
      }
    }

    project.isPinned = nextPinState;
    if (nextPinState) {
      project.pinOrder = Date.now();
    }
    await project.save();

    return res.json({
      success: true,
      isPinned: project.isPinned,
      project,
      message: project.isPinned ? 'Project pinned to top!' : 'Project unpinned successfully.',
    });
  } catch (error) {
    console.error('Error toggling project pin:', error);
    return res.status(500).json({ success: false, message: 'Failed to toggle project pin.' });
  }
});

// GET /api/projects/:id - Get single project by slug or ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    let project = null;

    // 1. Try finding by MongoDB _id
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      project = await Project.findById(id);
    }

    // 2. Try finding by slug or title
    if (!project) {
      project = await Project.findOne({
        $or: [{ slug: id }, { title: new RegExp(`^${id}$`, 'i') }],
      });
    }

    const defaultMatch = defaultProjects.find(
      (p) =>
        p.slug === id ||
        (project && p.slug === project.slug) ||
        p.title.toLowerCase().includes(id.toLowerCase()) ||
        id.toLowerCase().includes(p.slug)
    );

    if (project) {
      const merged = {
        ...(defaultMatch || {}),
        ...project.toObject(),
      };
      return res.json({ success: true, project: merged });
    }

    if (defaultMatch) {
      return res.json({ success: true, project: defaultMatch });
    }

    return res.json({ success: true, project: defaultProjects[0] });
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    const fallback = defaultProjects.find((p) => p.slug === id) || defaultProjects[0];
    return res.json({ success: true, project: fallback });
  }
});

// POST /api/projects - Add a new project
router.post('/', async (req, res) => {
  try {
    if (req.body.isPinned) {
      const pinnedCount = await Project.countDocuments({ isPinned: true });
      if (pinnedCount >= 6) {
        return res.status(400).json({
          success: false,
          message: 'Maximum 6 projects can be pinned to top! Please unpin another project first.',
        });
      }
    }
    const newProject = new Project(req.body);
    await newProject.save();
    return res.status(201).json({ success: true, project: newProject });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create project.' });
  }
});

// PUT /api/projects/:id - Update project
router.put('/:id', async (req, res) => {
  try {
    if (req.body.isPinned) {
      const existing = await Project.findById(req.params.id);
      if (!existing || !existing.isPinned) {
        const pinnedCount = await Project.countDocuments({ isPinned: true });
        if (pinnedCount >= 6) {
          return res.status(400).json({
            success: false,
            message: 'Maximum 6 projects can be pinned to top! Please unpin another project first.',
          });
        }
      }
    }

    let updated = null;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    } else {
      updated = await Project.findOneAndUpdate(
        { $or: [{ slug: req.params.id }, { title: new RegExp(`^${req.params.id}$`, 'i') }] },
        req.body,
        { new: true }
      );
      if (!updated) {
        const newProj = new Project({ ...req.body, slug: req.params.id });
        await newProj.save();
        updated = newProj;
      }
    }
    return res.json({ success: true, project: updated });
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({ success: false, message: 'Failed to update project.' });
  }
});

// DELETE /api/projects/:id - Delete project
router.delete('/:id', async (req, res) => {
  try {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      await Project.findByIdAndDelete(req.params.id);
    } else {
      await Project.findOneAndDelete({ slug: req.params.id });
    }
    return res.json({ success: true, message: 'Project deleted.' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete project.' });
  }
});

module.exports = router;
