import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  FiArrowRight,
  FiSearch,
  FiExternalLink,
  FiGithub,
} from 'react-icons/fi';

import CTA from '../components/CTA';
import './Projects.css';


export default function Projects() {

  const [filter, setFilter] = useState('All Projects');

  const [search, setSearch] = useState('');


  const projects = [

    /* =====================================================
       01. TEAMTRACK
    ====================================================== */

    {
      id: 'teamtrack',
      title: 'TeamTrack — Employee Activity Monitoring Platform',

      desc:
        'A full-stack employee activity monitoring platform designed to help teams track work activity through screenshots and activity data. The platform provides a centralized interface for monitoring team members, reviewing activity records and managing workforce productivity.',

      img: '/assets/projects-preview.png',

      tags: [
        'React',
        'Node.js',
        'MongoDB',
        'Activity Monitoring',
      ],

      cat: 'Full Stack',
    },


    /* =====================================================
       02. THEKISSANCITY
    ====================================================== */

    {
      id: 'thekissancity',
      title: 'TheKissanCity — E-Commerce Shopping Platform',

      desc:
        'A complete full-stack e-commerce platform featuring product browsing, categories, shopping cart, customer checkout and payment integration. The system also includes administrative functionality for managing products, inventory and online orders.',

      img: '/assets/project-detail-preview.png',

      tags: [
        'React',
        'Node.js',
        'MongoDB',
        'E-Commerce',
        'Payment Integration',
      ],

      cat: 'Web Apps',
    },


    /* =====================================================
       03. UNI10
    ====================================================== */

    {
      id: 'uni10',
      title: 'Uni10 — Modern E-Commerce Platform',

      desc:
        'A scalable e-commerce web application built for online product discovery and shopping. The platform includes product and collection management, cart functionality, checkout flow, order processing and third-party service integrations for a complete online shopping experience.',

      img: '/assets/skills-preview.png',

      tags: [
        'React',
        'Node.js',
        'MongoDB',
        'REST APIs',
        'E-Commerce',
      ],

      cat: 'Full Stack',
    },


    /* =====================================================
       04. SKILLSERVE ACADEMY
    ====================================================== */

    {
      id: 'skillserve-academy',
      title: 'SkillServe Academy — Education & Learning Platform',

      desc:
        'A modern educational website designed to present courses, learning programs and academy information through a clean and responsive interface. Built with React and Redux to provide structured content, smooth navigation and an engaging user experience across devices.',

      img: '/assets/home-preview.png',

      tags: [
        'React',
        'Redux',
        'Tailwind CSS',
        'Responsive UI',
      ],

      cat: 'React',
    },


    /* =====================================================
       05. SK CLASSES
    ====================================================== */

    {
      id: 'sk-classes',
      title: 'SK Classes — Study Abroad & Education Platform',

      desc:
        'An education-focused web platform designed to provide information and guidance for students planning their study-abroad journey. The website presents programs, services and educational information through a responsive and user-friendly interface.',

      img: '/assets/experience-preview.png',

      tags: [
        'React',
        'Node.js',
        'MongoDB',
        'Education',
        'Responsive Design',
      ],

      cat: 'Web Apps',
    },


    /* =====================================================
       06. ISHWAR PORTFOLIO
    ====================================================== */

    {
      id: 'portfolio-website',
      title: 'Ishwar Sharma — Full Stack Developer Portfolio',

      desc:
        'A modern professional portfolio showcasing my development experience, technical skills, projects and professional journey. Built with React and Vite with a responsive UI, interactive sections and a Node.js-powered backend for dynamic portfolio content management.',

      img: '/assets/home-preview.png',

      tags: [
        'React',
        'Vite',
        'Node.js',
        'REST API',
        'Responsive UI',
      ],

      cat: 'React',
    },
  ];


  /* =====================================================
     FILTER + SEARCH
  ====================================================== */

  const filtered = useMemo(() => {

    return projects.filter((p) => {

      const matchesFilter =
        filter === 'All Projects' ||
        p.cat === filter ||
        p.tags.includes(filter);


      const searchText = search
        .toLowerCase()
        .trim();


      const matchesSearch =
        p.title.toLowerCase().includes(searchText) ||
        p.desc.toLowerCase().includes(searchText) ||
        p.tags.some((tag) =>
          tag.toLowerCase().includes(searchText)
        );


      return matchesFilter && matchesSearch;

    });

  }, [filter, search]);


  return (

    <main className="projects-page">


      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <section className="projects-hero">

        <div>

          <small>
            MY PROJECTS
          </small>


          <h1>

            Turning Ideas Into

            <br />

            <span>
              Real Projects
            </span>

          </h1>


          <p>
            Here are some of the projects I've worked on.
            Each project helped me learn, solve real problems
            and improve my skills as a developer.
          </p>


          <div>

            <Link to="/contact">

              Let's Connect

              <FiArrowRight />

            </Link>


            <Link to="/experience">

              View Resume

            </Link>

          </div>


          <div className="project-stats">

            <span>

              <b>
                10+
              </b>

              Projects Completed

            </span>


            <span>

              <b>
                3+
              </b>

              Live Projects

            </span>


            <span>

              <b>
                100%
              </b>

              Hands-on Experience

            </span>

          </div>

        </div>


        <img
          src="/assets/projects-preview.png"
          alt="Project preview"
        />

      </section>



      {/* =====================================================
          PROJECT LIST
      ====================================================== */}

      <section className="project-list">


        {/* FILTERS */}

        <div className="filters">


          <div>

            {[
              'All Projects',
              'Web Apps',
              'Full Stack',
              'React',
              'Java',
            ].map((x) => (

              <button
                className={
                  filter === x
                    ? 'active'
                    : ''
                }

                key={x}

                onClick={() =>
                  setFilter(x)
                }
              >

                {x}

              </button>

            ))}

          </div>


          {/* SEARCH */}

          <label>

            <FiSearch />

            <input
              value={search}

              onChange={(e) =>
                setSearch(e.target.value)
              }

              placeholder="Search projects..."
            />

          </label>

        </div>



        {/* PROJECT GRID */}

        <div className="project-grid-full">

          {filtered.length > 0 ? (

            filtered.map((p) => (

              <article
                key={p.id}
              >


                {/* PROJECT IMAGE */}

                <div className="image-wrap">

                  <img
                    src={p.img}
                    alt={p.title}

                    onError={(e) => {
                      e.target.src =
                        '/assets/projects-preview.png';
                    }}
                  />


                  <span>
                    Featured
                  </span>

                </div>



                {/* TITLE */}

                <h2>

                  {p.title}

                  <FiExternalLink />

                </h2>



                {/* DESCRIPTION */}

                <p>
                  {p.desc}
                </p>



                {/* TECHNOLOGIES */}

                <div className="tags">

                  {p.tags.map((t) => (

                    <span key={t}>
                      {t}
                    </span>

                  ))}

                </div>



                {/* ACTIONS */}

                <div className="card-actions">


                  <Link
                    to={`/projects/${p.id}`}
                  >

                    Live Demo

                    <FiArrowRight />

                  </Link>


                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noreferrer"
                  >

                    <FiGithub />

                    View Code

                  </a>


                </div>


              </article>

            ))

          ) : (

            <div
              className="no-projects"
              style={{
                width: '100%',
                padding: '50px 20px',
                textAlign: 'center',
              }}
            >

              <h3>
                No projects found
              </h3>

              <p>
                Try another search term or
                select a different category.
              </p>

            </div>

          )}

        </div>

      </section>



      {/* =====================================================
          CTA
      ====================================================== */}

      <CTA />

    </main>

  );

}