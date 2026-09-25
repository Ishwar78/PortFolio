const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      default: 'Development',
      trim: true,
    },
    excerpt: {
      type: String,
      default: '',
      trim: true,
    },
    content: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '/assets/projects-preview.png',
    },
    date: {
      type: String,
      default: () =>
        new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
    },
    readTime: {
      type: String,
      default: '5 min read',
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      name: { type: String, default: 'Ishwar Sharma' },
      role: { type: String, default: 'Full Stack Developer' },
      avatar: { type: String, default: 'I' },
    },
    featured: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
