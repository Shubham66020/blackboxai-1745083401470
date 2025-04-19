const mongoose = require('mongoose');

const incubatorProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  location: { type: String },
  portfolioDetails: { type: String },
  eventsPosted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  description: { type: String },
});

module.exports = mongoose.model('IncubatorProfile', incubatorProfileSchema);
