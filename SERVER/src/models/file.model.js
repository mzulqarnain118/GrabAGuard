const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: String,
  filename: String,
  uploadDate: { type: Date, default: Date.now }
});

const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const queriesScheme = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    filename: {
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
