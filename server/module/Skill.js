const mongoose = require('mongoose');

const skillCategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    skillsList: { type: String, default: '' },
    level: { type: Number, default: 85 },
    badge: { type: String, default: 'General' },
    iconType: { type: String, default: 'code' },
    image: { type: String, default: '' },
  },
  { _id: true }
);

const skillPageSchema = new mongoose.Schema(
  {
    hero: {
      eyebrow: { type: String, default: 'MY SKILLS' },
      headingLine1: { type: String, default: 'Skills That' },
      headingLine2: { type: String, default: 'Turn Ideas Into' },
      headingHighlight: { type: String, default: 'Reality' },
      description: {
        type: String,
        default:
          "I'm constantly learning and improving my skills to build better, faster and more scalable web applications.",
      },
      projectsBtnText: { type: String, default: 'View My Projects' },
      projectsBtnLink: { type: String, default: '/projects' },
      contactBtnText: { type: String, default: 'Get In Touch' },
      contactBtnLink: { type: String, default: '/contact' },
      image: { type: String, default: '/assets/ishwar-profile.jpg' },
      quoteText: {
        type: String,
        default: 'The more you learn, the more you realize how much there is left to learn.',
      },
      quoteAuthor: { type: String, default: 'Ishwar Sharma' },
    },
    technical: {
      eyebrow: { type: String, default: 'MY TECHNICAL SKILLS' },
      heading: { type: String, default: 'Technologies I Work With' },
      description: {
        type: String,
        default:
          'I work with a wide range of modern technologies to build scalable, secure and high-performance applications.',
      },
      categories: {
        type: [skillCategorySchema],
        default: [
          {
            title: 'Frontend Development',
            skillsList: 'HTML, CSS, JavaScript, React, Redux, Bootstrap, Tailwind CSS',
            level: 90,
            badge: 'Frontend',
            iconType: 'monitor',
            image: '',
          },
          {
            title: 'Backend Development',
            skillsList: 'Java, Spring Boot, Spring Data JPA, Node.js, Express.js, PHP',
            level: 85,
            badge: 'Backend',
            iconType: 'server',
            image: '',
          },
          {
            title: 'Database',
            skillsList: 'MySQL, MongoDB, MariaDB, Oracle',
            level: 80,
            badge: 'Database',
            iconType: 'database',
            image: '',
          },
          {
            title: 'Tools & Platforms',
            skillsList: 'Git, GitHub, Postman, VS Code, Eclipse, IntelliJ, XAMPP',
            level: 85,
            badge: 'DevOps & Tools',
            iconType: 'tool',
            image: '',
          },
          {
            title: 'Cloud & Deployment',
            skillsList: 'AWS (S3), Vercel, Netlify, Hostinger, CyberPanel',
            level: 75,
            badge: 'Cloud',
            iconType: 'cloud',
            image: '',
          },
          {
            title: 'Additional Skills',
            skillsList: 'REST APIs, JWT, Spring Security, Thymeleaf, JSP, Servlets',
            level: 80,
            badge: 'APIs & Security',
            iconType: 'code',
            image: '',
          },
          {
            title: 'Other Skills',
            skillsList: 'Data Structures & Algorithms, Problem Solving, Linux Basics',
            level: 70,
            badge: 'Core Computer Science',
            iconType: 'code',
            image: '',
          },
          {
            title: 'Currently Learning',
            skillsList: 'System Design, Docker, Kubernetes, CI/CD, Advanced AWS',
            level: 60,
            badge: 'Advanced & Cloud',
            iconType: 'book',
            image: '',
          },
        ],
      },
    },
    toolkit: {
      eyebrow: { type: String, default: 'TOOLS I USE' },
      heading: { type: String, default: 'My Development Toolkit' },
      tools: {
        type: [String],
        default: [
          'VS Code',
          'IntelliJ',
          'Eclipse',
          'Git',
          'GitHub',
          'Postman',
          'MySQL',
          'MongoDB',
          'AWS',
          'Docker',
          'Figma',
          'Netlify',
        ],
      },
    },
    stats: {
      stat1Value: { type: String, default: '10+' },
      stat1Label: { type: String, default: 'Technologies' },
      stat2Value: { type: String, default: '20+' },
      stat2Label: { type: String, default: 'Projects Built' },
      stat3Value: { type: String, default: '2+' },
      stat3Label: { type: String, default: 'Years Experience' },
      stat4Value: { type: String, default: 'Continuous' },
      stat4Label: { type: String, default: 'Learning' },
    },
  },
  { timestamps: true }
);

const Skill = mongoose.model('Skill', skillPageSchema);

module.exports = Skill;
