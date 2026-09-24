const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
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
      default: '',
    },
    status: {
      type: String,
      default: 'Completed',
    },
    featured: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
