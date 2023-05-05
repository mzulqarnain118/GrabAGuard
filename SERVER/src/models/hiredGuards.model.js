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
    enum: ['Pending', 'Accepted', 'CheckedIn', 'CheckedOut', 'Completed', "Rejected", "Cancelled"],
  },
  guardRating: {
    type: Number,
    enum: [1, 2, 3, 4, 5]
  },
  guardReview: {
    type: String,
    trim: true,
  },
  hirerRating: {
    type: Number,
    enum: [1, 2, 3, 4, 5]
  },
  hirerReview: {
    type: String,
    trim: true,
  },
  guard_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  hirer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  guard_name: {
    type: String,
    required: true,
  },
  hirer_name: {
    type: String,
    required: true,
  },
  guard_phone: {
    type: String,
    required: true,
  },
  hirer_phone: {
    type: String,
    required: true,
  },
  hirer_profile_pic: {
    type: String,
    trim: true,
  },
  guard_profile_pic: {
    type: String,
    trim: true,
  },
  paymentStatus: {
    type: Boolean,
    default: false,
  },
  hirerFcm: {
    type: String,
    trim: true,
    default: ''
  },
  guardFcm: {
    type: String,
    trim: true,
    default: ''
  },
  payment: {
    type: String,
    trim: true,
  },
  fee: {
    type: Number,
    trim: true,
  },
  totalPayment: {
    type: Number,
    trim: true,
  },
  skill: {
    type: String,
    enum: ['Door Supervisors', 'Key Holding and Alarm Response', 'Dog Handling Service', 'CCTV Monitoring', 'VIP Close Protection'],
  }
},
  {
    timestamps: true,
  });

module.exports = mongoose.model('HiredGuard', hiredGuardSchema);
