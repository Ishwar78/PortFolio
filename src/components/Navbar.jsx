import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMoon,
  FiSun,
  FiDownload,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { portfolioApi } from "../lib/api";
import "./Navbar.css";

export default function Navbar({ dark, setDark }) {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const [links, setLinks] = useState({
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    twitter: "https://twitter.com/",
    resume: "/resume.pdf",
  });

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const contactRes = await portfolioApi.getContact();
        const homeRes = await portfolioApi.getHomeContent();
        
        setLinks({
          github: contactRes?.data?.github || "https://github.com/",
          linkedin: contactRes?.data?.linkedin || "https://linkedin.com/",
          twitter: contactRes?.data?.twitter || "https://twitter.com/",
          resume: homeRes?.data?.hero?.resumeLink || "/resume.pdf",
        });
      } catch (err) {
        // use local storage fallback
        const cachedContact = localStorage.getItem('ishwar_contact_info');
        const cachedHome = localStorage.getItem('ishwar_home_content');
        if (cachedContact || cachedHome) {
          const c = cachedContact ? JSON.parse(cachedContact) : {};
          const h = cachedHome ? JSON.parse(cachedHome) : {};
          setLinks({
            github: c.github || "https://github.com/",
            linkedin: c.linkedin || "https://linkedin.com/",
            twitter: c.twitter || "https://twitter.com/",
            resume: h.hero?.resumeLink || "/resume.pdf",
          });
        }
      }
    };
    fetchLinks();
  }, []);

  const handleNavigation = () => {
    setOpen(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleResumeClick = () => {
    setOpen(false);
    if (links.resume) {
      const a = document.createElement("a");
      a.href = links.resume;
      a.download = "Resume.pdf";
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <header className="site-nav">
      <div className="nav-inner">

        {/* Logo */}
        <NavLink
          to="/"
          className="brand"
          onClick={handleNavigation}
        >
          Ishwar<span>.</span>
        </NavLink>

        {/* Mobile Menu Button */}
        <button
          className="mobile-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          type="button"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>

        {/* Navigation Links */}
        <nav className={open ? "nav-links open" : "nav-links"}>
          {[
            ["/", "Home"],
            ["/about", "About"],
            ["/skills", "Skills"],
            ["/projects", "Projects"],
            ["/experience", "Experience"],
            ["/contact", "Contact"],
            ["/blog", "Blog"]
          ].map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={handleNavigation}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="nav-actions">

          {/* GitHub */}
          {links.github && (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
          )}

          {/* LinkedIn */}
          {links.linkedin && (
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>
          )}

          {/* Twitter */}
          {links.twitter && (
            <a
              href={links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FiTwitter />
            </a>
          )}

          {/* Theme Toggle */}
          <button
            className="theme-toggle"
            onClick={() => setDark(!dark)}
            aria-label="Toggle theme"
            type="button"
          >
            {dark ? <FiSun /> : <FiMoon />}
          </button>

          {/* Resume */}
          <button
            className="resume-btn"
            onClick={handleResumeClick}
            type="button"
          >
            <FiDownload />
            <span>Download Resume</span>
          </button>
        </div>
      </div>
    </header>
  );
}