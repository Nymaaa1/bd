const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const ApiError = require('./utils/ApiError');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(compression());
app.use(cors());
app.options('*', cors());
app.use('/v1/auth', authLimiter);
app.use('/v1', routes);
app.use('/v1/upload', express.static('upload/images')); 

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    const errorResponse = {
      status: 'error',
      message: err.message,
    };
    if (process.env.NODE_ENV === 'development') {
      errorResponse.stack = err.stack;
    }
    res.status(err.statusCode).json(errorResponse);
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Алдаа!',
    });
  }
});


module.exports = app;
