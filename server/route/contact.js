const express = require('express');
const router = express.Router();
const Contact = require('../module/Contact');

// GET /api/contact - Retrieve Contact settings
router.get('/', async (req, res) => {
  try {
    let contact = await Contact.findOne();
    if (!contact) {
      contact = new Contact();
      await contact.save();
    }
    return res.json({ success: true, data: contact });
  } catch (error) {
    console.error('Error fetching contact content:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve contact info.' });
  }
});

// PUT /api/contact - Update Contact settings
router.put('/', async (req, res) => {
  try {
    const updateData = req.body;
    const updated = await Contact.findOneAndUpdate(
      {},
      { $set: updateData },
      { returnDocument: 'after', upsert: true }
    );
    return res.json({
      success: true,
      message: 'Contact details saved successfully to MongoDB!',
      data: updated,
    });
  } catch (error) {
    console.error('Error saving contact content:', error);
    return res.status(500).json({ success: false, message: 'Failed to save contact info.' });
  }
});

module.exports = router;
