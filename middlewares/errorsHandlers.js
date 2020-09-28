const { BadRequestError } = require('../errors/BadRequestError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ConflictError } = require('../errors/ConflictError');

module.exports = (err, req, res, next) => {
  const { message, name, errors } = err;
  let hadledErr;

  if (name === 'DocumentNotFoundError') {
    hadledErr = new NotFoundError('Запрашиваемый ресурс не найден');
    return next(hadledErr);
  }
  if (name === 'CastError') {
    hadledErr = new BadRequestError('Невалидный id');
    return next(hadledErr);
  }
  if (name === 'ValidationError' && errors.email && errors.email.kind === 'unique') {
    hadledErr = new ConflictError('Пользователь с таким email уже существует');
    return next(hadledErr);
  }
  if (name === 'ValidationError') {
    hadledErr = new BadRequestError(message);
    return next(hadledErr);
  }
  return next(err);
};
