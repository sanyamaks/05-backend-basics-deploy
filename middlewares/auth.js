const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/UnauthorizedError.js');
const { NODE_ENV, JWT_SECRET } = process.env;


module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const securityScheme = 'Bearer ';
  if (!authorization || !authorization.startsWith(securityScheme)) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = authorization.replace(securityScheme, '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET:  'dev-server');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};
