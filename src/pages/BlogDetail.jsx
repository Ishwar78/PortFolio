import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiTag,
  FiArrowRight,
  FiArrowUpRight,
  FiShare2,
} from "react-icons/fi";
import { portfolioApi } from "../lib/api";
import "./BlogDetail.css";

const blogs = [
  {
    id: 1,
    title: "How I Build Modern Full Stack Web Applications",
    slug: "how-i-build-modern-full-stack-web-applications",
    category: "Development",
    date: "September 24, 2026",
    readTime: "6 min read",
    image: "/assets/blog-fullstack.jpg",
    excerpt:
      "A practical look at how I approach building scalable and modern full stack web applications.",
    tags: ["React", "Java", "Spring Boot", "MySQL"],
    content: [
      {
        type: "paragraph",
        text:
          "Building a modern web application is not only about writing code. A good application requires a clear architecture, thoughtful user experience, reliable backend APIs and a maintainable codebase.",
      },
      {
        type: "heading",
        text: "Planning the Application",
      },
      {
        type: "paragraph",
        text:
          "Before starting development, I first understand the requirements and divide the application into smaller modules. This makes the project easier to develop, test and maintain.",
      },
      {
        type: "heading",
        text: "Frontend Development",
      },
      {
        type: "paragraph",
        text:
          "For frontend development, I prefer React because it allows me to create reusable components and build interactive interfaces efficiently. I focus on responsive layouts, clean navigation and simple user experiences.",
      },
      {
        type: "heading",
        text: "Backend Architecture",
      },
      {
        type: "paragraph",
        text:
          "The backend is responsible for business logic, authentication, database communication and APIs. Depending on the project requirements, I work with Java and Spring Boot or Node.js.",
      },
      {
        type: "heading",
        text: "Database & APIs",
      },
      {
        type: "paragraph",
        text:
          "A well-designed database structure is important for application performance and scalability. I normally use MySQL or MongoDB depending on whether the application requires relational or document-based data.",
      },
      {
        type: "heading",
        text: "Final Thoughts",
      },
      {
        type: "paragraph",
        text:
          "The goal is always to build software that is easy to understand, easy to maintain and useful for real users. Continuous learning and improving the development process are an important part of my journey.",
      },
    ],
  },

  {
    id: 2,
    title: "Why React Is Useful for Modern Frontend Development",
    slug: "why-react-is-useful-for-modern-frontend-development",
    category: "React",
    date: "September 20, 2026",
    readTime: "5 min read",
    image: "/assets/blog-react.jpg",
    excerpt:
      "Understanding component based development and why React is widely used for modern web applications.",
    tags: ["React", "JavaScript", "Frontend"],
    content: [
      {
        type: "paragraph",
        text:
          "React provides a component-based approach for building modern user interfaces. Instead of creating an entire page as one large block, applications can be divided into reusable components.",
      },
      {
        type: "heading",
        text: "Reusable Components",
      },
      {
        type: "paragraph",
        text:
          "Reusable components make development faster and help keep the codebase organized. Navigation bars, cards, forms and buttons can all be developed as independent components.",
      },
      {
        type: "heading",
        text: "Better User Experience",
      },
      {
        type: "paragraph",
        text:
          "React applications can update specific parts of the interface without requiring a complete page reload, which can result in a smooth user experience.",
      },
      {
        type: "heading",
        text: "Conclusion",
      },
      {
        type: "paragraph",
        text:
          "React is a useful choice when an application needs reusable UI components, interactive pages and a structured frontend architecture.",
      },
    ],
  },

  {
    id: 3,
    title: "My Developer Journey and What I Am Learning",
    slug: "my-developer-journey-and-what-i-am-learning",
    category: "Career",
    date: "September 15, 2026",
    readTime: "4 min read",
    image: "/assets/blog-career.jpg",
    excerpt:
      "A personal update about my development journey, projects and technologies I am exploring.",
    tags: ["Career", "Learning", "Developer"],
    content: [
      {
        type: "paragraph",
        text:
          "Every project teaches something new. My development journey has involved working with frontend technologies, backend development, databases and deployment.",
      },
      {
        type: "heading",
        text: "Learning Through Projects",
      },
      {
        type: "paragraph",
        text:
          "Building real projects has helped me understand how different technologies work together. It has also taught me how to debug problems and design better solutions.",
      },
      {
        type: "heading",
        text: "What I Am Exploring",
      },
      {
        type: "paragraph",
        text:
          "I continue exploring modern frontend development, backend architecture, cloud services, APIs and ways to improve application performance.",
      },
    ],
  },
];

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function BlogDetail() {
  const { slug } = useParams();

  const [blog, setBlog] = useState(() => {
    return (
      blogs.find((item) => item.slug === slug || slugify(item.title) === slug || String(item.id) === String(slug)) ||
      blogs[0]
    );
  });

  useEffect(() => {
    const localMatch = blogs.find(
      (item) => item.slug === slug || slugify(item.title) === slug || String(item.id) === String(slug)
    );
    if (localMatch) {
      setBlog(localMatch);
    }

    portfolioApi
      .getBlogBySlug(slug)
      .then((res) => {
        if (res && res.blog) {
          setBlog(res.blog);
        }
      })
      .catch((err) => {
        console.warn('Using local fallback for blog detail:', err);
      });
  }, [slug]);

  // Dynamic SEO Meta Tags injection + Console Output
  useEffect(() => {
    if (!blog) return;

    const seoTitle = blog.metaTitle || blog.title || 'Tech Blog Article';
    const seoDesc = blog.metaDescription || blog.excerpt || '';
    const seoKeywords = blog.metaKeywords || (Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags || '');
    const seoImg = blog.image || '/assets/projects-preview.png';
    const pageUrl = typeof window !== 'undefined' ? window.location.href : `https://ishwarweb.in/blog/${blog.slug}`;

    // 1. Update Document Title
    document.title = `${seoTitle} | Ishwar Sharma`;

    // Helper to safely set meta tag
    const setMeta = (attr, key, val) => {
      if (!val) return;
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', val);
    };

    // 2. Set Standard Meta Tags
    setMeta('name', 'title', seoTitle);
    setMeta('name', 'description', seoDesc);
    setMeta('name', 'keywords', seoKeywords);
    setMeta('name', 'author', blog.author?.name || 'Ishwar Sharma');

    // 3. Set OpenGraph Meta Tags
    setMeta('property', 'og:title', seoTitle);
    setMeta('property', 'og:description', seoDesc);
    setMeta('property', 'og:image', seoImg);
    setMeta('property', 'og:url', pageUrl);
    setMeta('property', 'og:type', 'article');

    // 4. Set Twitter Card Meta Tags
    setMeta('name', 'twitter:title', seoTitle);
    setMeta('name', 'twitter:description', seoDesc);
    setMeta('name', 'twitter:image', seoImg);

    // 5. Console Output (User explicit requirement)
    console.log(
      '%c🔍 [SEO & META TAGS LOADED FOR ARTICLE]',
      'background: #0284c7; color: #ffffff; font-weight: bold; padding: 4px 10px; border-radius: 4px; font-size: 13px;'
    );
    console.log('%c📌 Title: %c' + seoTitle, 'font-weight: bold; color: #38bdf8;', 'color: #f1f5f9;');
    console.log('%c📝 Description: %c' + seoDesc, 'font-weight: bold; color: #38bdf8;', 'color: #cbd5e1;');
    console.log('%c🏷️ Keywords: %c' + seoKeywords, 'font-weight: bold; color: #38bdf8;', 'color: #fde68a;');
    console.table({
      'SEO Meta Title': seoTitle,
      'SEO Meta Description': seoDesc,
      'SEO Meta Keywords': seoKeywords,
      'Article URL': pageUrl,
      'Category': blog.category || 'Development',
    });
  }, [blog]);

  if (!blog) {
    return (
      <main className="blog-detail-page">
        <section className="blog-not-found">
          <span>404</span>
          <h1>Blog Not Found</h1>
          <p>
            The blog you are looking for doesn't exist or may have been
            removed.
          </p>
          <Link to="/blog" className="blog-back-btn">
            <FiArrowLeft />
            Back to Blog
          </Link>
        </section>
      </main>
    );
  }

  const relatedBlogs = blogs
    .filter((item) => item.id !== blog.id && item.slug !== blog.slug)
    .slice(0, 2);

  return (
    <main className="blog-detail-page">
      <div className="blog-detail-glow glow-one"></div>
      <div className="blog-detail-glow glow-two"></div>

      <section className="blog-detail-hero">
        <div className="blog-detail-container">

          <Link to="/blog" className="back-blog">
            <FiArrowLeft />
            Back to Blog
          </Link>

          <div className="detail-meta-top">
            <span className="detail-category">{blog.category}</span>

            <span>
              <FiCalendar />
              {blog.date}
            </span>

            <span>
              <FiClock />
              {blog.readTime || '5 min read'}
            </span>
          </div>

          <h1>{blog.title}</h1>

          <p className="detail-excerpt">
            {blog.excerpt}
          </p>

          <div className="detail-author">
            <div className="author-avatar">
              I
            </div>

            <div>
              <strong>{blog.author?.name || 'Ishwar Sharma'}</strong>
              <span>{blog.author?.role || 'Full Stack Developer'}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-content-wrapper">

        <div className="detail-featured-image">
          <img
            src={blog.image || '/assets/projects-preview.png'}
            alt={blog.title}
            onError={(e) => {
              e.target.src = '/assets/projects-preview.png';
            }}
          />

          <div className="image-overlay">
            <span>{blog.category}</span>
          </div>
        </div>

        <div className="article-layout">

          <article className="article-content">

            {typeof blog.content === "string" ? (
              <div
                className="blog-rich-content"
                style={{ lineHeight: "1.8", color: "var(--muted)", fontSize: "16px" }}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            ) : Array.isArray(blog.content) ? (
              blog.content.map((section, index) =>
                section.type === "heading" ? (
                  <h2 key={index}>{section.text}</h2>
                ) : (
                  <p key={index}>{section.text}</p>
                )
              )
            ) : null}

            <div className="article-tags">
              <FiTag />

              {blog.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <div className="article-share">
              <div>
                <span>Enjoyed this article?</span>
                <strong>Let's connect and build something.</strong>
              </div>

              <Link to="/contact">
                Let's Talk
                <FiArrowRight />
              </Link>
            </div>
          </article>

          <aside className="article-sidebar">

            <div className="sidebar-card">
              <span className="sidebar-label">ABOUT AUTHOR</span>

              <div className="sidebar-author">
                <div className="sidebar-avatar">I</div>

                <div>
                  <strong>Ishwar Sharma</strong>
                  <small>Full Stack Developer</small>
                </div>
              </div>

              <p>
                I build modern web applications using React, Java,
                Spring Boot and other modern technologies.
              </p>

              <Link to="/about">
                More About Me
                <FiArrowRight />
              </Link>
            </div>

            <div className="sidebar-card share-card">
              <span className="sidebar-label">
                <FiShare2 />
                SHARE ARTICLE
              </span>

              <div className="share-buttons">
                <button>LinkedIn</button>
                <button>Twitter</button>
                <button>Copy Link</button>
              </div>
            </div>

          </aside>
        </div>
      </section>

      <section className="related-blogs">

        <div className="related-heading">
          <div>
            <span>KEEP READING</span>
            <h2>Related Articles</h2>
          </div>

          <Link to="/blog">
            View All
            <FiArrowRight />
          </Link>
        </div>

        <div className="related-grid">
          {relatedBlogs.map((item) => (
            <Link
              to={`/blog/${item.slug}`}
              className="related-card"
              key={item.id}
            >
              <div className="related-image">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="related-body">
                <span>{item.category}</span>

                <h3>{item.title}</h3>

                <p>{item.excerpt}</p>

                <div>
                  <small>{item.date}</small>
                  <FiArrowUpRight />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}