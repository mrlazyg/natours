const tours = require('../dev-data/data/tours-simple.json');

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
  res.send({
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

module.exports = { getAllTours, getTour, createTour, updateTour, deleteTour };
