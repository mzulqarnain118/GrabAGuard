const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const queriesScheme = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
queriesScheme.plugin(toJSON);
queriesScheme.plugin(paginate);




/**
 * @typedef Queries
 */
const Queries = mongoose.model('Queries', queriesScheme);

module.exports = Queries;
