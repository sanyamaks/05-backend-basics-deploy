const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { celebrate, errors } = require('celebrate');
const cors = require('cors');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const auth = require('./middlewares/auth.js');
const login = require('./controllers/login.js');
const createUser = require('./controllers/createUser.js');
const apiCardsRouter = require('./routes/apiCardsRouter.js');
const apiUsersRouter = require('./routes/apiUsersRouter.js');
const errorsHandler = require('./middlewares/errorsHandlers.js');
const errorsController = require('./middlewares/errorsController.js');
const { createUserScheme, loginScheme, authScheme } = require('./utils/validationSchemes.js');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const { NotFoundError } = require('./errors/NotFoundError.js');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(bodyParser.json());
app.use(helmet());

app.use(cors());

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет!');
  }, 0);
});
app.post('/signup', celebrate(createUserScheme), createUser);
app.post('/signin', celebrate(loginScheme), login);
app.use('/', celebrate(authScheme), auth, apiUsersRouter);
app.use('/', celebrate(authScheme), auth, apiCardsRouter);
app.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);
app.use(errors());

app.use(errorsHandler);
app.use(errorsController);

app.listen(PORT, () => {
  console.log('Сервер запущен на порту:');
  console.log(PORT);
});
