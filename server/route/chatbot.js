const express = require('express');
const router = express.Router();
const ChatbotQA = require('../module/ChatbotQA');
const ChatbotLead = require('../module/ChatbotLead');

// Default initial Q&A for seeding if database collection is empty
const defaultQAList = [
  {
    question: 'Who is Ishwar Sharma?',
    answer: 'Ishwar Sharma is a passionate Full Stack Developer specializing in Java, Spring Boot, React, Node.js, and modern web application development. He is based in Rohtak, Haryana.',
    keywords: ['who is', 'about ishwar', 'introduce', 'profile', 'bio', 'ishwar sharma'],
    category: 'General',
    active: true,
  },
  {
    question: 'What is your tech stack and skills?',
    answer: 'Ishwar works with Java, Spring Boot, React.js, Node.js, Express, JavaScript (ES6+), HTML5/CSS3, MongoDB, MySQL, Git/GitHub, and RESTful APIs.',
    keywords: ['skills', 'tech stack', 'technologies', 'stack', 'languages', 'tools', 'react', 'java', 'spring'],
    category: 'Skills',
    active: true,
  },
  {
    question: 'Are you available for freelance or full-time opportunities?',
    answer: 'Yes! Ishwar is actively open to full-time developer roles, contract projects, and freelance collaboration. Feel free to connect via the Contact page or email him at ishwarweb@gmail.com.',
    keywords: ['freelance', 'hire', 'available', 'job', 'full time', 'contract', 'work together', 'opportunity', 'availability'],
    category: 'Hiring',
    active: true,
  },
  {
    question: 'How can I contact Ishwar?',
    answer: 'You can contact Ishwar directly via email at ishwarweb@gmail.com, or send a message through the Contact page on this portfolio.',
    keywords: ['contact', 'email', 'phone', 'reach', 'message', 'touch', 'call', 'talk'],
    category: 'Contact',
    active: true,
  },
  {
    question: 'What projects have you worked on?',
    answer: 'Ishwar has developed TeamTrack (Employee Monitoring), TheKissanCity (E-Commerce Platform), Uni10 (Modern E-Commerce), SkillServe Academy (Education Platform), and SK Classes. Check out the Projects page for details!',
    keywords: ['projects', 'work', 'portfolio', 'teamtrack', 'kissancity', 'uni10', 'case studies', 'apps'],
    category: 'Projects',
    active: true,
  },
  {
    question: 'What is your experience?',
    answer: 'Ishwar has rich hands-on experience in full-stack development, building scalable backend APIs with Spring Boot & Node.js, and creating interactive, responsive user interfaces with React.',
    keywords: ['experience', 'work experience', 'career', 'background', 'journey', 'years'],
    category: 'Experience',
    active: true,
  },
  {
    question: 'Where can I download your resume?',
    answer: 'You can view and download Ishwar’s updated resume from the Experience page or by clicking the Resume button on the portfolio.',
    keywords: ['resume', 'cv', 'download resume', 'curriculum vitae'],
    category: 'General',
    active: true,
  },
];

// Helper to normalize strings for case-insensitive and punctuation-free matching
const normalizeText = (str = '') => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/* =========================================================
   1. Q&A MANAGEMENT ROUTES
   ========================================================= */

// GET /api/chatbot/qa - List all Q&A
router.get('/qa', async (req, res) => {
  try {
    let list = await ChatbotQA.find().sort({ createdAt: -1 });
    if (list.length === 0) {
      list = await ChatbotQA.insertMany(defaultQAList);
    }
    return res.json({ success: true, count: list.length, qaList: list });
  } catch (error) {
    console.error('Error fetching Chatbot QA:', error);
    return res.json({ success: true, count: defaultQAList.length, qaList: defaultQAList });
  }
});

// POST /api/chatbot/qa - Create a new Q&A
router.post('/qa', async (req, res) => {
  try {
    const { question, answer, keywords, category, active } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ success: false, message: 'Question and Answer are required.' });
    }

    let parsedKeywords = [];
    if (Array.isArray(keywords)) {
      parsedKeywords = keywords.map((k) => String(k).trim()).filter(Boolean);
    } else if (typeof keywords === 'string') {
      parsedKeywords = keywords
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean);
    }

    const newQA = new ChatbotQA({
      question: question.trim(),
      answer: answer.trim(),
      keywords: parsedKeywords,
      category: category ? category.trim() : 'General',
      active: active !== undefined ? Boolean(active) : true,
    });

    await newQA.save();
    return res.status(201).json({ success: true, qa: newQA });
  } catch (error) {
    console.error('Error creating Chatbot QA:', error);
    return res.status(500).json({ success: false, message: 'Failed to create Chatbot QA.' });
  }
});

// PUT /api/chatbot/qa/:id - Update Q&A
router.put('/qa/:id', async (req, res) => {
  try {
    const { question, answer, keywords, category, active } = req.body;
    let updateData = {};
    if (question !== undefined) updateData.question = question.trim();
    if (answer !== undefined) updateData.answer = answer.trim();
    if (category !== undefined) updateData.category = category.trim();
    if (active !== undefined) updateData.active = Boolean(active);

    if (keywords !== undefined) {
      if (Array.isArray(keywords)) {
        updateData.keywords = keywords.map((k) => String(k).trim()).filter(Boolean);
      } else if (typeof keywords === 'string') {
        updateData.keywords = keywords
          .split(',')
          .map((k) => k.trim())
          .filter(Boolean);
      }
    }

    const updated = await ChatbotQA.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Q&A not found.' });
    }

    return res.json({ success: true, qa: updated });
  } catch (error) {
    console.error('Error updating Chatbot QA:', error);
    return res.status(500).json({ success: false, message: 'Failed to update Chatbot QA.' });
  }
});

