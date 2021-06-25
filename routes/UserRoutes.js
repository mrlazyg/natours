const express = require('express');
const router = express.Router();

const users = require('../dev-data/data/users.json');

const getAllUsers = (req, res) => {
  res.send({
    status: 'success',
    users,
  });
};

const createUser = (req, res) => {
  res.send({
    status: 'success',
  });
};

router.route('/').get(getAllUsers).post(createUser);

module.exports = router;
