import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FiArrowLeft,
  FiExternalLink,
  FiGithub,
  FiUser,
  FiShoppingCart,
  FiCreditCard,
  FiSettings,
  FiPackage,
  FiZap,
  FiCheckCircle,
  FiCalendar,
  FiLayers,
} from 'react-icons/fi';
import { portfolioApi } from '../lib/api';
import CTA from '../components/CTA';
import './ProjectDetail.css';

// Rich fallback project dataset ensuring every project has distinct, authentic information
const projectsData = {
  teamtrack: {
    title: 'TeamTrack — Employee Activity Monitoring Platform',
    desc: 'A full-stack employee activity monitoring platform designed to help teams track work activity through screenshots and activity data. The platform provides a centralized interface for monitoring team members, reviewing activity records and managing workforce productivity.',
    overview: 'TeamTrack is an enterprise-grade employee activity and productivity tracking system. It enables organizations to monitor real-time active sessions, track periodic desktop screenshots, review active vs. idle hours, and analyze aggregate workforce metrics through an intuitive dashboard.',
    img: '/assets/projects-preview.png',
    gallery: ['/assets/projects-preview.png', '/assets/project-detail-preview.png'],
    duration: '4+ Months',
    category: 'Full Stack Web App',
    role: 'Lead Developer',
    status: 'Live & Operational',
    liveUrl: 'https://multiclout.in/',
    githubUrl: 'https://github.com/Ishwar78',
    tags: ['React', 'Spring Boot', 'MySQL', 'Activity Monitoring', 'REST API', 'JWT'],
    features: [
      ['Automated Screenshots', FiLayers, 'Secure periodic desktop captures stored with encrypted timestamps.'],
      ['Activity Tracking', FiZap, 'Calculates active versus idle duration and productivity ratios.'],
      ['Team Management', FiUser, 'Role-based access control for team leads, admins, and members.'],
      ['Real-time Metrics', FiCheckCircle, 'Live employee status indicators and daily summary breakdowns.'],
      ['Audit Logs', FiPackage, 'Tamper-proof activity logs for organizational compliance.'],
      ['Admin Controls', FiSettings, 'Configuration for tracking intervals, working hours, and data retention.'],
    ],
    challenges: [
      'Handling high-volume desktop screenshot uploads without server bottlenecks.',
      'Distinguishing active keyboard/mouse events from system idle states accurately.',
      'Securing sensitive workplace activity metrics and ensuring privacy compliance.',
    ],
    solutions: [
      'Implemented chunked image compression and asynchronous cloud storage pipelines.',
      'Designed lightweight background heartbeat listeners with configurable idle thresholds.',
      'Enforced role-based access control (RBAC) and encrypted storage protocols.',
    ],
    techStack: 'React · Spring Boot · Java · MySQL · REST APIs · Git · GitHub',
    learned: 'Mastered high-concurrency background data processing, WebSocket heartbeat mechanisms, and enterprise-grade role-based security.',
  },

  thekissancity: {
    title: 'TheKissanCity — E-Commerce Shopping Platform',
    desc: 'A complete full-stack e-commerce platform featuring product browsing, categories, shopping cart, customer checkout and payment integration. The system also includes administrative functionality for managing products, inventory and online orders.',
    overview: 'TheKissanCity is an agricultural and consumer-focused e-commerce marketplace empowering direct trade between rural producers and urban buyers. Built with high performance and smooth checkout flows in mind, it handles product cataloging, order fulfillment, and multi-channel payment gateways.',
    img: '/assets/project-detail-preview.png',
    gallery: ['/assets/project-detail-preview.png', '/assets/skills-preview.png'],
    duration: '5+ Months',
    category: 'Web Application',
    role: 'Full Stack Developer',
    status: 'Live & In Production',
    liveUrl: 'https://thekissancity.com/',
    githubUrl: 'https://github.com/Ishwar78',
    tags: ['React', 'Node.js', 'MongoDB', 'E-Commerce', 'Payment Integration', 'Express'],
    features: [
      ['User Authentication', FiUser, 'Secure signup, login, session tokens, and protected customer profiles.'],
      ['Product Catalog', FiPackage, 'Multi-category filtering, responsive search, and detailed product variants.'],
      ['Smart Shopping Cart', FiShoppingCart, 'Persistent local and cloud-synced cart with dynamic discount calculations.'],
      ['Order Management', FiPackage, 'Track orders from placement to dispatch and doorstep delivery.'],
      ['Payment Gateway', FiCreditCard, 'Seamless integration with Razorpay/Stripe with webhook verification.'],
      ['Admin Panel', FiSettings, 'Manage inventory, process refunds, and view sales performance analytics.'],
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
    techStack: 'React · Node.js · Express · MongoDB · Razorpay · Git · GitHub',
    learned: 'Gained comprehensive experience in building transactional payment pipelines, state synchronization, and complex inventory management.',
  },

  uni10: {
    title: 'Uni10 — Modern E-Commerce Platform',
    desc: 'A scalable e-commerce web application built for online product discovery and shopping. The platform includes product and collection management, cart functionality, checkout flow, order processing and third-party service integrations for a complete online shopping experience.',
    overview: 'Uni10 delivers a curated shopping experience tailored for digital-native shoppers. With a modern minimalist aesthetic and blazing-fast client transitions, Uni10 handles inventory, discount coupons, real-time cart state, and streamlined invoice generation.',
    img: '/assets/skills-preview.png',
    gallery: ['/assets/skills-preview.png', '/assets/projects-preview.png'],
    duration: '3+ Months',
    category: 'Full Stack',
    role: 'Frontend & API Developer',
    status: 'Live Deployed',
    liveUrl: 'https://uni10.in/',
    githubUrl: 'https://github.com/Ishwar78',
    tags: ['React', 'Node.js', 'MongoDB', 'REST APIs', 'E-Commerce', 'Tailwind'],
    features: [
      ['Collection Discovery', FiLayers, 'Faceted product filtering by collection, price tier, and availability.'],
      ['Instant Search', FiZap, 'Debounced search bar with live auto-suggestions and thumbnails.'],
      ['Slide-out Cart', FiShoppingCart, 'Smooth slide-out cart drawer with instant quantity adjust and promo code input.'],
      ['Order Processing', FiPackage, 'Real-time order statuses from pending to dispatched and delivered.'],
      ['Payment Integration', FiCreditCard, 'Single-page step-by-step address validation and payment processing.'],
      ['Responsive Experience', FiUser, 'Tailored touch-friendly navigation optimized for handheld screens.'],
    ],
    challenges: [
      'Ensuring instantaneous UI feedback without excessive API calls during search and filtering.',
      'Maintaining consistent cross-browser cart sync across multiple browser tabs.',
      'Optimizing rendering for deeply nested product variant hierarchies.',
    ],
    solutions: [
      'Implemented custom debounce hooks and in-memory query caching.',
      'Used BroadcastChannel API alongside localStorage listeners for instantaneous multi-tab sync.',
      'Leveraged memoized selectors and virtualized lists for smooth scrolling.',
    ],
    techStack: 'React · Node.js · MongoDB · Express · REST APIs · Tailwind CSS',
    learned: 'Enhanced client performance optimization techniques, debounce implementations, and seamless checkout UX.',
  },

  'skillserve-academy': {
    title: 'SkillServe Academy — Education & Learning Platform',
    desc: 'A modern educational website designed to present courses, learning programs and academy information through a clean and responsive interface. Built with React and Redux to provide structured content, smooth navigation and an engaging user experience across devices.',
    overview: 'SkillServe Academy provides career-oriented technical and professional education programs. The web portal features interactive course syllabi, student enrollment inquiries, instructor profiles, and scheduled cohort announcements.',
    img: '/assets/home-preview.png',
    gallery: ['/assets/home-preview.png', '/assets/experience-preview.png'],
    duration: '2.5 Months',
    category: 'React Application',
    role: 'UI/UX & Frontend Developer',
    status: 'Live Deployed',
    liveUrl: 'https://www.skillserveacademy.in/',
    githubUrl: 'https://github.com/Ishwar78',
    tags: ['React', 'Redux', 'Tailwind CSS', 'Responsive UI', 'Education'],
    features: [
      ['Course Curriculum', FiLayers, 'Accordion-based modular syllabus with duration and prerequisite tags.'],
      ['Student Enrollment', FiUser, 'Multi-step admission inquiry form with automated notification.'],
      ['Testimonials & Reviews', FiCheckCircle, 'Interactive student testimonial sliders and alumni success stories.'],
      ['Batch Countdown', FiCalendar, 'Dynamic schedule display with countdowns to upcoming cohort starts.'],
      ['Resource Downloads', FiPackage, 'Gated syllabus brochures and downloadable course guides.'],
      ['SEO & Performance', FiZap, 'Semantic HTML markup and meta tags targeting high-ranking education terms.'],
    ],
    challenges: [
      'Designing an intuitive course hierarchy that keeps lengthy syllabi digestible on small mobile screens.',
      'Optimizing form conversion rates for student inquiries.',
      'Ensuring consistent branding across diverse course categories.',
    ],
    solutions: [
      'Structured syllabi into expandable collapsible cards with quick-scroll navigation.',
      'Simplified inquiry flow to a 30-second mobile-friendly quick form with instant feedback.',
      'Built a reusable design token system with Tailwind utility classes.',
    ],
    techStack: 'React · Redux Toolkit · Tailwind CSS · Vite · Git · GitHub',
    learned: 'Strengthened component modularity, lead generation conversion design, and mobile-first responsive styling.',
  },

  'sk-classes': {
    title: 'SK Classes — Study Abroad & Education Platform',
    desc: 'An education-focused web platform designed to provide information and guidance for students planning their study-abroad journey. The website presents programs, services and educational information through a responsive and user-friendly interface.',
    overview: 'SK Classes guides students aspiring to pursue global education opportunities in top international universities. The platform aggregates country guides, visa assistance guidelines, test prep details (IELTS/PTE), and booking for 1-on-1 counseling consultations.',
    img: '/assets/experience-preview.png',
    gallery: ['/assets/experience-preview.png', '/assets/home-preview.png'],
    duration: '3 Months',
    category: 'Full Stack Web App',
    role: 'Full Stack Developer',
    status: 'Live Deployed',
    liveUrl: 'https://skclasses.com/',
    githubUrl: 'https://github.com/Ishwar78',
    tags: ['React', 'Node.js', 'MongoDB', 'Education', 'Responsive Design'],
    features: [
      ['Destination Guides', FiLayers, 'In-depth profiles for study destinations (UK, Canada, USA, Europe, Australia).'],
      ['Counseling Booking', FiCalendar, 'Integrated appointment scheduler for student counseling sessions.'],
      ['Test Prep Modules', FiZap, 'Information on training batches, practice mock tests, and faculty.'],
      ['Success Metrics', FiCheckCircle, 'Interactive counters showcasing visa success rates and student placements.'],
      ['Inquiry Helpdesk', FiUser, 'Quick WhatsApp and email enquiry hooks for prospective applicants.'],
      ['Admin CRM', FiSettings, 'Backend dashboard to manage and follow up with counseling leads.'],
    ],
    challenges: [
      'Handling diverse inquiry types while ensuring counselor follow-ups are routed appropriately.',
      'Keeping international destination requirements current and easy to update.',
      'Rendering media-heavy university profiles on slow mobile connections.',
    ],
    solutions: [
      'Created structured categorization for inquiries with automated email alerts.',
      'Built a dedicated CMS backend allowing non-technical admins to update country pages.',
      'Applied progressive image loading and asset pre-caching.',
    ],
    techStack: 'React · Node.js · Express · MongoDB · REST APIs · Responsive CSS',
    learned: 'Developed full CRM integration, form validation workflows, and dynamic content CMS architecture.',
  },

  'portfolio-website': {
    title: 'Ishwar Sharma — Full Stack Developer Portfolio',
    desc: 'A modern professional portfolio showcasing my development experience, technical skills, projects and professional journey. Built with React and Vite with a responsive UI, interactive sections and a Node.js-powered backend for dynamic portfolio content management.',
    overview: 'This comprehensive personal portfolio serves as the central digital showcase for Ishwar Sharma. It features dynamic admin controls for real-time content updates, an interactive AI chatbot with lead generation, case studies, and responsive design across all devices.',
    img: '/assets/home-preview.png',
    gallery: ['/assets/home-preview.png', '/assets/project-detail-preview.png'],
    duration: 'Ongoing',
    category: 'Full Stack & CMS',
    role: 'Owner & Full Stack Architect',
    status: 'Live & Maintained',
    liveUrl: 'https://ishwarweb.in/',
    githubUrl: 'https://github.com/Ishwar78/PortFolio',
    tags: ['React', 'Vite', 'Node.js', 'MongoDB', 'REST API', 'Responsive UI'],
    features: [
      ['Dynamic Admin Portal', FiSettings, 'Comprehensive admin portal to edit hero, about, skills, projects, and contact info.'],
      ['Smart AI Chatbot', FiZap, 'Interactive portfolio assistant with lead capture and case-insensitive Q&A matching.'],
      ['Lead Capture Engine', FiUser, 'Automated visitor inquiry storage directly into MongoDB with admin notifications.'],
      ['Dark & Light Modes', FiLayers, 'Dual-theme support with persistent user preferences and custom cursor.'],
      ['High Performance', FiCheckCircle, 'Blazing fast load times using Vite bundling and lazy-loaded assets.'],
      ['Secure Admin Access', FiPackage, 'JWT-authenticated administration suite with real-time stats.'],
    ],
    challenges: [
      'Building a cohesive architecture combining live dynamic database editing with resilient offline fallback.',
      'Implementing flexible case-insensitive matching for natural visitor questions.',
      'Designing an ultra-clean cyber-modern user interface across all screen sizes.',
    ],
    solutions: [
      'Built dual-layer data resolution: MongoDB cloud database with rich fallback defaults.',
      'Engineered token-based multi-tier search matching for chatbot inquiries.',
      'Refined CSS variables and modular flex/grid layouts with responsive breakpoints.',
    ],
    techStack: 'React · Vite · Node.js · Express · MongoDB Atlas · JWT · Mongoose',
    learned: 'Engineered an end-to-end full-stack portfolio ecosystem with live CMS, MongoDB Atlas integration, and automated lead capture.',
  },
};

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(() => {
    return projectsData[id] || projectsData['thekissancity'];
  });

  useEffect(() => {
    // 1. Check local rich dataset first
    if (projectsData[id]) {
      setProject(projectsData[id]);
    }

    // 2. Fetch from database to get any admin live edits
    portfolioApi
      .getProjectById(id)
      .then((res) => {
        if (res && res.project) {
          const apiProj = res.project;
          const fallback = projectsData[id] || projectsData[apiProj.slug] || projectsData['thekissancity'];

          setProject({
            title: apiProj.title || fallback.title,
            desc: apiProj.desc || fallback.desc,
            overview: apiProj.overview || fallback.overview,
            img: apiProj.img || fallback.img,
            gallery: apiProj.gallery && apiProj.gallery.length >= 2 ? apiProj.gallery : fallback.gallery,
            duration: apiProj.duration || fallback.duration,
            category: apiProj.category || fallback.category,
            role: apiProj.role || fallback.role,
            status: apiProj.status || fallback.status,
            liveUrl: apiProj.liveUrl || fallback.liveUrl,
            githubUrl: apiProj.githubUrl || fallback.githubUrl,
            tags: apiProj.tags && apiProj.tags.length > 0 ? apiProj.tags : fallback.tags,
            features: apiProj.features && apiProj.features.length > 0 ? apiProj.features : fallback.features,
            challenges: apiProj.challenges && apiProj.challenges.length > 0 ? apiProj.challenges : fallback.challenges,
            solutions: apiProj.solutions && apiProj.solutions.length > 0 ? apiProj.solutions : fallback.solutions,
            techStack: apiProj.techStack || fallback.techStack,
            learned: apiProj.learned || fallback.learned,
          });
        }
      })
      .catch((err) => {
        console.warn('Using local fallback for project detail:', err);
      });
  }, [id]);

  const titleWords = (project.title || 'Featured Project').split(' ');
  const titleFirst = titleWords[0];
  const titleRest = titleWords.slice(1).join(' ');

  return (
    <main className="detail-page">
      {/* HERO SECTION */}
      <section className="detail-hero">
        <div>
          <Link className="back" to="/projects">
            <FiArrowLeft /> Back to Projects
          </Link>
          <small>FEATURED PROJECT</small>
          <h1>
            {titleFirst}
            <br />
            <span>{titleRest}</span>
          </h1>
          <p>{project.desc || project.overview}</p>
          <div className="detail-actions">
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                Live Demo <FiExternalLink />
              </a>
            ) : (
              <a href="#live">
                Live Demo <FiExternalLink />
              </a>
            )}
            <a
              href={project.githubUrl || 'https://github.com/Ishwar78'}
              target="_blank"
              rel="noreferrer"
            >
              <FiGithub /> View Code
            </a>
          </div>
        </div>

        <div className="detail-device">
          <img
            src={project.img || '/assets/project-detail-preview.png'}
            alt={project.title}
            onError={(e) => {
              e.target.src = '/assets/project-detail-preview.png';
            }}
          />
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="detail-stats">
        <span>
          <FiCalendar />
          <b>
            {project.duration || '3+ Months'}
            <small>Duration</small>
          </b>
        </span>
        <span>
          <FiLayers />
          <b>
            {project.category || 'Full Stack'}
            <small>Project Type</small>
          </b>
        </span>
        <span>
          <FiUser />
          <b>
            {project.role || 'Full Stack Developer'}
            <small>Project Role</small>
          </b>
        </span>
        <span>
          <FiCheckCircle />
          <b>
            {project.status || 'Live'}
            <small>Deployment Status</small>
          </b>
        </span>
      </section>

      {/* BODY SECTION */}
      <section className="detail-body">
        <div className="detail-main">
          <h2>Project Overview</h2>
          {project.overview && project.overview.includes('<') ? (
            <div
              className="detail-rich-overview"
              style={{ lineHeight: '1.7', color: 'var(--muted)' }}
              dangerouslySetInnerHTML={{ __html: project.overview }}
            />
          ) : (
            <p>{project.overview || project.desc}</p>
          )}

          <div className="gallery">
            {(project.gallery && project.gallery.length > 0
              ? project.gallery
              : [project.img || '/assets/project-detail-preview.png', '/assets/projects-preview.png']
            ).slice(0, 4).map((imgSrc, idx) => (
              <img
                key={idx}
                src={imgSrc}
                alt={`${project.title} screenshot ${idx + 1}`}
                onError={(e) => {
                  e.target.src = '/assets/project-detail-preview.png';
                }}
              />
            ))}
          </div>

          <h2>Key Features</h2>
          <div className="features">
            {project.features &&
              project.features.map((feat, idx) => {
                const title = Array.isArray(feat) ? feat[0] : feat.title;
                const IconComponent = Array.isArray(feat) && feat[1] ? feat[1] : FiCheckCircle;
                const desc = Array.isArray(feat) ? feat[2] || feat[1] : feat.desc;
                return (
                  <article key={title || idx}>
                    <IconComponent />
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </article>
                );
              })}
          </div>

          <h2>Challenges & Solutions</h2>
          <div className="challenge">
            <article>
              <b>Challenges</b>
              <ul>
                {project.challenges &&
                  project.challenges.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </article>
            <article>
              <b>Solutions</b>
              <ul>
                {project.solutions &&
                  project.solutions.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </article>
          </div>
        </div>

        <aside className="detail-side">
          <div>
            <h3>Project Information</h3>
            <p>
              <b>Role</b> {project.role || 'Full Stack Developer'}
            </p>
            <p>
              <b>Type</b> {project.category || 'Web Application'}
            </p>
            <p>
              <b>Status</b> {project.status || 'Completed'}
            </p>
            <p>
              <b>Technologies</b> {(project.tags || []).slice(0, 4).join(', ') || 'React, Node.js, MongoDB'}
            </p>
            <p>
              <b>Source Code</b>{' '}
              <a
                href={project.githubUrl || 'https://github.com/Ishwar78'}
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--blue)', textDecoration: 'underline' }}
              >
                GitHub Repository
              </a>
            </p>
          </div>

          <div>
            <h3>Tech Stack</h3>
            <div className="stack-tags">
              {(project.tags || []).join(' · ') || 'React · Node.js · MongoDB · Express · REST APIs'}
            </div>
          </div>

          <div>
            <h3>What I Learned</h3>
            <p>
              {project.learned ||
                'Improved API design, debugging, state management, responsive UI development and end-to-end full-stack delivery.'}
            </p>
          </div>
        </aside>
      </section>

      <CTA />
    </main>
  );
}
