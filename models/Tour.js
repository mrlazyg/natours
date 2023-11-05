const mongoose = require('mongoose');
const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Tour name must have equal or less than 50 characters'],
      minlength: [10, 'Tour name must have equal or more than 10 characters'],
      // validate: [validator.isAlpha, 'Tour name must contains only characters'],
    },
    duration: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price can not be negetive'],
    },
    ratingsAverage: {
      type: Number,
      default: 4,
      min: [1, 'Rating must be >=1'],
      max: [5, 'Rating must be <=5'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
      trim: true,
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium or difficult',
      },
      // default: 'easy',
    },
    discount: {
      type: Number,
      validate: {
        // 'this' refers to current document on new document, doesn't work for update
        validator: function(value) {
          return value < this.price;
        },
        message: 'Discount price should be below regular price',
      },
      // validate: function(value) {
      //   return value < this.price;
      // },
    },
    summary: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: true,
      trim: true,
    },
    images: [String],
    startDates: [Date],
  },
  {
    collection: 'tours',
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtual properties aren't saved in db but returns in response and to get it, need to pass 'virtual' properties in schema options
tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

// document middleware. 'this' refers to current document. only runs before .save() and .create() not for .update()
tourSchema.pre('save', function(next) {
  // console.log(this); // 'this' refers to current document
  console.log('saving doc');
  next();
});

// query middleware
tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function(doc, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`); // 'this' refers to current query
  // console.log('saving doc', doc);
  next();
});

// aggregation middleware
// tourSchema.pre('aggregate', function(next) {
//   console.log(this.pipeline()); // 'this' refers to current aggregation object
//   next();
// });

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
