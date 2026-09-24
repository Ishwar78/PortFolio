const express = require('express');
const router = express.Router();
const Skill = require('../module/Skill');

// GET /api/skills - Retrieve Skill page configuration & skill items
router.get('/', async (req, res) => {
  try {
    let skillPage = await Skill.findOne();
    if (!skillPage) {
      skillPage = new Skill();
      await skillPage.save();
    }
    return res.json({
      success: true,
      data: skillPage,
    });
  } catch (error) {
    console.error('Error fetching skills content:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve skills content.',
    });
  }
});

// PUT /api/skills - Update Skill page configuration & skill items
router.put('/', async (req, res) => {
  try {
    const updateData = req.body;

    const setFields = {};
    if (updateData.hero) setFields.hero = updateData.hero;
    if (updateData.technical) setFields.technical = updateData.technical;
    if (updateData.toolkit) setFields.toolkit = updateData.toolkit;
    if (updateData.stats) setFields.stats = updateData.stats;

    const updated = await Skill.findOneAndUpdate(
      {},
      { $set: setFields },
      { returnDocument: 'after', upsert: true }
    );

    return res.json({
      success: true,
      message: 'Skills page content, badges & images saved successfully to MongoDB!',
      data: updated,
    });
  } catch (error) {
    console.error('Error saving skills content:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to save skills content to database.',
    });
  }
});

module.exports = router;
