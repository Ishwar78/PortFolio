const mongoose = require('mongoose');

const homeSkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      default: 'FiCode',
    },
    level: {
      type: String,
      default: 'Advanced',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const HomeSkill = mongoose.model('HomeSkill', homeSkillSchema);

module.exports = HomeSkill;
