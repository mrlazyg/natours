const express = require('express');
const router = express.Router();

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

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
