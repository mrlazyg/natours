/**
 * File name:  TourRoutes.js
 * @author:    (c) Noor Salim
 */
const express = require('express');
const router = express.Router();

const TourController = require('../controllers/TourController');
// router.param('id', checkID);

router.get('/tour-stats', TourController.getTourStats);
router.get('/monthly-plan/:year', TourController.getMonthlyPlan);
router
  .route('/')
  .get(TourController.getAllTours)
  .post(TourController.createTour);

router
  .route('/:id')
  .get(TourController.getTour)
  .patch(TourController.updateTour)
  .delete(TourController.deleteTour);

module.exports = router;
