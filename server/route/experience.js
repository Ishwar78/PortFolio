const express = require('express');
const router = express.Router();
const Experience = require('../module/Experience');

// GET /api/experience - Retrieve Experience page configuration & timeline items
router.get('/', async (req, res) => {
  try {
    let expPage = await Experience.findOne();
    if (!expPage) {
      expPage = new Experience();
      await expPage.save();
    }
    return res.json({
      success: true,
      data: expPage,
    });
  } catch (error) {
    console.error('Error fetching experience content:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve experience content.',
    });
  }
});

// PUT /api/experience - Update Experience page configuration & timeline items
router.put('/', async (req, res) => {
  try {
    const updateData = req.body;

    const setFields = {};
    if (updateData.hero) setFields.hero = updateData.hero;
    if (updateData.stats) setFields.stats = updateData.stats;
    if (updateData.timeline) setFields.timeline = updateData.timeline;
    if (updateData.tools) setFields.tools = updateData.tools;

    const updated = await Experience.findOneAndUpdate(
      {},
      { $set: setFields },
      { returnDocument: 'after', upsert: true }
    );

    return res.json({
      success: true,
      message: 'Experience page content, timeline & images saved successfully to MongoDB!',
      data: updated,
    });
  } catch (error) {
    console.error('Error saving experience content:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to save experience content to database.',
    });
  }
});

module.exports = router;
