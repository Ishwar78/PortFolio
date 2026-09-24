const express = require('express');
const router = express.Router();
const Project = require('../module/Project');

const defaultProjects = [
  {
    title: 'E-Commerce Shopping Cart',
    desc: 'A full-stack shopping website with cart, payment integration and admin panel.',
    img: '/assets/projects-preview.png',
    tags: ['React', 'Spring Boot', 'MySQL'],
    category: 'Full Stack',
    liveUrl: '#',
    githubUrl: 'https://github.com/',
    status: 'Completed',
  },
  {
    title: 'Hotel Booking Management',
    desc: 'Hotel booking system with user & admin panel, room management and online booking.',
    img: '/assets/project-detail-preview.png',
    tags: ['React', 'Node.js', 'MongoDB'],
    category: 'Web Apps',
    liveUrl: '#',
    githubUrl: 'https://github.com/',
    status: 'Completed',
  },
  {
    title: 'Expense Tracker',
    desc: 'Track your daily expenses with charts and reports. Simple and efficient.',
    img: '/assets/skills-preview.png',
    tags: ['React', 'Node.js', 'MongoDB'],
    category: 'React',
    liveUrl: '#',
    githubUrl: 'https://github.com/',
    status: 'Completed',
  },
  {
    title: 'Myntra Clone',
    desc: 'A responsive e-commerce frontend clone with modern UI/UX.',
    img: '/assets/home-preview.png',
    tags: ['React', 'Redux', 'Tailwind CSS'],
    category: 'React',
    liveUrl: '#',
    githubUrl: 'https://github.com/',
    status: 'Completed',
  },
  {
    title: 'Bank Management System',
    desc: 'A core Java application to manage customers, accounts, transactions and more.',
    img: '/assets/experience-preview.png',
    tags: ['Java', 'MySQL', 'Swing'],
    category: 'Java',
    liveUrl: '#',
    githubUrl: 'https://github.com/',
    status: 'Completed',
  },
  {
    title: 'Portfolio Website',
    desc: 'My personal portfolio built with React and modern UI design.',
    img: '/assets/home-preview.png',
    tags: ['React', 'Vite', 'CSS'],
    category: 'Web Apps',
    liveUrl: '#',
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
