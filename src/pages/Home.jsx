
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMapPin,
  FiBookOpen,
  FiCode,
  FiExternalLink,
  FiCheckCircle,
  FiLayers,
  FiZap,
  FiDownload,
  FiDatabase,
  FiServer,
  FiMonitor,
} from "react-icons/fi";
import { portfolioApi } from "../lib/api";
import CTA from "../components/CTA";
import "./Home.css";
import IshwarChatbot from "../components/IshwarChatbot";

const defaultHomeContent = {
  hero: {
    eyebrow: 'FULL STACK DEVELOPER',
    smallTitle: "HELLO, I'M",
    titleLine1: 'Ishwar',
    titleLine2: 'Sharma.',
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
    captions: 'BUILD, LEARN, GROW',
  },
};


const skills = [
  { name: "Java", icon: FiCode, level: "Advanced" },
  { name: "Spring Boot", icon: FiServer, level: "Advanced" },
  { name: "React", icon: FiMonitor, level: "Advanced" },
  { name: "Node.js", icon: FiServer, level: "Advanced" },
  { name: "JavaScript", icon: FiCode, level: "Advanced" },
  { name: "HTML5", icon: FiCode, level: "Advanced" },
  { name: "CSS3", icon: FiCode, level: "Advanced" },
  { name: "MySQL", icon: FiDatabase, level: "Advanced" },
  { name: "MongoDB", icon: FiDatabase, level: "Intermediate" },
  { name: "Git", icon: FiCode, level: "Advanced" },
  { name: "GitHub", icon: FiGithub, level: "Advanced" },
  { name: "AWS", icon: FiServer, level: "Intermediate" },
];

