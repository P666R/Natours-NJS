const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value: ${err.keyValue.name}. Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError(`Invalid token, please log in again`, 401);

const handleJWTExpiredError = () =>
  new AppError(`Your token has expired, Please log in again`, 401);

const sendErrorDev = (err, req, res) => {
  // Handle errors for API requests
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // Handle errors for rendered website
  console.error('ERROR 💥', { ...err });
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  // Handle API errors
  if (req.originalUrl.startsWith('/api')) {
    // Send operational error message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // Log and send generic error message for programming or unknown errors
    console.error('Error 💥', { ...err });
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }

  // Handle rendered website errors
  if (err.isOperational) {
    // Send operational error message to client
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }
  // Log and send generic error message for programming or unknown errors
  console.error('Error 💥', { ...err });
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    if (err.name === 'CastError')
      return sendErrorProd(handleCastErrorDB(err), res);

    if (err.code === 11000)
      return sendErrorProd(handleDuplicateFieldsDB(err), res);

    if (err.name === 'ValidationError')
      return sendErrorProd(handleValidationErrorDB(err), res);

    if (err.name === 'JsonWebTokenError')
      return sendErrorProd(handleJWTError(), res);

    if (err.name === 'TokenExpiredError')
      return sendErrorProd(handleJWTExpiredError(), res);

    sendErrorProd(err, req, res);
  }
};
