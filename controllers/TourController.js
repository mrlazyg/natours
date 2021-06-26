const tours = require('../dev-data/data/tours-simple.json');

const checkID = (req, res, next, val) => {
  if (parseInt(req.params.id) > tours.length) {
    return res.status(404).send({
      status: 'error',
      message: 'Invalid Id',
    });
  }
  next();
};
const getAllTours = (req, res) => {
  res.send({
    status: 'success',
    tours,
  });
};

const getTour = (req, res) => {
  res.send({
    status: 'success',
  });
};

const createTour = (req, res) => {
  res.status(201).send({
    status: 'success',
    message: '<Tour created...>',
  });
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

module.exports = { getAllTours, getTour, createTour, updateTour, deleteTour, checkID };
