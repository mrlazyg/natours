const express = require('express');
const router = express.Router();

const tours = require('../dev-data/data/tours-simple.json');

const getAllTours = (req, res) => {
  res.send({
    status: 'success',
    tours,
  });
};

const createTour = (req, res) => {
  res.send({
    status: 'success',
  });
};

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getAllTours);

module.exports = router;
