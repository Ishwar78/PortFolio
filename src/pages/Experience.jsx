import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  FiArrowRight,
  FiDownload,
  FiBriefcase,
  FiCode,
  FiUsers,
  FiTrendingUp,
} from 'react-icons/fi';

import CTA from '../components/CTA';
import IshwarChatbot from '../components/IshwarChatbot';
import { portfolioApi } from '../lib/api';

import './Experience.css';


const defaultExperience = {
  hero: {
    eyebrow: 'MY EXPERIENCE',

    headingLine1: 'A Journey of',

    headingHighlight: 'Learning & Building',

    description:
      "Every experience has shaped me into a better developer. Here's a timeline of my professional journey, internships and the skills I've gained along the way.",

    resumeLink: '/resume.pdf',

    resumeText: 'Download Resume',

    connectLink: '/contact',

    connectText: "Let's Connect",

    image: '/assets/experience-preview.png',
  },


  stats: {
    stat1Value: '2+',
    stat1Label: 'Years Experience',

    stat2Value: '15+',
    stat2Label: 'Projects Completed',

    stat3Value: '4+',
    stat3Label: 'Companies/Clients',

    stat4Value: '100%',
    stat4Label: 'Continuous Learning',
  },


  timeline: {
    eyebrow: 'MY PROFESSIONAL JOURNEY',

    heading: 'Work Experience Timeline',

    items: [

      /* =====================================================
         WEBMOK
      ====================================================== */

      {
        role: 'Full Stack Developer',

        company: 'Webmok Pvt. Ltd.',

        period: 'Feb 2026 – Present',

        location: 'Rohtak, Haryana',

        type: 'Full-time',

        description:
          'Developing and maintaining full-stack web applications using modern frontend and backend technologies. Working on responsive user interfaces, REST APIs, database integration, authentication, third-party API integrations and deployment while troubleshooting and improving application performance.',

        technologies: [
          'React',
          'Node.js',
          'REST APIs',
          'MongoDB',
          'API Integration',
          'Deployment',
        ],

        image: '',
      },


      /* =====================================================
         SATYA WEB TECHNOLOGY
      ====================================================== */

      {
        role: 'Full Stack Developer',

        company: 'Satya Web Technology, Rohtak',

        period: 'Mar 2025 – Jan 2026',

        location: 'Rohtak, Haryana',

        type: 'Full-time',

        description:
          'Worked on full-stack web development, building responsive frontend interfaces and backend functionality. Developed and integrated APIs, worked with databases, implemented application features and supported testing, debugging and deployment of web applications.',

        technologies: [
          'React',
          'JavaScript',
          'Node.js',
          'REST APIs',
          'Database',
          'Git',
        ],

        image: '',
      },


      /* =====================================================
         AAM INFOTECH
      ====================================================== */

      {
        role: 'Full Stack Developer (Intern)',

        company: 'AAM Infotech Pvt. Ltd., Gurugram',

        period: 'Sep 2023 – Feb 2024',

        location: 'Gurugram, Haryana',

        type: 'Internship',

        description:
          'Worked on full-stack web application development using Java, Spring Boot, REST APIs and MySQL. Developed backend services, integrated databases, worked with frontend technologies and participated in application testing, debugging and feature development.',

        technologies: [
          'Java',
          'Spring Boot',
          'REST APIs',
          'MySQL',
          'React',
          'Git',
        ],

        image: '',
      },


      /* =====================================================
         EDUCATION
      ====================================================== */

      {
        role: 'BCA & MCA',

        company:
          'Maharshi Dayanand University, Rohtak (MDU)',

        period: '2019 – 2026',

        location: 'Rohtak, Haryana',

        type: 'Education',

        description:
          'Completed BCA and MCA with a strong academic foundation in computer applications and software development. Gained knowledge of programming, data structures, databases, software engineering and modern application development concepts.',

        technologies: [
          'Computer Science',
          'Software Engineering',
          'Data Structures',
          'Database Management',
        ],

        image: '',
      },
    ],
  },


  tools: {
    heading: "Tools & Environments I've Worked With",

    list: [
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
};


export default function Experience() {

  const [data, setData] = useState(() => {

    const cached = localStorage.getItem(
      'ishwar_experience_page_data'
    );

    return cached
      ? JSON.parse(cached)
      : defaultExperience;
  });


  useEffect(() => {

    portfolioApi
      .getExperience()

      .then((res) => {

        if (
          res &&
          res.data &&
          res.data.hero
        ) {

          setData(res.data);

          localStorage.setItem(
            'ishwar_experience_page_data',
            JSON.stringify(res.data)
          );
        }

      })

      .catch(() => {});

  }, []);


  const hero =
    data?.hero ||
    defaultExperience.hero;


  const stats =
    data?.stats ||
    defaultExperience.stats;


  const timeline =
    data?.timeline ||
    defaultExperience.timeline;


  const tools =
    data?.tools ||
    defaultExperience.tools;


  const items =
    timeline?.items ||
    defaultExperience.timeline.items;


  const toolsList =
    tools?.list ||
    defaultExperience.tools.list;


  return (

    <main className="experience-page">


      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <section className="exp-hero">

        <div>

          <small>
            {hero.eyebrow || 'MY EXPERIENCE'}
          </small>


          <h1>

            {hero.headingLine1 || 'A Journey of'}

            <br />

            <span>
              {hero.headingHighlight ||
                'Learning & Building'}
            </span>

          </h1>


          <p>
            {hero.description}
          </p>


          <div>

            <a
              href={
                hero.resumeLink ||
                '/resume.pdf'
              }

              target="_blank"

              rel="noreferrer"
            >

              <FiDownload />

              {hero.resumeText ||
                'Download Resume'}

            </a>


            <Link
              to={
                hero.connectLink ||
                '/contact'
              }
            >

              {hero.connectText ||
                "Let's Connect"}

              <FiArrowRight />

            </Link>

          </div>

        </div>


        <img
          src={
            hero.image ||
            '/assets/experience-preview.png'
          }

          alt="Developer workspace"

          onError={(e) => {

            e.target.src =
              '/assets/experience-preview.png';

          }}
        />

      </section>



      {/* =====================================================
          EXPERIENCE STATS
      ====================================================== */}

      <section className="exp-stats">


        <div>

          <FiBriefcase />

          <b>

            {stats.stat1Value || '3+'}

            <small>
              {stats.stat1Label ||
                'Years Experience'}
            </small>

          </b>

        </div>



        <div>

          <FiCode />

          <b>

            {stats.stat2Value || '10+'}

            <small>
              {stats.stat2Label ||
                'Projects Completed'}
            </small>

          </b>

        </div>



        <div>

          <FiUsers />

          <b>

            {stats.stat3Value || '4+'}

            <small>
              {stats.stat3Label ||
                'Companies/Clients'}
            </small>

          </b>

        </div>



        <div>

          <FiTrendingUp />

          <b>

            {stats.stat4Value || '100%'}

            <small>
              {stats.stat4Label ||
                'Continuous Learning'}
            </small>

          </b>

        </div>


      </section>



      {/* =====================================================
          TIMELINE
      ====================================================== */}

      <section className="timeline">


        <small>
          {timeline.eyebrow ||
            'MY PROFESSIONAL JOURNEY'}
        </small>


        <h2>
          {timeline.heading ||
            'Work Experience Timeline'}
        </h2>



        <div>

          {items && items.length > 0 ? (

            items.map((item, idx) => (

              <article
                key={item._id || idx}
              >


                <time>
                  {item.period}
                </time>



                <div className="timeline-card">


                  {/* Company Icon */}

                  <div className="company-icon">

                    {item.image ? (

                      <img
                        src={item.image}
                        alt={item.company}

                        style={{
                          width: '32px',
                          height: '32px',
                          objectFit: 'contain',
                          borderRadius: '4px',
                        }}
                      />

                    ) : (

                      <FiBriefcase />

                    )}

                  </div>



                  {/* Experience Content */}

                  <section>

                    <h3>
                      {item.role}
                    </h3>


                    <b>

                      {item.company}

                      {item.location
                        ? ` • ${item.location}`
                        : ''}

                    </b>


                    <p>
                      {item.description}
                    </p>

                  </section>



                  {/* Employment Type */}

                  <span>
                    {item.type ||
                      'Full-time'}
                  </span>


                </div>


              </article>

            ))

          ) : (

            <p
              style={{
                color: 'var(--muted)',
                padding: '20px',
              }}
            >
              No experience entries listed
              yet.
            </p>

          )}

        </div>

      </section>



      {/* =====================================================
          TOOLS & ENVIRONMENTS
      ====================================================== */}

      <section className="tools">


        <h2>
          {tools.heading ||
            "Tools & Environments I've Worked With"}
        </h2>


        <div>

          {toolsList.map((t) => (

            <span key={t}>

              <FiCode />

              {t}

            </span>

          ))}

        </div>

      </section>



      {/* =====================================================
          CTA
      ====================================================== */}

      <CTA />


      {/* =====================================================
          CHATBOT
      ====================================================== */}

      <IshwarChatbot />


    </main>

  );
}