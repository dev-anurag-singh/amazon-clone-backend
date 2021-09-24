const AppError = require('../util/AppError');

// BUILDING VALIDATION ERROR
const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join(' & ')}`;

  return new AppError(message, 400);
};

// BUILDING CAST ERROR
const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}:${err.value}`;

  return new AppError(message, 400);
};

const sendErrorDev = (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    errorName: err.name,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  // A) Operational, trusted error: send message to client

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // B) Programming or other unknown error: don't leak error details

  // 1) Log error
  console.error('ERROR 💥', err);

  // 2) Send generic message
  return res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    // HANDELING ERROR THROWN BY MONGOOSE VALIDATION
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);

    // HANDELING MONGOOSE CAST ERROR

    if (err.name === 'CastError') error = handleCastErrorDB(error);

    sendErrorProd(error, req, res);
  }
};
