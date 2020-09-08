const { Joi } = require('celebrate');

module.exports.createUserScheme = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().pattern(/https?:\/\/(www\.)?([1-2]?\d?\d(\.[1-2]?\d?\d){3}|([a-z\d]+(-[a-z\d]+)*\.)+[a-z][a-z]+)(:\d{2,5})?(\/[A-Za-z1-9]+)*((\/)|#)?/),
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
    id: Joi.string().alphanum().length(24),
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
    avatar: Joi.string().required().pattern(/https?:\/\/(www\.)?([1-2]?\d?\d(\.[1-2]?\d?\d){3}|([a-z\d]+(-[a-z\d]+)*\.)+[a-z][a-z]+)(:\d{2,5})?(\/[A-Za-z1-9]+)*(\.jpg)?((\/)|#)?/),
  }),
};

module.exports.getCardScheme = {
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
};

module.exports.createCardScheme = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/https?:\/\/(www\.)?([1-2]?\d?\d(\.[1-2]?\d?\d){3}|([a-z\d]+(-[a-z\d]+)*\.)+[a-z][a-z]+)(:\d{2,5})?(\/[A-Za-z1-9]+)*((\/)|#)?/),
  }),
};

module.exports.removeCardScheme = {
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
};

module.exports.addLikeScheme = {
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
};

module.exports.removeLikeScheme = {
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
};