const projects = [
  {
    title: "E-Commerce Shopping Cart",
    description:
      "A complete full-stack shopping platform with product management, cart functionality, authentication, payment integration and admin features.",
    image: "/assets/projects-preview.png",
    tech: ["React", "Spring Boot", "MySQL"],
    number: "01",
  },
  {
    title: "Hotel Booking Management",
    description:
      "A modern hotel booking system with room management, customer booking flow, authentication and dedicated admin functionality.",
    image: "/assets/project-detail-preview.png",
    tech: ["React", "Node.js", "MongoDB"],
    number: "02",
  },
  {
    title: "Expense Tracker",
    description:
      "A clean expense management application designed to track spending, visualize reports and manage personal financial activity.",
    image: "/assets/skills-preview.png",
    tech: ["React", "Node.js", "MongoDB"],
    number: "03",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [content, setContent] = useState(() => {
    const cached = localStorage.getItem('ishwar_home_content');
    return cached ? JSON.parse(cached) : defaultHomeContent;
  });

  const [homeProjects, setHomeProjects] = useState(projects);

  useEffect(() => {
    portfolioApi
      .getContent('home')
      .then((res) => {
        if (res && res.data && res.data.hero) {
          setContent(res.data);
          localStorage.setItem('ishwar_home_content', JSON.stringify(res.data));
        }
      })
      .catch(() => {});

    portfolioApi
      .getProjects()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Sort pinned projects first
          const sorted = [...data].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
          const pinnedList = sorted.filter((p) => p.isPinned);
          // Show up to 6 pinned projects or 3 default
          const countToShow = Math.min(6, Math.max(3, pinnedList.length));
          setHomeProjects(sorted.slice(0, countToShow));
        }
      })
      .catch(() => {});
  }, []);

  const hero = content?.hero || defaultHomeContent.hero;
  const homeAbout = content?.homeAbout || defaultHomeContent.homeAbout;

  return (
    <main className="home-page">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="hero">

        <div className="hero-bg-grid"></div>

        <div className="hero-glow glow-one"></div>
        <div className="hero-glow glow-two"></div>
        <div className="hero-glow glow-three"></div>

        <div className="hero-copy">

          <div className="eyebrow hero-eyebrow">
            <span className="eyebrow-dot"></span>
            {hero.eyebrow}
          </div>

          <div className="hero-title-wrap">

            <span className="hero-small-title">{hero.smallTitle}</span>

            <h1>
              {hero.titleLine1}
              <br />
              <span>{hero.titleLine2}</span>
            </h1>

          </div>

          <div className="hero-role">
            <span className="role-line"></span>
            <h2>
              {hero.roleHeadline}
            </h2>
          </div>

          <p className="hero-description">
            {hero.description}
          </p>

          <div className="hero-actions">

            <Link className="primary hero-btn" to={hero.primaryBtnLink || "/projects"}>
              <span>{hero.primaryBtnText}</span>
              <FiArrowRight />
            </Link>

            <Link className="outline hero-btn" to={hero.secondaryBtnLink || "/contact"}>
              <FiMail />
              <span>{hero.secondaryBtnText}</span>
            </Link>

            {hero.resumeLink && (
              <a
                className="resume-link"
                href={hero.resumeLink}
                target="_blank"
                rel="noreferrer"
              >
                <FiDownload />
                {hero.resumeText || "Resume"}
              </a>
            )}

          </div>

          <div className="hero-bottom">

            <div className="socials">

              {hero.githubUrl && (
                <a
                  href={hero.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <FiGithub />
                </a>
              )}

              {hero.linkedinUrl && (
                <a
                  href={hero.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin />
                </a>
              )}

              {hero.twitterUrl && (
                <a
                  href={hero.twitterUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                >
                  <FiTwitter />
                </a>
              )}

              {hero.email && (
                <a
                  href={`mailto:${hero.email}`}
                  aria-label="Email"
                >
                  <FiMail />
                </a>
              )}

            </div>

            <div className="hero-note">
              <span></span>
              {hero.noteText}
            </div>

          </div>

        </div>


        {/* HERO VISUAL */}

        <div className="hero-photo">

          <div className="photo-glow"></div>

          <div className="photo-orbit orbit-a"></div>
          <div className="photo-orbit orbit-b"></div>
          <div className="photo-ring"></div>

          <div className="code-decoration code-one">
            {"</>"}
          </div>

          <div className="code-decoration code-two">
            {"{}"}
          </div>

          <div className="photo-label">
            <span>CODE</span>
            <b>CREATE</b>
            <span>IMPROVE</span>
            <i>REPEAT</i>
          </div>

          <div className="profile-frame">

            <div className="frame-line"></div>

            <img
              src={hero.image || "/assets/ishwar-profile.jpg"}
              alt={`${hero.titleLine1} ${hero.titleLine2}`}
              onError={(e) => {
                e.target.src = "/assets/ishwar-profile.jpg";
              }}
            />

          </div>


          <div className="hero-stats">

            <div className="hero-stat">
              <FiLayers />
              <div>
                <b>{hero.stat1Number}</b>
                <span>{hero.stat1Label}</span>
              </div>
            </div>

            <div className="hero-stat">
              <FiCode />
              <div>
                <b>{hero.stat2Number}</b>
                <span>{hero.stat2Label}</span>
              </div>
            </div>

            <div className="hero-stat">
              <FiCheckCircle />
              <div>
                <b>{hero.stat3Number}</b>
                <span>{hero.stat3Label}</span>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          VALUE STRIP
      ====================================================== */}

      <section className="value-strip">

        <div className="value-item">
          <span className="value-icon">
            <FiCode />
          </span>

          <div>
            <b>Clean Code</b>
            <small>Maintainable & Scalable</small>
          </div>
        </div>

        <div className="value-item">
          <span className="value-icon">
            <FiZap />
          </span>

          <div>
            <b>Problem Solving</b>
            <small>Turning Ideas Into Solutions</small>
          </div>
        </div>

        <div className="value-item">
          <span className="value-icon">
            <FiLayers />
          </span>

          <div>
            <b>Team Player</b>
            <small>Built Around Collaboration</small>
          </div>
        </div>

        <div className="value-item">
          <span className="value-icon">
            <FiArrowRight />
          </span>

          <div>
            <b>Always Exploring</b>
            <small>Learning New Technologies</small>
          </div>
        </div>

      </section>


      {/* =====================================================
          ABOUT
      ====================================================== */}

      <section className="home-about premium-section">

        <div className="about-copy">

          <div className="eyebrow">
            {homeAbout.eyebrow}
          </div>

          <h2>
            {homeAbout.headingMain}
            <br />
            <span>{homeAbout.headingHighlight}</span>
          </h2>

          <p>
            {homeAbout.description}
          </p>

          <div className="mini-info">

            <div className="mini-info-item">
              <span>
                <FiMapPin />
              </span>

              <div>
                <small>LOCATION</small>
                <strong>{homeAbout.location}</strong>
              </div>
            </div>

            <div className="mini-info-item">
              <span>
                <FiBookOpen />
              </span>

              <div>
                <small>EDUCATION</small>
                <strong>{homeAbout.education}</strong>
              </div>
            </div>

            <div className="mini-info-item">
              <span>
                <FiMail />
              </span>

              <div>
                <small>EMAIL</small>
                <strong>{homeAbout.email}</strong>
              </div>
            </div>

          </div>

          <Link className="outline about-btn" to={homeAbout.btnLink || "/about"}>
            <span>{homeAbout.btnText}</span>
            <FiArrowRight />
          </Link>

        </div>


        <div className="about-visual">

          <div className="about-grid"></div>

          <div className="visual-card">

            <div className="visual-top">
              <span>{homeAbout.badgeTop || 'DEVELOPER'}</span>
              <span>{homeAbout.badgeNumber || '01'}</span>
            </div>

            <img
              src={homeAbout.image || "/assets/ishwar-profile.jpg"}
              alt={homeAbout.headingMain || "About Ishwar Sharma"}
              onError={(e) => {
                e.target.src = "/assets/ishwar-profile.jpg";
              }}
            />

            <div className="visual-caption">
              {typeof homeAbout.captions === 'string'
                ? homeAbout.captions.split(',').map((c) => <span key={c}>{c.trim()}</span>)
                : Array.isArray(homeAbout.captions)
                ? homeAbout.captions.map((c) => <span key={c}>{c}</span>)
                : (
                  <>
                    <span>BUILD</span>
                    <span>LEARN</span>
                    <span>GROW</span>
                  </>
                )}
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          SKILLS
      ====================================================== */}

      <section className="home-skills premium-section">

        <div className="section-top">

          <div>
            <div className="eyebrow">
              MY SKILLS
            </div>

            <h2>
              Technologies I
              <span> Work With.</span>
            </h2>
          </div>

          <Link to="/skills" className="section-link">
            Explore All Skills
            <FiArrowRight />
          </Link>

        </div>


        <p className="section-intro">
          A practical technology stack focused on building modern,
          scalable and production-ready web applications.
        </p>


        <div className="skill-grid">

          {skills.map((skill, index) => {

            const Icon = skill.icon;

            return (
              <div
                className="skill-card"
                key={skill.name}
                style={{
                  "--skill-delay": `${index * 0.05}s`,
                }}
              >

                <div className="skill-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="skill-icon">
                  <Icon />
                </div>

                <div className="skill-content">
                  <strong>{skill.name}</strong>
                  <small>{skill.level}</small>
                </div>

                <FiArrowRight className="skill-arrow" />

              </div>
            );
          })}

        </div>

      </section>


      {/* =====================================================
          PROJECTS
      ====================================================== */}

      <section className="home-projects premium-section">

        <div className="section-top">

          <div>
            <div className="eyebrow">
              FEATURED PROJECTS
            </div>

            <h2>
              Some of My
              <span> Recent Work.</span>
            </h2>
          </div>

          <Link to="/projects" className="section-link">
            View All Projects
            <FiArrowRight />
          </Link>

        </div>

        <p className="section-intro">
          Selected projects showcasing my experience across frontend,
          backend and full-stack development.
        </p>


        <div className="project-grid">

          {homeProjects.map((project, index) => {
            const projectLink = `/projects/${project.slug || project._id || project.id || 'teamtrack'}`;
            const projImg = project.img || project.image || '/assets/projects-preview.png';
            const projDesc = project.desc || project.description || '';
            const projTags = Array.isArray(project.tags)
              ? project.tags
              : Array.isArray(project.tech)
              ? project.tech
              : ['React', 'Node.js'];

            return (
              <article
                className="project-card"
                key={project._id || project.slug || project.title || index}
                onClick={() => navigate(projectLink)}
                style={{ cursor: 'pointer' }}
              >

                <div className="project-image">

                  <img
                    src={projImg}
                    alt={project.title}
                    onError={(e) => {
                      e.target.src = '/assets/projects-preview.png';
                    }}
                  />

                  <div className="project-overlay"></div>

                  <span className="project-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className={`project-featured ${project.isPinned ? 'is-pinned-tag' : ''}`}>
                    {project.isPinned ? '📌 PINNED' : 'FEATURED'}
                  </span>

                  <Link
                    to={projectLink}
                    className="project-open"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiExternalLink />
                  </Link>

                </div>

                <div className="project-body">

                  <h3>{project.title}</h3>

                  <p>{projDesc}</p>

                  <div className="project-tech">

                    {projTags.slice(0, 4).map((technology) => (
                      <span key={technology}>
                        {technology}
                      </span>
                    ))}

                  </div>

                </div>

              </article>
            );
          })}

        </div>

      </section>


      {/* =====================================================
          EXPERIENCE
      ====================================================== */}

      <section className="home-experience premium-section">

        <div className="section-top">

          <div>
            <div className="eyebrow">
              WORK EXPERIENCE
            </div>

            <h2>
              My Professional
              <span> Journey.</span>
            </h2>
          </div>

          <Link to="/experience" className="section-link">
            View Full Experience
            <FiArrowRight />
          </Link>

        </div>


        <div className="experience-timeline">

          <article className="experience-card">

            <div className="experience-dot"></div>

            <div className="experience-date">
              SEP 2023 — FEB 2024
            </div>

            <h3>
              Full Stack Developer
              <span> Intern</span>
            </h3>

            <strong>
              AAM Infotech Pvt. Ltd., Gurugram
            </strong>

            <p>
              Worked with Java, Spring Boot, REST APIs, MySQL and
              frontend technologies while contributing to full-stack
              web application development.
            </p>

            <div className="experience-tags">
              <span>Java</span>
              <span>Spring Boot</span>
              <span>REST API</span>
              <span>MySQL</span>
            </div>

          </article>


          <article className="experience-card">

            <div className="experience-dot"></div>

            <div className="experience-date">
              RECENT EXPERIENCE
            </div>

            <h3>
              Technical Supervisor
            </h3>

            <strong>
              Wipro — On-Site
            </strong>

            <p>
              Handled technical operations, troubleshooting,
              coordination and day-to-day technical support.
            </p>

            <div className="experience-tags">
              <span>Technical Support</span>
              <span>Operations</span>
              <span>Troubleshooting</span>
            </div>

          </article>


          <article className="experience-card">

            <div className="experience-dot"></div>

            <div className="experience-date">
              TECHNICAL SUPPORT
            </div>

            <h3>
              Maintenance Support Technician
            </h3>

            <strong>
              Wipro
            </strong>

            <p>
              Worked in a technical support environment with a focus
              on maintenance, troubleshooting and operational assistance.
            </p>

            <div className="experience-tags">
              <span>Maintenance</span>
              <span>Support</span>
              <span>Technical Operations</span>
            </div>

          </article>

        </div>

      </section>


      {/* =====================================================
          CTA
      ====================================================== */}

      <CTA />
<IshwarChatbot />
    </main>
  );
}
