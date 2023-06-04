const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  type: {
  type: String,
    required: true,
    enum: ['profilePic', 'frontId', 'backId', 'liscenseFront', 'liscenseBack', 'proofOfAddress', 'other','AboutApp','TermsAndConditions','PrivacyPolicy']
  },
  url: {
    type: String,
    required: true
  },

},
{
    timestamps: true,
  }
);

const File = mongoose.model('File', fileSchema);

module.exports = File;
