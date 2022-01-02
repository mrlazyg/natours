const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router
  .route('/')
  .get(UserController.getAllUsers)
  .post(UserController.createUser);
router
  .route('/:id')
  .get(UserController.getUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

/* router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.delete('/:userName', async (request, response) => {
  let sessionCheckResult = tokenHandler.checkSessionValidity(request, response);
  if (sessionCheckResult.error || !sessionCheckResult?.admin) {
    return response.status(RETURN_CODES.UNATHORIZED_STATUS).send({ message: 'Not authorized' });
  }
  if (!request?.params?.userName) {
    return response.status(RETURN_CODES.PRECONDITION_FAILED).send({ message: 'Missing user name parameter' });
  }
  try {
    let deleteResponse = await usersHandler.deleteUser(request?.params?.userName);
    if (!deleteResponse.error) {
      return response.status(RETURN_CODES.OK_STATUS).send({ message: 'User deleted' });
    } else {
      return response.status(RETURN_CODES.INTERNAL_ERROR_STATUS).send({ error: deleteResponse.error });
    }
  } catch (error) {
    logger.error(error);
    return response.status(RETURN_CODES.INTERNAL_ERROR_STATUS).send({ error: 'Internal error' });
  }
}); */
module.exports = router;
