const mongoose = require('mongoose');

const experienceItemSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    period: { type: String, default: '' },
    location: { type: String, default: '' },
    type: { type: String, default: 'Full-time' }, // 'Full-time', 'Internship', 'Education', 'Contract'
    description: { type: String, default: '' },
    technologies: { type: [String], default: [] },
    image: { type: String, default: '' },
  },
  { _id: true }
);

const experiencePageSchema = new mongoose.Schema(
  {
    hero: {
      eyebrow: { type: String, default: 'MY EXPERIENCE' },
      headingLine1: { type: String, default: 'A Journey of' },
      headingHighlight: { type: String, default: 'Learning & Building' },
      description: {
        type: String,
        default:
          "Every experience has shaped me into a better developer. Here's a timeline of my professional journey, internships and the skills I've gained along the way.",
      },
      resumeLink: { type: String, default: '/resume.pdf' },
      resumeText: { type: String, default: 'Download Resume' },
      connectLink: { type: String, default: '/contact' },
      connectText: { type: String, default: "Let's Connect" },
      image: { type: String, default: '/assets/experience-preview.png' },
    },
    stats: {
      stat1Value: { type: String, default: '3+' },
      stat1Label: { type: String, default: 'Years Experience' },
      stat2Value: { type: String, default: '10+' },
      stat2Label: { type: String, default: 'Projects Completed' },
      stat3Value: { type: String, default: '4+' },
      stat3Label: { type: String, default: 'Companies/Clients' },
      stat4Value: { type: String, default: '100%' },
      stat4Label: { type: String, default: 'Continuous Learning' },
    },
    timeline: {
      eyebrow: { type: String, default: 'MY PROFESSIONAL JOURNEY' },
      heading: { type: String, default: 'Work Experience Timeline' },
      items: {
        type: [experienceItemSchema],
        default: [
          {
            role: 'Technical Supervisor',
            company: 'Wipro (On-Site)',
            period: 'Mar 2024 – Present',
            location: 'Gurugram, Haryana',
            type: 'Full-time',
            description:
              'Handling technical operations and team support at client site. Working on system maintenance, troubleshooting and user support.',
            technologies: ['Technical Operations', 'Troubleshooting', 'System Support'],
          },
          {
            role: 'HVAC Plant Operations',
            company: 'DLF Corporate Greens, Gurugram',
            period: 'Mar 2022 – Mar 2024',
            location: 'Gurugram, Haryana',
            type: 'Full-time',
            description:
              'Worked in HVAC plant operations and technical systems, managing maintenance and day-to-day operations.',
            technologies: ['Plant Operations', 'Maintenance', 'Diagnostics'],
          },
          {
            role: 'Full Stack Developer (Intern)',
            company: 'AAM Infotech Pvt. Ltd., Gurugram',
            period: 'Sep 2023 – Feb 2024',
            location: 'Gurugram, Haryana',
            type: 'Internship',
            description:
              'Worked on Java, Spring Boot, REST APIs, MySQL and frontend technologies. Built and tested web applications.',
            technologies: ['Java', 'Spring Boot', 'REST APIs', 'MySQL', 'React'],
          },
          {
            role: 'BCA & MCA',
            company: 'Maharshi Dayanand University, Rohtak (MDU)',
            period: '2019 – 2024',
            location: 'Rohtak, Haryana',
            type: 'Education',
            description:
              'Completed BCA and MCA with a strong foundation in computer applications and software development.',
            technologies: ['Computer Science', 'Software Engineering', 'Data Structures'],
          },
        ],
      },
    },
    tools: {
      heading: { type: String, default: "Tools & Environments I've Worked With" },
      list: {
        type: [String],
        default: [
          'Windows',
          'Linux',
          'MySQL',
          'Git',
          'GitHub',
          'VS Code',
          'Postman',
          'Docker',
          'AWS',
          'Nginx',
          'XAMPP',
          'Figma',
        ],
      },
    },
  },
  { timestamps: true }
);

const Experience = mongoose.model('Experience', experiencePageSchema);

module.exports = Experience;
