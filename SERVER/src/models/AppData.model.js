const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fee: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const AppData = mongoose.model('AppData', fileSchema);

module.exports = AppData;
