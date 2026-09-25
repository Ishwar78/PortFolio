const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      trim: true,
      default: '',
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: 'Full Stack',
    },
    tags: {
      type: [String],
      default: [],
    },
    img: {
      type: String,
      default: '/assets/projects-preview.png',
    },
    liveUrl: {
      type: String,
      default: '',
    },
    githubUrl: {
      type: String,
      default: 'https://github.com/Ishwar78',
    },
    status: {
      type: String,
      default: 'Completed',
    },
    duration: {
      type: String,
      default: '3+ Months',
    },
    role: {
      type: String,
      default: 'Full Stack Developer',
    },
    overview: {
      type: String,
      default: '',
    },
    features: {
      type: [
        {
          title: String,
          desc: String,
        },
      ],
      default: [],
    },
    challenges: {
      type: [String],
      default: [],
    },
    solutions: {
      type: [String],
      default: [],
    },
    gallery: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: true,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    pinOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
