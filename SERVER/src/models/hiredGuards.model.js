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
    type: String,
    default: ''
  },
  hirer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  guard_name: {
    type: String,
    trim: true,
  },
  hirer_name: {
    type: String,
    required: true,
  },
  guard_phone: {
    type: String,
    trim: true,
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
    trim: true,
  },
},
  {
    timestamps: true,
  });

module.exports = mongoose.model('HiredGuard', hiredGuardSchema);
