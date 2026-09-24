import React, { useState } from "react";
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
import "./Navbar.css";

export default function Navbar({ dark, setDark }) {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  const handleNavigation = () => {
    setOpen(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FiGithub />
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FiLinkedin />
          </a>

          {/* Twitter */}
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FiTwitter />
          </a>

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
            onClick={() => {
              setOpen(false);
              nav("/contact");
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
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