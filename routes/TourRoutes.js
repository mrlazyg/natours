const express = require('express');
const router = express.Router();

const { checkID, getAllTours, getTour, createTour, updateTour, deleteTour } = require('../controllers/TourController');

const middleware = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).send({
      status: 'error',
      message: 'name or price is missing',
    });
  }
  next();
};

router.param('id', checkID);

router.route('/').get(getAllTours).post(middleware, createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
