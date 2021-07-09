const express = require('express');
const router = express.Router();

const TourController = require('../controllers/TourController');

// router.param('id', checkID);

router
  .route('/')
  .get(TourController.getAllTours)
  .post(TourController.middleware, TourController.createTour);

router
  .route('/:id')
  .get(TourController.getTour)
  .patch(TourController.updateTour)
  .delete(TourController.deleteTour);

module.exports = router;
