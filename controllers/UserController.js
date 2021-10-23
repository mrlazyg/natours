const users = require('../dev-data/data/users.json');
// const tokenHandler = require('../utils/TokenHandler');

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

module.exports = { getAllUsers, getUser, updateUser, createUser, deleteUser };
