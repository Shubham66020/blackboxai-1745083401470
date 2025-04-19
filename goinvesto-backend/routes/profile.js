const express = require('express');
const router = express.Router();
const User = require('../models/User');
const StartupProfile = require('../models/StartupProfile');
const InvestorProfile = require('../models/InvestorProfile');
const IncubatorProfile = require('../models/IncubatorProfile');

// Middleware to check user role and userId from token (placeholder)
const authMiddleware = (req, res, next) => {
  // For now, assume userId and role are passed in headers for simplicity
  req.userId = req.headers['x-user-id'];
  req.userRole = req.headers['x-user-role'];
  if (!req.userId || !req.userRole) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

router.use(authMiddleware);

// Get profile for startup
router.get('/startup', async (req, res) => {
  if (req.userRole !== 'startup') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  try {
    const profile = await StartupProfile.findOne({ userId: req.userId });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create or update startup profile
router.post('/startup', async (req, res) => {
  if (req.userRole !== 'startup') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  try {
    const data = req.body;
    let profile = await StartupProfile.findOne({ userId: req.userId });
    if (profile) {
      Object.assign(profile, data);
      await profile.save();
    } else {
      profile = new StartupProfile({ userId: req.userId, ...data });
      await profile.save();
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Similar routes for investor profile
router.get('/investor', async (req, res) => {
  if (req.userRole !== 'investor') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  try {
    const profile = await InvestorProfile.findOne({ userId: req.userId });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/investor', async (req, res) => {
  if (req.userRole !== 'investor') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  try {
    const data = req.body;
    let profile = await InvestorProfile.findOne({ userId: req.userId });
    if (profile) {
      Object.assign(profile, data);
      await profile.save();
    } else {
      profile = new InvestorProfile({ userId: req.userId, ...data });
      await profile.save();
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Similar routes for incubator profile
router.get('/incubator', async (req, res) => {
  if (req.userRole !== 'incubator') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  try {
    const profile = await IncubatorProfile.findOne({ userId: req.userId });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/incubator', async (req, res) => {
  if (req.userRole !== 'incubator') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  try {
    const data = req.body;
    let profile = await IncubatorProfile.findOne({ userId: req.userId });
    if (profile) {
      Object.assign(profile, data);
      await profile.save();
    } else {
      profile = new IncubatorProfile({ userId: req.userId, ...data });
      await profile.save();
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
