const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  hirerFee: {
    type: String,
    required: true,
  },
  guardFee: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AppData = mongoose.model('AppData', fileSchema);

module.exports = AppData;
