const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Middleware placeholder for auth
const authMiddleware = (req, res, next) => {
  req.userId = req.headers['x-user-id'];
  req.userRole = req.headers['x-user-role'];
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

router.use(authMiddleware);

// Get all events (for incubators)
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 }).limit(50);
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create a new event (only incubators)
router.post('/', async (req, res) => {
  if (req.userRole !== 'incubator') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  try {
    const { title, description, date, location } = req.body;
    if (!title || !date) {
      return res.status(400).json({ message: 'Title and date are required' });
    }
    const event = new Event({
      incubatorId: req.userId,
      title,
      description,
      date,
      location,
      attendees: [],
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
