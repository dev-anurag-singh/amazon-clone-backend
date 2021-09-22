const express = require('express');
const app = express();
const cors = require('cors');
app.enable('trust proxy');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const AppError = require('./util/AppError');
const globalErrorHandler = require('./controllers/errorController.js');
const productRouter = require('./routes/productRoutes');

// Allow access to * origin
app.use(cors());

// Allow complex requests from * origin
app.options('*', cors());

// Using helmet to Set Http headers

app.use(helmet());

// Data sanitization against NoSQL attacks

app.use(mongoSanitize());

// Using XSS to Prevent XSS Attacks

app.use(xss());

// Logging Middleware

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Using parser to access the body

app.use(express.json());

// ROUTES

app.use('/api/v1/products', productRouter);

// Route for unmached Request

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

// ERROR HANDLER
app.use(globalErrorHandler);

module.exports = app;
