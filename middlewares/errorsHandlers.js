const {
  BadRequestError, NotFoundError, ConflictError,
} = require('./errors/errorStatusCodes');

module.exports = (err, req, res, next) => {
  const { message, name, errors } = err;

  if (name === 'DocumentNotFoundError') {
    err = new NotFoundError('Запрашиваемый ресурс не найден');
    return next(err);
  }
  if (name === 'CastError') {
    err = new BadRequestError('Невалидный id');
    return next(err);
  }
  if (name === 'ValidationError' && errors.email && errors.email.kind === 'unique') {
    err = new ConflictError('Пользователь с таким email уже существует');
    return next(err);
  }
  if (name === 'ValidationError') {
    err = new BadRequestError(message);
    return next(err);
  }
  return next(err);
};