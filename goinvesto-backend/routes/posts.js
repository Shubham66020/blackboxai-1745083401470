const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Middleware placeholder for auth
const authMiddleware = (req, res, next) => {
  req.userId = req.headers['x-user-id'];
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

router.use(authMiddleware);

// Get all posts (common feed)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(50);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  try {
    const { type, content } = req.body;
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }
    const post = new Post({
      userId: req.userId,
      type: type || 'common',
      content,
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
