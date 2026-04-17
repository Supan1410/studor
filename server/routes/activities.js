const express = require('express');
const Activity = require('../models/Activity');
const router = express.Router();

// Get all activities or filter by category
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    const activities = await Activity.find(query).sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new activity
router.post('/', async (req, res) => {
  const { name, category, date } = req.body;
  
  // Validation
  if (!name || !category || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  const activity = new Activity({
    name,
    category,
    date: new Date(date)
  });
  
  try {
    const newActivity = await activity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get single activity by ID
router.get('/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update activity
router.put('/:id', async (req, res) => {
  const { name, category, date } = req.body;
  
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    
    if (name) activity.name = name;
    if (category) activity.category = category;
    if (date) activity.date = new Date(date);
    
    const updatedActivity = await activity.save();
    res.json(updatedActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete activity
router.delete('/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json({ message: 'Activity deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete all activities
router.delete('/', async (req, res) => {
  try {
    const result = await Activity.deleteMany({});
    res.json({ message: `${result.deletedCount} activities deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
