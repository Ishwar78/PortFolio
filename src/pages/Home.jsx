
import React from "react";
import { Link } from "react-router-dom";
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
import CTA from "../components/CTA";
import "./Home.css";
import IshwarChatbot from "../components/IshwarChatbot";


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
            FULL STACK DEVELOPER
          </div>

          <div className="hero-title-wrap">

            <span className="hero-small-title">HELLO, I'M</span>

            <h1>
              Ishwar
              <br />
              <span>Sharma.</span>
            </h1>

          </div>

          <div className="hero-role">
            <span className="role-line"></span>
            <h2>
              I build modern web applications
              <br />
              that solve <strong>real-world problems.</strong>
            </h2>
          </div>

          <p className="hero-description">
            Full Stack Developer focused on creating scalable, responsive
            and high-performance digital experiences using React, Java,
            Spring Boot, Node.js and modern web technologies.
          </p>

          <div className="hero-actions">

            <Link className="primary hero-btn" to="/projects">
              <span>View My Work</span>
              <FiArrowRight />
            </Link>

            <Link className="outline hero-btn" to="/contact">
              <FiMail />
              <span>Let's Talk</span>
            </Link>

            <a
              className="resume-link"
              href="/assets/Ishwar-Resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <FiDownload />
              Resume
            </a>

          </div>

          <div className="hero-bottom">

            <div className="socials">

              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <FiGithub />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FiLinkedin />
              </a>

              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
              >
                <FiTwitter />
              </a>

              <a
                href="mailto:ishwarweb@gmail.com"
                aria-label="Email"
              >
                <FiMail />
              </a>

            </div>

            <div className="hero-note">
              <span></span>
              Always learning. Always building.
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
              src="/assets/ishwar-profile.jpg"
              alt="Ishwar Sharma"
            />

          </div>


          <div className="hero-stats">

            <div className="hero-stat">
              <FiLayers />
              <div>
                <b>2+</b>
                <span>Years Experience</span>
              </div>
            </div>

            <div className="hero-stat">
              <FiCode />
              <div>
                <b>10+</b>
                <span>Projects Built</span>
              </div>
            </div>

            <div className="hero-stat">
              <FiCheckCircle />
              <div>
                <b>100%</b>
                <span>Commitment</span>
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
            ABOUT ME
          </div>

          <h2>
            Turning Ideas Into
            <br />
            <span>Real-World Solutions.</span>
          </h2>

          <p>
            I'm a Full Stack Developer with a strong foundation in Java,
            Spring Boot, React and modern web technologies. I enjoy building
            complete web applications — from intuitive user interfaces to
            robust backend systems — while continuously improving my
            development approach.
          </p>

          <div className="mini-info">

            <div className="mini-info-item">
              <span>
                <FiMapPin />
              </span>

              <div>
                <small>LOCATION</small>
                <strong>Rohtak, Haryana</strong>
              </div>
            </div>

            <div className="mini-info-item">
              <span>
                <FiBookOpen />
              </span>

              <div>
                <small>EDUCATION</small>
                <strong>MCA – MDU Rohtak</strong>
              </div>
            </div>

            <div className="mini-info-item">
              <span>
                <FiMail />
              </span>

              <div>
                <small>EMAIL</small>
                <strong>ishwarweb@gmail.com</strong>
              </div>
            </div>

          </div>

          <Link className="outline about-btn" to="/about">
            <span>More About Me</span>
            <FiArrowRight />
          </Link>

        </div>


        <div className="about-visual">

          <div className="about-grid"></div>

          <div className="visual-card">

            <div className="visual-top">
              <span>DEVELOPER</span>
              <span>01</span>
            </div>

            <img
              src="/assets/ishwar-profile.jpg"
              alt="Ishwar Sharma"
            />

            <div className="visual-caption">
              <span>BUILD</span>
              <span>LEARN</span>
              <span>GROW</span>
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

          {projects.map((project) => (

            <article
              className="project-card"
              key={project.title}
            >

              <div className="project-image">

                <img
                  src={project.image}
                  alt={project.title}
                />

                <div className="project-overlay"></div>

                <span className="project-number">
                  {project.number}
                </span>

                <span className="project-featured">
                  FEATURED
                </span>

                <Link
                  to="/projects"
                  className="project-open"
                >
                  <FiExternalLink />
                </Link>

              </div>

              <div className="project-body">

                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div className="project-tech">

                  {project.tech.map((technology) => (
                    <span key={technology}>
                      {technology}
                    </span>
                  ))}

                </div>

              </div>

            </article>

          ))}

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
