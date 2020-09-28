const apiUsersRouter = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUsers, getUser, getUserMe, updateUser, updateUserAvatar,
} = require('../controllers/users.js');
const { getUserScheme, updateUserScheme, updateUserAvatarScheme } = require('../utils/validationSchemes.js');

apiUsersRouter.get('/users', getUsers);
apiUsersRouter.get('/users/me', getUserMe);
apiUsersRouter.get('/users/:id', celebrate(getUserScheme), getUser);
apiUsersRouter.patch('/users/me', celebrate(updateUserScheme), updateUser);
apiUsersRouter.patch('/users/me/avatar', celebrate(updateUserAvatarScheme), updateUserAvatar);

module.exports = apiUsersRouter;
