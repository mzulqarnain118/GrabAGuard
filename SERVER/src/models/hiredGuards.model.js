const mongoose = require('mongoose');

const hiredGuardSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
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
});

module.exports = mongoose.model('HiredGuard', hiredGuardSchema);
