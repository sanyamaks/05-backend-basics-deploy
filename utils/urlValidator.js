const { isURL } = require('validator');
const { BadRequestError } = require('../errors/BadRequestError.js');

module.exports = (link) => {
  if (!isURL(link)) {
    throw new BadRequestError('Не верный формат ссылки');
  }
  return link;
};
