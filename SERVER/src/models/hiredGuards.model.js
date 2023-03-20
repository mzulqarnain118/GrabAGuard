const mongoose = require('mongoose');

const hiredGuardSchema = new mongoose.Schema({
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobRole: {
    type: String,
    required: true,
  },
  skill: {
    type: String,
  },
});

module.exports = mongoose.model('HiredGuard', hiredGuardSchema);