// DELETE /api/chatbot/qa/:id - Delete Q&A
router.delete('/qa/:id', async (req, res) => {
  try {
    const deleted = await ChatbotQA.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Q&A not found.' });
    }
    return res.json({ success: true, message: 'Q&A deleted successfully.' });
  } catch (error) {
    console.error('Error deleting Chatbot QA:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete Chatbot QA.' });
  }
});

/* =========================================================
   2. INTELLIGENT MATCHING QUERY (Case-Insensitive & Keywords)
   ========================================================= */

// POST /api/chatbot/query - Match visitor question against admin Q&A
router.post('/query', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.json({ matched: false });
    }

    const rawUser = message.trim();
    const normUser = normalizeText(rawUser);

    if (!normUser) {
      return res.json({ matched: false });
    }

    // Fetch active Q&A items from database (or fallback to defaults)
    let qaList = await ChatbotQA.find({ active: true });
    if (!qaList || qaList.length === 0) {
      qaList = defaultQAList;
    }

    let bestMatch = null;
    let highestScore = 0;

    const userWords = normUser.split(' ').filter(Boolean);

    for (const item of qaList) {
      const normQ = normalizeText(item.question);
      let score = 0;

      // 1. Exact match (case & punctuation insensitive)
      if (normUser === normQ) {
        score = 100;
      }
      // 2. Contains entire question or question contains user text
      else if (normUser.length >= 4 && normQ.length >= 4) {
        if (normUser.includes(normQ)) {
          score = 90;
        } else if (normQ.includes(normUser)) {
          score = 80;
        }
      }

      // 3. Keyword matching
      if (score < 90 && item.keywords && item.keywords.length > 0) {
        for (const kw of item.keywords) {
          const normKw = normalizeText(kw);
          if (!normKw) continue;

          // If keyword phrase is in user message
          if (normUser.includes(normKw)) {
            score = Math.max(score, 75 + normKw.length);
          } else {
            // Check word-by-word token overlap
            const kwWords = normKw.split(' ').filter(Boolean);
            const matchedWords = kwWords.filter((w) => userWords.includes(w));
            if (matchedWords.length > 0 && matchedWords.length === kwWords.length) {
              score = Math.max(score, 70);
            }
          }
        }
      }

      // 4. Overlapping words between question and user query
      if (score < 60) {
        const qWords = normQ.split(' ').filter((w) => w.length > 2);
        const matchCount = qWords.filter((w) => userWords.includes(w)).length;
        if (qWords.length > 0 && matchCount >= 2) {
          const overlapRatio = matchCount / qWords.length;
          if (overlapRatio >= 0.5) {
            score = Math.max(score, Math.round(overlapRatio * 60));
          }
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    // Match threshold: score >= 50
    if (bestMatch && highestScore >= 50) {
      return res.json({
        matched: true,
        answer: bestMatch.answer,
        question: bestMatch.question,
        score: highestScore,
      });
    }

    return res.json({ matched: false });
  } catch (error) {
    console.error('Error during chatbot query:', error);
    return res.json({ matched: false });
  }
});

/* =========================================================
   3. CHATBOT LEADS / INQUIRIES
   ========================================================= */

// POST /api/chatbot/lead - Save visitor lead from chatbot
router.post('/lead', async (req, res) => {
  try {
    const { name, contact, company, notes } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Visitor name is required.' });
    }

    if (!contact || !contact.trim()) {
      return res.status(400).json({ success: false, message: 'Contact detail is required.' });
    }

    const newLead = new ChatbotLead({
      name: name.trim(),
      contact: contact.trim(),
      company: company && company.trim() ? company.trim() : 'Not Specified',
      notes: notes ? notes.trim() : '',
      status: 'new',
    });

    await newLead.save();

    return res.status(201).json({
      success: true,
      message: 'Chatbot inquiry saved successfully!',
      lead: newLead,
    });
  } catch (error) {
    console.error('Error saving chatbot lead:', error);
    return res.status(500).json({ success: false, message: 'Failed to save chatbot lead.' });
  }
});

// GET /api/chatbot/leads - List all chatbot inquiries for admin
router.get('/leads', async (req, res) => {
  try {
    const leads = await ChatbotLead.find().sort({ createdAt: -1 });
    return res.json({
      success: true,
      count: leads.length,
      leads,
    });
  } catch (error) {
    console.error('Error fetching chatbot leads:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch chatbot leads.' });
  }
});

// PATCH /api/chatbot/leads/:id - Update lead status
router.patch('/leads/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await ChatbotLead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Lead not found.' });
    }
    return res.json({ success: true, lead: updated });
  } catch (error) {
    console.error('Error updating lead status:', error);
    return res.status(500).json({ success: false, message: 'Failed to update lead status.' });
  }
});

// DELETE /api/chatbot/leads/:id - Delete lead
router.delete('/leads/:id', async (req, res) => {
  try {
    const deleted = await ChatbotLead.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Lead not found.' });
    }
    return res.json({ success: true, message: 'Lead deleted successfully.' });
  } catch (error) {
    console.error('Error deleting chatbot lead:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete chatbot lead.' });
  }
});

module.exports = router;
