import React, { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiBookOpen,
  FiSearch,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { portfolioApi } from "../lib/api";
import "./Blog.css";

const defaultBlogs = [
  {
    id: 1,
    title: "Building Modern Web Applications with React",
    excerpt:
      "A practical look at how I approach building clean, responsive and scalable React applications.",
    category: "Development",
    date: "Sep 24, 2026",
    readTime: "5 min read",
    image: "/assets/projects-preview.png",
  },
  {
    id: 2,
    title: "My Journey as a Full Stack Developer",
    excerpt:
      "From Java and Spring Boot to React and Node.js, here is how I continue improving my development skills.",
    category: "Career",
    date: "Sep 20, 2026",
    readTime: "4 min read",
    image: "/assets/skills-preview.png",
  },
  {
    id: 3,
    title: "Clean Code Practices I Follow",
    excerpt:
      "Some of the development practices I use to keep projects maintainable, scalable and easier to understand.",
    category: "Programming",
    date: "Sep 15, 2026",
    readTime: "6 min read",
    image: "/assets/project-detail-preview.png",
  },
];

export default function Blog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState(defaultBlogs);
  const [search, setSearch] = useState("");

  useEffect(() => {
    portfolioApi
      .getBlogs()
      .then((res) => {
        if (res && res.blogs && res.blogs.length > 0) {
          const publishedBlogs = res.blogs.filter((b) => b.published !== false);
          setBlogs(publishedBlogs);
          localStorage.setItem("ishwar_blog_posts", JSON.stringify(publishedBlogs));
        } else {
          const saved = localStorage.getItem("ishwar_blog_posts");
          if (saved) setBlogs(JSON.parse(saved));
        }
      })
      .catch((err) => {
        console.warn("Using local fallback blogs:", err);
        const saved = localStorage.getItem("ishwar_blog_posts");
        if (saved) setBlogs(JSON.parse(saved));
      });
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const value = search.toLowerCase();

    return (
      blog.title?.toLowerCase().includes(value) ||
      blog.category?.toLowerCase().includes(value) ||
      blog.excerpt?.toLowerCase().includes(value)
    );
  });

  return (
    <main className="blog-page">
      <section className="blog-hero">
        <div className="blog-hero-glow glow-one"></div>
        <div className="blog-hero-glow glow-two"></div>

        <div className="blog-hero-content">
          <div className="blog-eyebrow">
            <span></span>
            MY BLOG
          </div>

          <h1>
            Thoughts, Ideas &{" "}
            <span>Daily Updates.</span>
          </h1>

          <p>
            I share development insights, project updates, technology,
            learning experiences and things I discover while building
            modern web applications.
          </p>

          <div className="blog-hero-stats">
            <div>
              <strong>{blogs.length}+</strong>
              <span>Articles</span>
            </div>

            <div>
              <strong>Daily</strong>
              <span>Updates</span>
            </div>

            <div>
              <strong>Tech</strong>
              <span>Insights</span>
            </div>
          </div>
        </div>

        <div className="blog-hero-card">
          <div className="blog-card-icon">
            <FiBookOpen />
          </div>

          <span>DEVELOPER NOTES</span>

          <h2>
            Learn.
            <br />
            Build.
            <br />
            Share.
          </h2>

          <div className="hero-line"></div>

          <p>
            A collection of my development journey and daily technical
            updates.
          </p>
        </div>
      </section>

      <section className="blog-content">
        <div className="blog-section-head">
          <div>
            <div className="blog-eyebrow">LATEST ARTICLES</div>
            <h2>Latest From My Journal</h2>
          </div>

          <div className="blog-search">
            <FiSearch />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="blog-empty">
            <FiBookOpen />
            <h3>No articles found</h3>
            <p>Try searching with another keyword.</p>
          </div>
        ) : (
          <div className="blog-grid">
            {filteredBlogs.map((blog, index) => {
              const blogSlug = blog.slug || blog._id || blog.id;
              const blogPath = `/blog/${blogSlug}`;
              return (
                <article
                  className="blog-card"
                  key={blog._id || blog.slug || blog.id || index}
                  style={{ "--delay": `${index * 0.08}s`, cursor: 'pointer' }}
                  onClick={() => navigate(blogPath)}
                >
                  <div className="blog-image">
                    <img
                      src={blog.image || "/assets/projects-preview.png"}
                      alt={blog.title}
                      onError={(e) => {
                        e.target.src = "/assets/projects-preview.png";
                      }}
                    />

                    <span>{blog.category}</span>

                    <div className="blog-number">
                      0{index + 1}
                    </div>
                  </div>

                  <div className="blog-card-body">
                    <div className="blog-meta">
                      <span>
                        <FiCalendar />
                        {blog.date}
                      </span>

                      <span>
                        <FiClock />
                        {blog.readTime || '5 min read'}
                      </span>
                    </div>

                    <h3>{blog.title}</h3>

                    <p>{blog.excerpt}</p>

                    <Link to={blogPath} onClick={(e) => e.stopPropagation()}>
                      Read Article
                      <FiArrowRight />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}