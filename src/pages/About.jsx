import React from 'react';
import {Link} from 'react-router-dom';
import {FiArrowRight,
    FiUser,
    FiMapPin,
    FiMail,
    FiBook,
     FiGlobe,
    FiDownload
} from 'react-icons/fi';
import CTA from '../components/CTA';
import './About.css';
export default function About(){return <main className="about-page">
    <section className="about-hero">
        <div>
            <small>ABOUT ME</small>
            <h1>Get To Know<br/>
            <span>Me Better</span>
            </h1><p>I'm Ishwar Sharma, a Full Stack Developer who loves building modern web applications,
                 solving real-world problems, learning new technologies, and turning ideas into useful digital products.</p>
                 <div className="about-actions">
                    <a href="/resume.pdf">
                    <FiDownload/> Download Resume</a>
                    <Link to="/contact">Contact Me</Link>
                    </div>
                    <div className="about-social">GitHub &nbsp; LinkedIn &nbsp; Twitter &nbsp; Email</div>
                    </div><div className="about-portrait">
                        <img src="/assets/ishwar-profile.jpg" alt="Ishwar Sharma"/><aside>
                            <b>2+</b>
                            <span>Years Experience</span>
                            <b>10+</b>
                            <span>Projects Completed</span>
                            <b>MCA</b>
                            <span>MDU Rohtak</span
                            ><b>Rohtak</b>
                            <span>Haryana, India</span>
                            </aside>
                            </div>
                            </section>
                            <section className="story">
                                <div>
                                    <small>MY STORY</small>
                                    <h2>From Curiosity<br/>
                                    <span>to Code</span>
                                    </h2>
                                    <p>I started my journey with a curiosity about how websites work, 
                                        and that curiosity turned into a passion for development. Over time, 
                                        I have worked on multiple projects, learned modern technologies, and 
                                        gained hands-on experience in building real-world applications.</p>
                                        <p>I believe in continuous learning and always try to improve my
                                             skills, explore new tools, and take on challenging projects
                                              that create value.</p>
                                              <Link to="/projects">Explore My Work <FiArrowRight/>
                                              </Link>
                                              </div>
                                              <div className="details"><div>
                                                <FiUser/>
                                                <span>Name<strong>Ishwar Sharma</strong>
                                                </span>
                                                </div><div><FiMail/><span>Email<strong>ishwarweb@gmail.com</strong></span></div><div><FiMapPin/><span>Location<strong>Rohtak, Haryana</strong></span></div><div><FiBook/><span>Education<strong>MCA – MDU Rohtak</strong></span></div><div><FiGlobe/><span>Languages<strong>English, Hindi</strong></span></div></div><img src="/assets/about-preview.png" alt="Workspace"/></section><section className="journey"><small>MY JOURNEY</small><h2>Education & Experience</h2><div className="journey-line"><article><i/><b>BCA – MDU Rohtak</b><span>2019 – 2022</span><p>Bachelor's in Computer Applications.</p></article><article><i/><b>MCA – MDU Rohtak</b><span>2022 – 2024</span><p>Master's in Computer Applications.</p></article><article><i/><b>Full Stack Developer (Intern)</b><span>Sep 2023 – Feb 2024</span><p>Java, Spring Boot, React and real-world projects.</p></article><article><i/><b>Technical Supervisor</b><span>Wipro</span><p>Technical operations and support.</p></article></div></section><CTA/></main>}
