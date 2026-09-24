const express = require('express');
const router = express.Router();
const Inquiry = require('../module/Inquiry');

// POST /api/inquiries - Submit a new inquiry from Contact page
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.',
      });
    }

    const inquiry = new Inquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      subject: subject ? subject.trim() : 'Portfolio Contact Message',
      message: message.trim(),
    });

    await inquiry.save();

    return res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully! Ishwar will get back to you soon.',
      inquiry,
    });
  } catch (error) {
    console.error('Inquiry submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
    });
  }
});

// GET /api/inquiries - List all inquiries
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return res.json({
      success: true,
      count: inquiries.length,
      inquiries,
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch inquiries.',
    });
  }
});

// PATCH /api/inquiries/:id - Update status (read/unread/replied)
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    }

    return res.json({ success: true, inquiry });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update inquiry.' });
  }
});

// DELETE /api/inquiries/:id - Delete an inquiry
router.delete('/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    }

    return res.json({ success: true, message: 'Inquiry deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete inquiry.' });
  }
});

module.exports = router;
