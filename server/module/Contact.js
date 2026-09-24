const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    email: { type: String, default: 'ishwarweb@gmail.com' },
    phone: { type: String, default: '+91 98765 43210' },
    location: { type: String, default: 'Rohtak, Haryana, India' },
    city: { type: String, default: 'Rohtak, Haryana' },
    country: { type: String, default: 'India' },
    response: { type: String, default: 'Usually within 24 hours' },
    availability: { type: String, default: "Let's Build Something Amazing Together" },
    intro: {
      type: String,
      default:
        "I'm always open to discussing new projects, creative ideas, development opportunities, collaborations, or simply having a friendly conversation about technology.",
    },
    github: { type: String, default: 'https://github.com/' },
    linkedin: { type: String, default: 'https://linkedin.com/' },
    twitter: { type: String, default: 'https://twitter.com/' },
    instagram: { type: String, default: 'https://instagram.com/' },
    youtube: { type: String, default: 'https://youtube.com/' },
  },
  { timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
