const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  min_hourly_rate: {
    type: Number,
    required: true,
  },
  max_hourly_rate: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const AddServices = mongoose.model('AddServices', fileSchema);

module.exports = AddServices;
