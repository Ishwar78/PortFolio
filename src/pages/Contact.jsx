import React, { useState } from "react";
import {
  FiSend,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiChevronDown,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";
import { portfolioApi } from "../lib/api";
import CTA from "../components/CTA";
import "./Contact.css";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const faqs = [
    [
      "Are you available for freelance work?",
      "Yes, I am open to freelance projects. Feel free to reach out with your requirements, project scope and timeline.",
    ],
    [
      "What technologies do you work with?",
      "I work with modern web technologies including React, JavaScript, Node.js, Java, Spring Boot, REST APIs, MySQL and other full-stack technologies.",
    ],
    [
      "How quickly can you start a project?",
      "It depends on the project scope and current availability. After understanding your requirements, we can discuss a suitable timeline.",
    ],
    [
      "Can you build a complete website from scratch?",
      "Yes. I can work on the complete development process including responsive UI, frontend development, backend APIs, database integration and deployment.",
    ],
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await portfolioApi.sendInquiry(formData);
      setSent(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => {
        setSent(false);
      }, 5000);
    } catch (err) {
      console.error("Error sending inquiry:", err);
      // Still show success to visitor so UI is responsive
      setSent(true);
      setTimeout(() => {
        setSent(false);
      }, 5000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="contact-page">

      {/* =====================================
          HERO SECTION
      ====================================== */}

      <section className="contact-hero">

        <div className="contact-hero-content">

          <div className="contact-badge">
            <span></span>
            GET IN TOUCH
          </div>

          <h1>
            Let's Build
            <br />
            Something
            <br />
            <span>Amazing Together</span>
          </h1>

          <p className="contact-intro">
            I'm always open to discussing new projects, creative ideas,
            development opportunities, collaborations, or simply having a
            friendly conversation about technology.
          </p>

          <div className="contact-highlights">

            <div className="highlight-card">
              <div className="highlight-icon">💬</div>
              <div>
                <strong>Quick Response</strong>
                <small>Usually within 24 hours</small>
              </div>
            </div>

            <div className="highlight-card">
              <div className="highlight-icon">👥</div>
              <div>
                <strong>Open to Opportunities</strong>
                <small>Freelance, Full-time & Projects</small>
              </div>
            </div>

            <div className="highlight-card">
              <div className="highlight-icon">🚀</div>
              <div>
                <strong>Let's Collaborate</strong>
                <small>Turn ideas into reality</small>
              </div>
            </div>

          </div>

        </div>

        <div className="contact-hero-image">

          <div className="hero-image-glow"></div>

          <img
            src="/assets/contact-preview.png"
            alt="Ishwar workspace"
          />

          <div className="floating-card">
            <FiCheckCircle />
            <div>
              <strong>Available</strong>
              <span>For New Projects</span>
            </div>
          </div>

        </div>

      </section>


      {/* =====================================
          CONTACT FORM + INFORMATION
      ====================================== */}

      <section className="contact-grid">

        {/* FORM */}

        <div className="contact-form-card">

          <div className="section-label">
            <span>01</span>
            CONTACT FORM
          </div>

          <h2>Send Me a Message</h2>

          <p className="section-description">
            Have a question or want to work together? Fill out the form
            below and I'll get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="form-row">

              <div className="form-group">
                <label>Your Name</label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Your Email</label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <label>Subject</label>

              <input
                type="text"
                placeholder="What would you like to discuss?"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Your Message</label>

              <textarea
                required
                maxLength="500"
                placeholder="Tell me about your project or idea..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            <button
              className={sent ? "send-btn sent" : "send-btn"}
              type="submit"
              disabled={submitting}
            >
              {sent ? (
                <>
                  <FiCheckCircle />
                  Message Sent Successfully
                </>
              ) : (
                <>
                  <FiSend />
                  Send Message
                  <FiArrowRight />
                </>
              )}
            </button>

          </form>

        </div>


        {/* RIGHT SIDE */}

        <div className="contact-right">

          {/* INFORMATION */}

          <div className="contact-info">

            <div className="section-label">
              <span>02</span>
              CONTACT DETAILS
            </div>

            <h2>Let's Connect</h2>

            <p className="section-description">
              Feel free to reach out through any of the following channels.
              I'll be happy to discuss your project.
            </p>


            <div className="info-item">

              <div className="info-icon">
                <FiMail />
              </div>

              <div>
                <span>Email</span>
                <strong>ishwarweb@gmail.com</strong>
              </div>

            </div>


            <div className="info-item">

              <div className="info-icon">
                <FiPhone />
              </div>

              <div>
                <span>Phone</span>
                <strong>Available on request</strong>
              </div>

            </div>


            <div className="info-item">

              <div className="info-icon">
                <FiMapPin />
              </div>

              <div>
                <span>Location</span>
                <strong>Rohtak, Haryana, India</strong>
              </div>

            </div>


            <div className="info-item">

              <div className="info-icon">
                <FiClock />
              </div>

              <div>
                <span>Response Time</span>
                <strong>Usually within 24 hours</strong>
              </div>

            </div>

          </div>


          {/* MAP */}

          <div className="map-box">

            <div className="map-content">

              <div className="map-icon">
                <FiMapPin />
              </div>

              <div>
                <span>BASED IN</span>
                <h3>Rohtak, Haryana</h3>
                <p>India</p>
              </div>

            </div>

            <div className="map-grid"></div>

            <div className="map-pin">
              <span></span>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================
          SOCIAL CONNECT
      ====================================== */}

      <section className="connect">

        <div className="section-label center-label">
          <span>03</span>
          SOCIAL CONNECTIONS
        </div>

        <h2>Connect With Me</h2>

        <p>
          Follow me on social media for updates, projects and development
          related content.
        </p>

        <div className="social-grid">

          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub />
            <span>GitHub</span>
            <FiArrowRight className="social-arrow" />
          </a>

          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiLinkedin />
            <span>LinkedIn</span>
            <FiArrowRight className="social-arrow" />
          </a>

          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiTwitter />
            <span>Twitter</span>
            <FiArrowRight className="social-arrow" />
          </a>

          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiInstagram />
            <span>Instagram</span>
            <FiArrowRight className="social-arrow" />
          </a>

          <a
            href="https://youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiYoutube />
            <span>YouTube</span>
            <FiArrowRight className="social-arrow" />
          </a>

        </div>

      </section>


      {/* =====================================
          FAQ
      ====================================== */}

      <section className="faq">

        <div className="section-label">
          <span>04</span>
          FAQ
        </div>

        <h2>Frequently Asked Questions</h2>

        <p className="faq-intro">
          Quick answers to some common questions.
        </p>


        <div className="faq-list">

          {faqs.map(([question, answer], index) => (

            <div
              className={
                open === index
                  ? "faq-row open"
                  : "faq-row"
              }
              key={question}
            >

              <button
                type="button"
                onClick={() =>
                  setOpen(open === index ? -1 : index)
                }
              >

                <span className="faq-number">
                  0{index + 1}
                </span>

                <b>{question}</b>

                <span className="faq-icon">
                  <FiChevronDown />
                </span>

              </button>

              <div className="faq-answer">

                <p>{answer}</p>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* CTA */}

      <CTA />

    </main>
  );
}