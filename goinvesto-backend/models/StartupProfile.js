const mongoose = require('mongoose');

const startupProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  domain: { type: String, required: true },
  stage: { type: String },
  location: { type: String },
  revenue: { type: Number },
  valuation: { type: Number },
  documents: [{ type: String }],
  description: { type: String },
  fundingStage: { type: String },
  website: { type: String },
  contactInfo: { type: String },
});

module.exports = mongoose.model('StartupProfile', startupProfileSchema);
