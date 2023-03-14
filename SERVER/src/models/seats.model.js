const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const seatsScheme = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
      Default: true,
    },
    seat: {
      type: Number,
      required: true,
    },
    row: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
seatsScheme.plugin(toJSON);
seatsScheme.plugin(paginate);




/**
 * @typedef Seats
 */
const Seats = mongoose.model('Seats', seatsScheme);

module.exports = Seats;
