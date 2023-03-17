const Joi = require('joi');

// Define Joi validation schema
exports.fileSchema = Joi.object({
  userId: Joi.string().required(),
  fileType: Joi.string().required().valid('profile_picture', 'recognition_picture', 'bug_report'),
  file: Joi.any().required()
});
