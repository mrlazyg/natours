const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { collection: 'tours', timestamps: true }
);

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
