const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const { BadRequestError } = require('../errors/BadRequestError');

module.exports = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!password) {
    throw new BadRequestError('password: Это обязательное поле');
  }
  return bcrypt.hash(password, 10)
    .then((hash) => UserModel.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
      data: {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      },
    }))
    .catch(next);
};
