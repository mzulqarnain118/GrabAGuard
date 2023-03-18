const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const validator = require('validator');
const bugsSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    description: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
bugsSchema.plugin(toJSON);
bugsSchema.plugin(paginate);




/**
 * @typedef Bugs
 */
const Bugs = mongoose.model('Bugs', bugsSchema);

module.exports = Bugs;