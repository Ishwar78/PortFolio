const express = require('express');
const router = express.Router();
const Project = require('../module/Project');

const defaultProjects = [
  {
    title: 'TeamTrack — Employee Activity Monitoring Platform',
      desc: 'A full-stack employee activity monitoring platform designed to help teams track work activity through screenshots and activity data. The platform provides a centralized interface for monitoring team members, reviewing activity records and managing workforce productivity.',
    img: '/assets/projects-preview.png',
    tags: ['React', 'Spring Boot', 'MySQL'],
    category: 'Full Stack',
    liveUrl: 'https://multiclout.in/',
    githubUrl: 'https://github.com/',
    status: 'Completed',
  },
  {
    title: 'TheKissanCity — E-Commerce Shopping Platform',
      desc: 'A complete full-stack e-commerce platform featuring product browsing, categories, shopping cart, customer checkout and payment integration. The system also includes administrative functionality for managing products, inventory and online orders.',
      category: 'Web Apps',
      tags: ['React', 'Node.js', 'MongoDB'],
      img: '/assets/project-detail-preview.png',
      liveUrl: 'https://thekissancity.com/',
      githubUrl: 'https://github.com/',
      status: 'Completed',
  },
  {
    title: 'Uni10 — Modern E-Commerce Platform',
      desc: 'A scalable e-commerce web application built for online product discovery and shopping. The platform includes product and collection management, cart functionality, checkout flow, order processing and third-party service integrations for a complete online shopping experience.',
      category: 'Web',
      tags: ['React', 'Node.js', 'MongoDB'],
      img: '/assets/skills-preview.png',
      liveUrl: 'https://uni10.in/',
      githubUrl: 'https://github.com/',
      status: 'Completed',
  },
  {
    title: 'SkillServe Academy — Education & Learning Platform',
      desc: 'A modern educational website designed to present courses, learning programs and academy information through a clean and responsive interface. Built with React and Redux to provide structured content, smooth navigation and an engaging user experience across devices. ',
      category: 'React',
      tags: ['React', 'Redux', 'Tailwind CSS'],
      img: '/assets/home-preview.png',
      liveUrl: 'https://www.skillserveacademy.in/',
      githubUrl: 'https://github.com/',
      status: 'Completed',
  },
  {
      title: 'SK Classes — Study Abroad & Education Platform',
      desc: '',
      category: 'Java',
      tags: ['React', 'Node.js ', 'Mongo db'],
      img: '/assets/experience-preview.png',
      liveUrl: 'https://skclasses.com/',
      githubUrl: 'https://github.com/',
      status: 'Completed',
  },
  {
    title: 'Portfolio Website',
      desc: 'An education-focused web platform designed to provide information and guidance for students planning their study-abroad journey. The website presents programs, services and educational information through a responsive and user-friendly interface.',
      category: 'Web Apps',
      tags: ['React', 'Vite', 'Node.js'],
      img: '/assets/home-preview.png',
      liveUrl: 'https://ishwarweb.in/',
      githubUrl: 'https://github.com/',
      status: 'Ongoing',
  },
];

// GET /api/projects - Get all projects
router.get('/', async (req, res) => {
  try {
    let projects = await Project.find().sort({ createdAt: -1 });

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

// POST /api/projects - Add a new project
router.post('/', async (req, res) => {
  try {
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
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json({ success: true, project: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update project.' });
  }
});

// DELETE /api/projects/:id - Delete project
router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Project deleted.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete project.' });
  }
});

module.exports = router;
