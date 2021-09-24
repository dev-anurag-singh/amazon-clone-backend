const Product = require('../models/productModel');
const catchAsync = require('../util/catchAsync');
const features = require('../util/ApiFeatures');
const AppError = require('../util/AppError');

// MIDDLEWARES TO ADD SORTING QUERY TO THE REQUEST

exports.aliasLatestProducts = (req, res, next) => {
  // REMOVING ANY UNCESSARY QUERIES
  req.query = {};
  // ADDING SORTING QUERY
  req.query.sort = '-createdAt';
  next();
};

exports.aliasTopProducts = (req, res, next) => {
  // REMOVING ANY UNCESSARY QUERIES

  req.query = {};

  // ADDING FILTER QUERY

  req.query.ratingsAverage = { gte: '4' };

  // ADDING SORTING QUERY

  req.query.sort = '-ratingsAverage,-ratingsCount';
  next();
};

exports.aliasMostValuedProducts = (req, res, next) => {
  // REMOVING ANY UNCESSARY QUERIES

  req.query = {};

  // ADDING SORTING QUERY BASED ON PRICE

  req.query.sort = 'price,-ratingsAverage';
  next();
};

//GET A SINGLE PRODUCT CONTROLLER

exports.getProduct = catchAsync(async (req, res, next) => {
  // QUERY THE DB WITH ID FOR THE PRODUCT
  const doc = await Product.findById(req.params.id);

  // SENDING ERROR IF THERE IS NO DATA IN DB WITH THIS ID
  if (!doc) {
    return next(new AppError('No Product found with this Id', 404));
  }
  // SENDING RESPONSE
  res.status(200).json({
    status: 'success',
    data: doc,
  });
});

// GET ALL PRODUCTS CONTROLLER

exports.getAllProducts = catchAsync(async (req, res, next) => {
  // FINDING DOCUMENT AND ADDING QUERIES

  const doc = await new features(Product.find(), req.query)
    .filter()
    .sort()
    .pagination().query;

  // SENDING RESPONSE
  res.status(200).json({
    results: doc.length,
    status: 'success',
    data: doc,
  });
});
