const Joi = require('joi');

const fileSchema = Joi.object({
  userId: Joi.string().required(),
  type: Joi.string().required(),
  file: Joi.any().required()
});

function validateFile(file) {
  return fileSchema.validate(file);
}

module.exports = { validateFile };
