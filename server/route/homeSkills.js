const express = require('express');
const router = express.Router();
const HomeSkill = require('../module/HomeSkill');

// Get all home skills
router.get('/', async (req, res) => {
  try {
    const skills = await HomeSkill.find().sort({ order: 1, createdAt: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching home skills' });
  }
});

// Create new home skill
router.post('/', async (req, res) => {
  try {
    const newSkill = new HomeSkill(req.body);
    const savedSkill = await newSkill.save();
    res.status(201).json(savedSkill);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add home skill' });
  }
});

// Update home skill
router.put('/:id', async (req, res) => {
  try {
    const updatedSkill = await HomeSkill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedSkill) {
      return res.status(404).json({ error: 'Home skill not found' });
    }
    res.json(updatedSkill);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update home skill' });
  }
});

// Delete home skill
router.delete('/:id', async (req, res) => {
  try {
    const deletedSkill = await HomeSkill.findByIdAndDelete(req.params.id);
    if (!deletedSkill) {
      return res.status(404).json({ error: 'Home skill not found' });
    }
    res.json({ message: 'Home skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete home skill' });
  }
});

module.exports = router;
