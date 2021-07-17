const { STATUS_CODES } = require('../config/constant');
const Tour = require('../models/Tour');

/* const checkID = (req, res, next, val) => {
  if (parseInt(req.params.id) > tours.length) {
    return res.status(404).send({
      status: 'error',
      message: 'Invalid Id',
    });
  }
  next();
};
 */

const getAllTours = async (req, res) => {
  try {
    const allTours = await Tour.find();
    res.status(STATUS_CODES.OK).send({
      status: 'success',
      data: allTours,
    });
  } catch (error) {
    res.status(404).send({
      status: 'error',
      message: error,
    });
  }
};

const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(STATUS_CODES.OK).send({
      status: 'success',
      data: tour,
    });
  } catch (error) {
    res.status(404).send({
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
    res.status(400).send({
      status: 'error',
      message: error,
    });
  }
};

const updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findOneAndUpdate(req.params.id, req.body, { new: true });
    res.status(STATUS_CODES.OK).send({
      status: 'success',
      data: updatedTour,
    });
  } catch (error) {
    res.status(400).send({
      status: 'error',
      message: error,
    });
  }
};

const deleteTour = async (req, res) => {
  try {
    const deletedTour = await Tour.findOneAndDelete(req.params.id);
    res.status(STATUS_CODES.DELETED).send({
      status: 'success',
      data: deletedTour,
    });
  } catch (error) {
    res.status(400).send({
      status: 'error',
      message: error,
    });
  }
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

module.exports = { getAllTours, getTour, createTour, updateTour, deleteTour, middleware };
