const express = require('express');
const router = express.Router();

const { getAllTours, getTour, createTour, updateTour, deleteTour } = require('../controllers/TourController');

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
