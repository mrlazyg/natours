const express = require('express');
const router = express.Router();

const users = require('../dev-data/data/users.json');

const getAllUsers = (req, res) => {
  res.send({
    status: 'success',
    users,
  });
};

const getUser = (req, res) => {
  res.send({
    status: 'success',
  });
};

const createUser = (req, res) => {
  res.send({
    status: 'success',
    message: '<User created...>',
  });
};

const updateUser = (req, res) => {
  res.send({
    status: 'success',
    message: '<User updated...>',
  });
};

const deleteUser = (req, res) => {
  res.send({
    status: 'success',
    message: '<User deleted...>',
  });
};

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
