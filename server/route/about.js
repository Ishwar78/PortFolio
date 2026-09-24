const express = require('express');
const router = express.Router();
const About = require('../module/About');

// GET /api/about - Retrieve About page content
router.get('/', async (req, res) => {
  try {
    let about = await About.findOne();

    if (!about) {
      about = new About();
      await about.save();
    }

    return res.json({
      success: true,
      data: about,
    });
  } catch (error) {
    console.error('Error fetching about content:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve about content.',
    });
  }
});

// PUT /api/about - Update entire About page content
router.put('/', async (req, res) => {
  try {
    const updateData = req.body;

    const setFields = {};
    if (updateData.hero) setFields.hero = updateData.hero;
    if (updateData.story) setFields.story = updateData.story;
    if (updateData.journey) setFields.journey = updateData.journey;

    const updated = await About.findOneAndUpdate(
      {},
      { $set: setFields },
      { returnDocument: 'after', upsert: true }
    );

    return res.json({
      success: true,
      message: 'About page content & images saved successfully to MongoDB!',
      data: updated,
    });
  } catch (error) {
    console.error('Error saving about content:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to save about content to database.',
    });
  }
});

module.exports = router;
