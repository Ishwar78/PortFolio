import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiUser,
  FiMapPin,
  FiMail,
  FiBook,
  FiGlobe,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiTwitter,
} from 'react-icons/fi';
import CTA from '../components/CTA';
import IshwarChatbot from '../components/IshwarChatbot';
import { portfolioApi } from '../lib/api';
import './About.css';

const defaultAbout = {
  hero: {
    eyebrow: 'ABOUT ME',
    heading: 'Get To Know',
    headingHighlight: 'Me Better',
    description:
      "I'm Ishwar Sharma, a Full Stack Developer who loves building modern web applications, solving real-world problems, learning new technologies, and turning ideas into useful digital products.",
    resumeLink: '/resume.pdf',
    contactLink: '/contact',
    image: '/assets/ishwar-profile.jpg',
    stat1Value: '2+',
    stat1Label: 'Years Experience',
    stat2Value: '10+',
    stat2Label: 'Projects Completed',
    stat3Value: 'MCA',
    stat3Label: 'MDU Rohtak',
    stat4Value: 'Rohtak',
    stat4Label: 'Haryana, India',
  },
  story: {
    eyebrow: 'MY STORY',
    heading: 'From Curiosity',
    headingHighlight: 'to Code',
    paragraph1:
      'I started my journey with a curiosity about how websites work, and that curiosity turned into a passion for development. Over time, I have worked on multiple projects, learned modern technologies, and gained hands-on experience in building real-world applications.',
    paragraph2:
      'I believe in continuous learning and always try to improve my skills, explore new tools, and take on challenging projects that create value.',
    name: 'Ishwar Sharma',
    email: 'ishwarweb@gmail.com',
    location: 'Rohtak, Haryana',
    education: 'MCA – MDU Rohtak',
    languages: 'English, Hindi',
    image: '/assets/about-preview.png',
  },
  journey: {
    eyebrow: 'MY JOURNEY',
    heading: 'Education & Experience',
    milestones: [
      {
        title: 'BCA – MDU Rohtak',
        period: '2019 – 2022',
        description: "Bachelor's in Computer Applications.",
      },
      {
        title: 'MCA – MDU Rohtak',
        period: '2022 – 2024',
        description: "Master's in Computer Applications.",
      },
      {
        title: 'Full Stack Developer (Intern)',
        period: 'Sep 2023 – Feb 2024',
        description: 'Java, Spring Boot, React and real-world projects.',
      },
      {
        title: 'Technical Supervisor',
        period: 'Wipro',
        description: 'Technical operations, monitoring and troubleshooting.',
      },
    ],
  },
};

export default function About() {
  const [content, setContent] = useState(() => {
    const cached = localStorage.getItem('ishwar_about_content');
    return cached ? JSON.parse(cached) : defaultAbout;
  });

  useEffect(() => {
    portfolioApi
      .getAbout()
      .then((res) => {
        if (res && res.data && res.data.hero) {
          setContent(res.data);
          localStorage.setItem('ishwar_about_content', JSON.stringify(res.data));
        }
      })
      .catch(() => {});
  }, []);

  const hero = content?.hero || defaultAbout.hero;
  const story = content?.story || defaultAbout.story;
  const journey = content?.journey || defaultAbout.journey;
  const milestones = journey?.milestones || defaultAbout.journey.milestones;

  return (
    <main className="about-page">
      {/* =====================================================
          HERO SECTION: GET TO KNOW ME BETTER
      ====================================================== */}
      <section className="about-hero">
        <div>
          <small>{hero.eyebrow || 'ABOUT ME'}</small>
          <h1>
            {hero.heading || 'Get To Know'}
            <br />
            <span>{hero.headingHighlight || 'Me Better'}</span>
          </h1>
          <p>{hero.description}</p>
          <div className="about-actions">
            <a
              href={hero.resumeLink || '/resume.pdf'}
              target="_blank"
              rel="noreferrer"
            >
              <FiDownload /> Download Resume
            </a>
            <Link to={hero.contactLink || '/contact'}>Contact Me</Link>
          </div>
          <div className="about-social">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'inherit', textDecoration: 'none', marginRight: '14px' }}
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'inherit', textDecoration: 'none', marginRight: '14px' }}
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'inherit', textDecoration: 'none', marginRight: '14px' }}
            >
              Twitter
            </a>
            <a
              href={`mailto:${story.email || 'ishwarweb@gmail.com'}`}
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              Email
            </a>
          </div>
        </div>

        <div className="about-portrait">
          <img
            src={hero.image || '/assets/ishwar-profile.jpg'}
            alt={hero.heading || 'Ishwar Sharma'}
            onError={(e) => {
              e.target.src = '/assets/ishwar-profile.jpg';
            }}
          />
          <aside>
            <b>{hero.stat1Value || '2+'}</b>
            <span>{hero.stat1Label || 'Years Experience'}</span>
            <b>{hero.stat2Value || '10+'}</b>
            <span>{hero.stat2Label || 'Projects Completed'}</span>
            <b>{hero.stat3Value || 'MCA'}</b>
            <span>{hero.stat3Label || 'MDU Rohtak'}</span>
            <b>{hero.stat4Value || 'Rohtak'}</b>
            <span>{hero.stat4Label || 'Haryana, India'}</span>
          </aside>
        </div>
      </section>

      {/* =====================================================
          MY STORY SECTION
      ====================================================== */}
      <section className="story">
        <div>
          <small>{story.eyebrow || 'MY STORY'}</small>
          <h2>
            {story.heading || 'From Curiosity'}
            <br />
            <span>{story.headingHighlight || 'to Code'}</span>
          </h2>
          <p>{story.paragraph1}</p>
          <p>{story.paragraph2}</p>
          <Link to="/projects">
            Explore My Work <FiArrowRight />
          </Link>
        </div>

        <div className="details">
          <div>
            <FiUser />
            <span>
              Name<strong>{story.name || 'Ishwar Sharma'}</strong>
            </span>
          </div>
          <div>
            <FiMail />
            <span>
              Email<strong>{story.email || 'ishwarweb@gmail.com'}</strong>
            </span>
          </div>
          <div>
            <FiMapPin />
            <span>
              Location<strong>{story.location || 'Rohtak, Haryana'}</strong>
            </span>
          </div>
          <div>
            <FiBook />
            <span>
              Education<strong>{story.education || 'MCA – MDU Rohtak'}</strong>
            </span>
          </div>
          <div>
            <FiGlobe />
            <span>
              Languages<strong>{story.languages || 'English, Hindi'}</strong>
            </span>
          </div>
        </div>

        <img
          src={story.image || '/assets/about-preview.png'}
          alt="Workspace"
          onError={(e) => {
            e.target.src = '/assets/about-preview.png';
          }}
        />
      </section>

      {/* =====================================================
          MY JOURNEY SECTION (TIMELINE)
      ====================================================== */}
      <section className="journey">
        <small>{journey.eyebrow || 'MY JOURNEY'}</small>
        <h2>{journey.heading || 'Education & Experience'}</h2>
        <div className="journey-line">
          {milestones && milestones.length > 0 ? (
            milestones.map((item, idx) => (
              <article key={item._id || idx}>
                <i />
                <b>{item.title}</b>
                <span>{item.period}</span>
                <p>{item.description}</p>
              </article>
            ))
          ) : (
            <p style={{ color: 'var(--muted)', padding: '20px' }}>
              No milestones added yet.
            </p>
          )}
        </div>
      </section>

      <CTA />
      <IshwarChatbot />
    </main>
  );
}
