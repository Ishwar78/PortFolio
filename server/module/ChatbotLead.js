const mongoose = require('mongoose');

const chatbotLeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      default: 'Not Specified',
      trim: true,
    },
    notes: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'archived'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

const ChatbotLead = mongoose.model('ChatbotLead', chatbotLeadSchema);

module.exports = ChatbotLead;
