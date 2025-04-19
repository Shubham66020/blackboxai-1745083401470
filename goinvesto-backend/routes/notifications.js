const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const User = require('../models/User');

// Middleware placeholder for auth
const authMiddleware = (req, res, next) => {
  req.userId = req.headers['x-user-id'];
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

router.use(authMiddleware);

// Get notifications for logged in user
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find({ receiverId: req.userId }).sort({ createdAt: -1 }).limit(50);
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Send a notification
router.post('/', async (req, res) => {
  try {
    const { receiverId, type } = req.body;
    if (!receiverId || !type) {
      return res.status(400).json({ message: 'receiverId and type are required' });
    }
    // Special rule: Startup can notify only 2 investors per day
    // This logic can be implemented here (simplified)
    const senderId = req.userId;
    const senderType = req.headers['x-user-role'];

    if (senderType === 'startup' && type === 'startup_to_investor') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const count = await Notification.countDocuments({
        senderId,
        type,
        createdAt: { $gte: today },
      });
      if (count >= 2) {
        return res.status(403).json({ message: 'Startup can notify only 2 investors per day' });
      }
    }

    const notification = new Notification({
      senderId,
      receiverId,
      type,
      status: 'pending',
    });
    await notification.save();
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
