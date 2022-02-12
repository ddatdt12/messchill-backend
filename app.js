const express = require('express');
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');

const globalErrorHandler = require('./middlewares/globalErrorHandler');
const AppError = require('./utils/AppError');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
//Config
const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('HELLO STUREE');
});
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.all('*', (req, res, next) => {
  const error = new AppError(
    `Can't find ${req.originalUrl} on this server`,
    404,
  );
  next(error);
});

app.use(globalErrorHandler);

module.exports = app;
