const { Joi } = require('celebrate');
const urlValidator = require('./urlValidator.js');

module.exports.createUserScheme = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(urlValidator, 'urlValidator'),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

module.exports.loginScheme = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

module.exports.authScheme = {
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
};

module.exports.getUserScheme = {
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
};

module.exports.updateUserScheme = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
};

module.exports.updateUserAvatarScheme = {
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(urlValidator, 'urlValidator'),
  }),
};

module.exports.getCardScheme = {
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
};

module.exports.createCardScheme = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(urlValidator, 'urlValidator'),
  }),
};

module.exports.removeCardScheme = {
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
};

module.exports.addLikeScheme = {
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
};

module.exports.removeLikeScheme = {
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
};
