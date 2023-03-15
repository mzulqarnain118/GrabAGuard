const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const bugsSchema = mongoose.Schema(
  {
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
