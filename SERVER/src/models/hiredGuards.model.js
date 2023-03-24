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
  longitude: {
    type: String,
    trim: true,
  },
  latitude: {
    type: String,
    trim: true,
  },
  jobRole: {
    type: String,
    required: true,
  },
  reqStatus: {
    type: Boolean,
  },
  jobStatus: {
    type: String,
    enum: ['Pending', 'Accepted', 'Checked in','Checked out', 'Completed']
  },
  guardRating: {
    type: Number,
    enum: [1, 2, 3, 4, 5]
  },
  hirerRating: {
    type: Number,
    enum: [1, 2, 3, 4, 5]
  },
  guard_id: {
    type: String,
    required: true,
  },
  hirer_id: {
    type: String,
    required: true,
  },
  skill: {
    type: String,
    enum: ['Door Supervisors', 'Key Holding and Alarm Response', 'Dog Handling Service', 'CCTV Monitoring', 'VIP Close Protection'],
  },
});

module.exports = mongoose.model('HiredGuard', hiredGuardSchema);
