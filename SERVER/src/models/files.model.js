const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
