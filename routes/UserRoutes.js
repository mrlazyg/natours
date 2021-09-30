const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.route('/photos').get(UserController.getPhotos);
router
  .route('/')
  .get(UserController.getAllUsers)
  .post(UserController.createUser);
router
  .route('/:id')
  .get(UserController.getUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = router;
