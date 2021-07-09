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
    res.send({
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
    res.send({
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
    res.status(201).send({
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

const updateTour = (req, res) => {
  res.send({
    status: 'success',
    message: '<Tour updated...>',
  });
};

const deleteTour = (req, res) => {
  res.send({
    status: 'success',
    message: '<Tour deleted...>',
  });
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
