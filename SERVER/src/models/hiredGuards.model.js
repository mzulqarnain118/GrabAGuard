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
    enum: ['Door Supervisors', 'Key Holding and Alarm Response', 'Dog Handling Service', 'CCTV Monitoring', 'VIP Close Protection'],
  },
});

module.exports = mongoose.model('HiredGuard', hiredGuardSchema);
