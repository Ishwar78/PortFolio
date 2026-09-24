import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiMonitor,
  FiServer,
  FiDatabase,
  FiTool,
  FiCloud,
  FiCode,
  FiBookOpen,
} from 'react-icons/fi';
import CTA from '../components/CTA';
import IshwarChatbot from '../components/IshwarChatbot';
import { portfolioApi } from '../lib/api';
import './Skills.css';

const defaultSkills = {
  hero: {
    eyebrow: 'MY SKILLS',
    headingLine1: 'Skills That',
    headingLine2: 'Turn Ideas Into',
    headingHighlight: 'Reality',
    description:
      "I'm constantly learning and improving my skills to build better, faster and more scalable web applications.",
    projectsBtnText: 'View My Projects',
    projectsBtnLink: '/projects',
    contactBtnText: 'Get In Touch',
    contactBtnLink: '/contact',
    image: '/assets/ishwar-profile.jpg',
    quoteText:
      'The more you learn, the more you realize how much there is left to learn.',
    quoteAuthor: 'Ishwar Sharma',
  },
  technical: {
    eyebrow: 'MY TECHNICAL SKILLS',
    heading: 'Technologies I Work With',
    description:
      'I work with a wide range of modern technologies to build scalable, secure and high-performance applications.',
    categories: [
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
  toolkit: {
    eyebrow: 'TOOLS I USE',
    heading: 'My Development Toolkit',
    tools: [
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
  stats: {
    stat1Value: '10+',
    stat1Label: 'Technologies',
    stat2Value: '20+',
    stat2Label: 'Projects Built',
    stat3Value: '2+',
    stat3Label: 'Years Experience',
    stat4Value: 'Continuous',
    stat4Label: 'Learning',
  },
};

const iconMap = {
  monitor: FiMonitor,
  server: FiServer,
  database: FiDatabase,
  tool: FiTool,
  cloud: FiCloud,
  code: FiCode,
  book: FiBookOpen,
};

export default function Skills() {
  const [data, setData] = useState(() => {
    const cached = localStorage.getItem('ishwar_skills_page_data');
    return cached ? JSON.parse(cached) : defaultSkills;
  });

  useEffect(() => {
    portfolioApi
      .getSkills()
      .then((res) => {
        if (res && res.data && res.data.hero) {
          setData(res.data);
          localStorage.setItem('ishwar_skills_page_data', JSON.stringify(res.data));
        }
      })
      .catch(() => {});
  }, []);

  const hero = data?.hero || defaultSkills.hero;
  const technical = data?.technical || defaultSkills.technical;
  const toolkit = data?.toolkit || defaultSkills.toolkit;
  const stats = data?.stats || defaultSkills.stats;
  const categories = technical?.categories || defaultSkills.technical.categories;
  const tools = toolkit?.tools || defaultSkills.toolkit.tools;

  return (
    <main className="skills-page">
      {/* =====================================================
          SKILLS HERO
      ====================================================== */}
      <section className="skills-hero">
        <div>
          <small>{hero.eyebrow || 'MY SKILLS'}</small>
          <h1>
            {hero.headingLine1 || 'Skills That'}
            <br />
            {hero.headingLine2 || 'Turn Ideas Into'}
            <br />
            <span>{hero.headingHighlight || 'Reality'}</span>
          </h1>
          <p>{hero.description}</p>
          <div>
            <Link to={hero.projectsBtnLink || '/projects'}>
              {hero.projectsBtnText || 'View My Projects'} <FiArrowRight />
            </Link>
            <Link to={hero.contactBtnLink || '/contact'}>
              {hero.contactBtnText || 'Get In Touch'}
            </Link>
          </div>
        </div>

        <div className="skills-hero-image">
          <img
            src={hero.image || '/assets/ishwar-profile.jpg'}
            alt="Ishwar Sharma"
            onError={(e) => {
              e.target.src = '/assets/ishwar-profile.jpg';
            }}
          />
          <aside>
            <b>“</b>
            <p>{hero.quoteText}</p>
            <small>— {hero.quoteAuthor || 'Ishwar Sharma'}</small>
          </aside>
        </div>
      </section>

      {/* =====================================================
          TECHNICAL SKILLS CARDS
      ====================================================== */}
      <section className="technical">
        <small>{technical.eyebrow || 'MY TECHNICAL SKILLS'}</small>
        <h2>{technical.heading || 'Technologies I Work With'}</h2>
        <p className="intro">
          {technical.description ||
            'I work with a wide range of modern technologies to build scalable, secure and high-performance applications.'}
        </p>

        <div className="skill-cards">
          {categories.map((card, idx) => {
            const Icon = iconMap[card.iconType] || FiCode;
            return (
              <article key={card._id || idx}>
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.title}
                    style={{
                      width: '26px',
                      height: '26px',
                      objectFit: 'contain',
                      flexShrink: 0,
                      borderRadius: '4px',
                    }}
                  />
                ) : (
                  <Icon />
                )}

                <div style={{ flex: 1 }}>
                  {card.badge && (
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: '700',
                        color: 'var(--blue)',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '4px',
                      }}
                    >
                      {card.badge}
                    </span>
                  )}
                  <h3>{card.title}</h3>
                  <p>{card.skillsList}</p>
                  <div className="bar">
                    <span style={{ width: `${card.level || 80}%` }} />
                  </div>
                  <b>{card.level || 80}%</b>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          DEVELOPMENT TOOLKIT
      ====================================================== */}
      <section className="toolkit">
        <small>{toolkit.eyebrow || 'TOOLS I USE'}</small>
        <h2>{toolkit.heading || 'My Development Toolkit'}</h2>
        <div className="tool-grid">
          {tools.map((t) => (
            <div key={t}>
              <FiCode />
              <span>{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          SKILL STATS
      ====================================================== */}
      <section className="skill-stats">
        <div>
          <b>{stats.stat1Value || '10+'}</b>
          <span>{stats.stat1Label || 'Technologies'}</span>
        </div>
        <div>
          <b>{stats.stat2Value || '20+'}</b>
          <span>{stats.stat2Label || 'Projects Built'}</span>
        </div>
        <div>
          <b>{stats.stat3Value || '2+'}</b>
          <span>{stats.stat3Label || 'Years Experience'}</span>
        </div>
        <div>
          <b>{stats.stat4Value || 'Continuous'}</b>
          <span>{stats.stat4Label || 'Learning'}</span>
        </div>
      </section>

      <CTA />
      <IshwarChatbot />
    </main>
  );
}
