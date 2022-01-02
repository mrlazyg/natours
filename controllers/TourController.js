/**
 * File name:  TourRoutes.js
 * @author:    (c) Noor Salim
 */
const { redBright, yellow } = require('chalk');
const { STATUS_CODES } = require('../config/constant');
const Tour = require('../models/Tour');
const TourFeatures = require('../utils/TourFeatures');

exports.getAllTours = async (req, res) => {
  log(yellow('Get all tour...'));
  try {
    // // 1. Filtering
    // const queryObj = { ...req.query };
    // const excludedFields = ['sort', 'limit', 'page', 'fields'];
    // excludedFields.forEach((el) => delete queryObj[el]);

    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (match) => `$${match}`);

    // let query = Tour.find(JSON.parse(queryStr)); // returns query object

    // // 2. Sort
    // if (req.query?.sort) {
    //   const sortBy = req.query.sort.split(',').join(' ');
    //   query = query.sort(sortBy);
    // } else {
    //   query = query.sort('-createdAt');
    // }
    // // 3. fields limit
    // if (req.query?.fields) {
    //   const fields = req.query.fields.split(',').join(' ');
    //   query = query.select(fields);
    // } else {
    //   query = query.select('-__v');
    // }
    // // 4. Pagination & limit per page
    // const page = req.query?.page * 1 || 1,
    //   limit = req.query?.limit * 1 || 20,
    //   skip = (page - 1) * limit;
    // query = query.skip(skip).limit(limit);

    // const count = await Tour.countDocuments();
    // if (skip >= count) throw new Error({ message: "This page doesn't exist!" });

    const features = new TourFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const { page, limit } = features.queryString;
    const allTours = await features.query; // return actual results
    res.status(STATUS_CODES.OK).send({
      status: 'success',
      total: allTours.length,
      page,
      limit,
      data: allTours,
    });
  } catch (err) {
    console.error(err);
    res.status(STATUS_CODES.NOT_FOUND).send({
      status: 'error',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  console.log(yellow('Get a tour...'));
  try {
    const tour = await Tour.findById(req.params.id, { __v: 0 });
    res.status(STATUS_CODES.OK).send({
      status: 'success',
      data: tour,
    });
  } catch (err) {
    res.status(STATUS_CODES.NOT_FOUND).send({
      status: 'error',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  console.log(yellow('Create and save a new tour...'));
  try {
    const tourName = typeof req.body?.name === 'string' ? req.body?.name : String(req.body?.name);
    const oldTour = await Tour.findOne({ name: tourName });
    if (oldTour?.name) {
      return res.status(STATUS_CODES.BAD_REQUEST).send({
        status: 'error',
        message: `The tour name '${oldTour?.name}' already exists`,
      });
    }
    const newTour = await Tour.create(req.body);
    res.status(STATUS_CODES.CREATED).send({
      status: 'success',
      data: newTour,
    });
  } catch (err) {
    res.status(STATUS_CODES.BAD_REQUEST).send({
      status: 'error',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  console.log(yellow('Update a tour...'));
  try {
    const { body: dataToUpdate, params } = req;
    const updatedTour = await Tour.findByIdAndUpdate(params?.id, dataToUpdate, { new: true });
    res.status(STATUS_CODES.OK).send({
      status: 'success',
      data: updatedTour,
    });
  } catch (err) {
    res.status(STATUS_CODES.BAD_REQUEST).send({
      status: 'error',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  console.log(yellow('Delete a tour...'));
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    res.status(STATUS_CODES.DELETED).send({
      status: 'success',
      data: deletedTour,
    });
  } catch (err) {
    res.status(STATUS_CODES.BAD_REQUEST).send({
      status: 'error',
      message: err,
    });
  }
};

exports.getTourStats = async (req, res) => {
  console.log(yellow('Tour Statistics...'));
  try {
    const stages = [
      { $match: { ratingsAverage: { $gte: 4.5 } } },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numOfTours: { $sum: 1 },
          numOfRatings: { $sum: '$ratingsQuantity' },
          averageRating: { $avg: '$ratingsAverage' },
          averagePrice: { $avg: '$price' },
          maxPrice: { $max: '$price' },
          minPrice: { $min: '$price' },
        },
      },
    ];
    const stats = await Tour.aggregate(stages);
    res.status(STATUS_CODES.OK).send({
      status: 'success',
      data: stats,
    });
  } catch (err) {
    error(redBright(err.message));
    res.status(STATUS_CODES.NOT_FOUND).send({
      status: 'error',
      message: err,
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  console.log(yellow(`Get monthly plans for year ${req.params.year}...`));
  try {
    const year = +req.params.year;
    const stages = [
      { $unwind: '$startDates' },
      {
        $match: {
          startDates: { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-12-31`) },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numOfTours: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      { $addFields: { month: '$_id' } },
      { $project: { _id: 0 } },
      { $sort: { numOfTours: -1 } },
    ];
    const plans = await Tour.aggregate(stages);
    res.status(STATUS_CODES.OK).send({
      status: 'success',
      total: plans.length,
      data: plans,
    });
  } catch (err) {
    console.error(redBright(err.message));
    res.status(STATUS_CODES.NOT_FOUND).send({
      status: 'error',
      message: err,
    });
  }
};
