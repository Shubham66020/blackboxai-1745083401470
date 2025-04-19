const mongoose = require('mongoose');

const investorProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  domainsInterested: [{ type: String }],
  fundingRange: { type: String },
  location: { type: String },
  portfolio: { type: String },
});

module.exports = mongoose.model('InvestorProfile', investorProfileSchema);
