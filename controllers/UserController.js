const users = require('../dev-data/data/users.json');
// const tokenHandler = require('../utils/TokenHandler');

const getAllUsers = (req, res) => {
  res.send({
    status: 'success',
    users,
  });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  const user = users.find((id) => userId === id.email || userId === id._id);
  if (!user) {
    return res.status(404).send({
      status: 'error',
      message: 'user not found',
    });
  }
  res.send({
    status: 'success',
    user: user || 'User not found',
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

/* const login = async (request, response) => {
  if (!request?.body?.username || !request?.body?.password) {
    logger.warn('Missing username or password:', logger.pretty(request.body));
    return response.status(RETURN_CODES.PRECONDITION_FAILED).send({ error: 'Missing username or password' });
  }
  try {
    let loginResponse = await usersHandler.loginUser(request.body);
    if (loginResponse.error) {
      return response.status(RETURN_CODES.UNATHORIZED_STATUS).send({ message: 'Not authorized' });
    }
    logger.info(request?.body?.username, '=> user logged in');
    let filteredloginResponse = _.pick(loginResponse, ['name', 'userName', 'surname', 'email', 'role']); //only need these fields
    let token = tokenHandler.sign(filteredloginResponse);
    tokenHandler.addTokenToResponse(response, token); //add to cookies
    return response.status(RETURN_CODES.OK_STATUS).send({ user: loginResponse, token: token });
  } catch (error) {
    logger.error(error);
    return response.status(RETURN_CODES.INTERNAL_ERROR_STATUS).send({ error: 'Internal error' });
  }
};

const logout = async (request, response) => {
  try {
    logger.info('Logout request');
    tokenHandler.deleteToken(response); //delete from cookies, too
    return response.status(RETURN_CODES.OK_STATUS).send({ message: 'User logged out' });
  } catch (error) {
    logger.error(error);
    return response.status(RETURN_CODES.INTERNAL_ERROR_STATUS).send({ error: 'Internal error' });
  }
}; */

module.exports = { getAllUsers, getUser, updateUser, createUser, deleteUser };
