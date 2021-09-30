const { STATUS_CODES } = require('../config/constant');
const Tour = require('../models/Tour');
const { log, error } = console;

const getAllTours = async (req, res) => {
  try {
    let queryObj = { ...req.query };
    const excludedFields = ['sort', 'limit', 'page', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (match) => `$${match}`);
    queryObj = JSON.parse(queryStr);

    let dbQuery = Tour.find(queryObj); // returns query object
    //Sort
    if (req.query?.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      dbQuery = dbQuery.sort(sortBy);
    } else {
      dbQuery = dbQuery.sort('-createdAt');
    }
    //fields limit
    if (req.query?.fields) {
      const fields = req.query.fields.split(',').join(' ');
      dbQuery = dbQuery.select(fields);
    } else {
      dbQuery = dbQuery.select('-__v');
    }

    const allTours = await dbQuery; // return actual results
    res.status(STATUS_CODES.OK).send({
      status: 'success',
      total: allTours.length,
      data: allTours,
    });
  } catch (error) {
    res.status(STATUS_CODES.NOT_FOUND).send({
      status: 'error',
      message: error,
    });
  }
};

const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id, { __v: 0 });
    res.status(STATUS_CODES.OK).send({
      status: 'success',
      data: tour,
    });
  } catch (error) {
    res.status(STATUS_CODES.NOT_FOUND).send({
      status: 'error',
      message: error,
    });
  }
};

const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(STATUS_CODES.CREATED).send({
      status: 'success',
      data: newTour,
    });
  } catch (error) {
    res.status(STATUS_CODES.BAD_REQUEST).send({
      status: 'error',
      message: error,
    });
  }
};

const updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(STATUS_CODES.OK).send({
      status: 'success',
      data: updatedTour,
    });
  } catch (error) {
    res.status(STATUS_CODES.BAD_REQUEST).send({
      status: 'error',
      message: error,
    });
  }
};

const deleteTour = async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    res.status(STATUS_CODES.DELETED).send({
      status: 'success',
      data: deletedTour,
    });
  } catch (error) {
    res.status(STATUS_CODES.BAD_REQUEST).send({
      status: 'error',
      message: error,
    });
  }
};

/* 
const checkID = (req, res, next, val) => {
  if (parseInt(req.params.id) > tours.length) {
    return res.status(404).send({
      status: 'error',
      message: 'Invalid Id',
    });
  }
  next();
};

const middleware = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).send({
      status: 'error',
      message: 'name or price is missing',
    });
  }
  next();
};
 */

module.exports = { getAllTours, getTour, createTour, updateTour, deleteTour };
