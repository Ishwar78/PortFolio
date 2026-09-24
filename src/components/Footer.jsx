import React from "react";
import { Link } from "react-router-dom";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiArrowUpRight,
  FiHeart,
  FiArrowUp,
} from "react-icons/fi";
import "./Footer.css";

export default function Footer() {
  const navLinks = [
    ["/", "Home"],
    ["/about", "About"],
    ["/skills", "Skills"],
    ["/projects", "Projects"],
    ["/experience", "Experience"],
    ["/contact", "Contact"],
  ];

  const socialLinks = [
    {
      href: "https://github.com/",
      icon: <FiGithub />,
      label: "GitHub",
    },
    {
      href: "https://linkedin.com/",
      icon: <FiLinkedin />,
      label: "LinkedIn",
    },
    {
      href: "https://twitter.com/",
      icon: <FiTwitter />,
      label: "Twitter",
    },
  ];

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="site-footer">
      {/* Top Glow */}
      <div className="footer-glow" />

      <div className="footer-container">
        {/* Main Footer */}
        <div className="footer-main">

          {/* Brand */}
          <div className="footer-brand-section">
            <Link to="/" className="footer-brand">
              Ishwar<span>.</span>
            </Link>

            <div className="footer-role">
              FULL STACK DEVELOPER
            </div>

            <p>
              Building modern, scalable and user-focused web applications
              with clean code and thoughtful design.
            </p>

            <Link to="/contact" className="footer-contact-btn">
              Let's Work Together
              <FiArrowUpRight />
            </Link>
          </div>

          {/* Navigation */}
          <div className="footer-column">
            <div className="footer-heading">
              <span>01</span>
              Navigation
            </div>

            <div className="footer-nav">
              {navLinks.map(([to, label]) => (
                <Link key={to} to={to}>
                  <span>{label}</span>
                  <FiArrowUpRight />
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="footer-column">
            <div className="footer-heading">
              <span>02</span>
              Connect
            </div>

            <div className="footer-social-list">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="social-icon">
                    {social.icon}
                  </span>

                  <span>{social.label}</span>

                  <FiArrowUpRight className="social-arrow" />
                </a>
              ))}

              <a href="mailto:ishwarweb@gmail.com">
                <span className="social-icon">
                  <FiMail />
                </span>

                <span>Email</span>

                <FiArrowUpRight className="social-arrow" />
              </a>
            </div>
          </div>
        </div>

        {/* Availability Banner */}
        <div className="footer-availability">
          <div className="availability-left">
            <span className="availability-dot" />

            <div>
              <strong>Available for new opportunities</strong>
              <small>
                Freelance projects, collaborations & full-time roles
              </small>
            </div>
          </div>

          <Link to="/contact">
            Get In Touch
            <FiArrowUpRight />
          </Link>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <div>
            © 2026 <strong>Ishwar Sharma</strong>. All rights reserved.
          </div>

          <div className="footer-made">
            Designed & Developed with
            <FiHeart />
            <span>by Ishwar</span>
          </div>

          <button
            className="footer-top-btn"
            onClick={scrollTop}
            aria-label="Back to top"
          >
            <FiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}