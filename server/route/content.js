const express = require('express');
const router = express.Router();
const Content = require('../module/Content');

// Default initial content for home & contact
const defaultHomeContent = {
  // Hero section
  hero: {
    eyebrow: 'FULL STACK DEVELOPER',
    smallTitle: "HELLO, I'M",
    titleLine1: 'Ishwar',
    titleLine2: 'Sharma.',
    roleHighlight: 'real-world problems.',
    roleHeadline: 'I build modern web applications that solve real-world problems.',
    description:
      'Full Stack Developer focused on creating scalable, responsive and high-performance digital experiences using React, Java, Spring Boot, Node.js and modern web technologies.',
    primaryBtnText: 'View My Work',
    primaryBtnLink: '/projects',
    secondaryBtnText: "Let's Talk",
    secondaryBtnLink: '/contact',
    resumeLink: '/resume.pdf',
    resumeText: 'Resume',
    githubUrl: 'https://github.com/',
    linkedinUrl: 'https://linkedin.com/',
    twitterUrl: 'https://twitter.com/',
    email: 'ishwarweb@gmail.com',
    noteText: 'Always learning. Always building.',
    image: '/assets/ishwar-profile.jpg',
    stat1Number: '2+',
    stat1Label: 'Years Experience',
    stat2Number: '10+',
    stat2Label: 'Projects Built',
    stat3Number: '100%',
    stat3Label: 'Commitment',
  },
  // About section on Home page
  homeAbout: {
    eyebrow: 'ABOUT ME',
    headingMain: 'Turning Ideas Into',
    headingHighlight: 'Real-World Solutions.',
    description:
      "I'm a Full Stack Developer with a strong foundation in Java, Spring Boot, React and modern web technologies. I enjoy building complete web applications — from intuitive user interfaces to robust backend systems — while continuously improving my development approach.",
    location: 'Rohtak, Haryana',
    education: 'MCA – MDU Rohtak',
    email: 'ishwarweb@gmail.com',
    btnText: 'More About Me',
    btnLink: '/about',
    image: '/assets/ishwar-profile.jpg',
    badgeTop: 'DEVELOPER',
    badgeNumber: '01',
    captions: ['BUILD', 'LEARN', 'GROW'],
  },
};

const defaultContactContent = {
  email: 'ishwarweb@gmail.com',
  phone: '+91 98765 43210',
  location: 'Rohtak, Haryana, India',
  city: 'Rohtak, Haryana',
  country: 'India',
  responseTime: 'Usually within 24 hours',
  availability: "Let's Build Something Amazing Together",
  intro:
    "I'm always open to discussing new projects, creative ideas, development opportunities, collaborations, or simply having a friendly conversation about technology.",
  github: 'https://github.com/',
  linkedin: 'https://linkedin.com/',
  twitter: 'https://twitter.com/',
  instagram: 'https://instagram.com/',
  youtube: 'https://youtube.com/',
};

// GET /api/content/:key
router.get('/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const content = await Content.findOne({ key });

    if (!content) {
      // Return defaults if not yet set in database
      const fallback =
        key === 'home'
          ? defaultHomeContent
          : key === 'contact'
          ? defaultContactContent
          : {};
      return res.json({ success: true, key, data: fallback });
    }

    return res.json({ success: true, key, data: content.data });
  } catch (error) {
    console.error(`Error fetching content for ${req.params.key}:`, error);
    return res.status(500).json({ success: false, message: 'Server error fetching content.' });
  }
});

// PUT /api/content/:key (or POST)
router.put('/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ success: false, message: 'No content data provided.' });
    }

    const updated = await Content.findOneAndUpdate(
      { key },
      { key, data },
      { returnDocument: 'after', upsert: true }
    );

    return res.json({
      success: true,
      message: `${key.toUpperCase()} content saved successfully to MongoDB!`,
      data: updated.data,
    });
  } catch (error) {
    console.error(`Error saving content for ${req.params.key}:`, error);
    return res.status(500).json({ success: false, message: 'Failed to save content to database.' });
  }
});

module.exports = router;
