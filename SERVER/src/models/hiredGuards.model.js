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
  jobStatus: {
    type: String,
    enum: ['Pending', 'Accepted', 'CheckedIn', 'CheckedOut', 'Completed', "Rejected"],
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
  hirer_name: {
    type: String,
    required: true,
  },
  skill: {
    type: String,
    enum: ['Door Supervisors', 'Key Holding and Alarm Response', 'Dog Handling Service', 'CCTV Monitoring', 'VIP Close Protection'],
  }
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('HiredGuard', hiredGuardSchema);
