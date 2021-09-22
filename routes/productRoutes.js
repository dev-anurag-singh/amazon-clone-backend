const express = require('express');

const {
  aliasLatestProducts,
  getAllProducts,
  aliasTopProducts,
} = require('../controllers/productController');

const router = express.Router();

router.get('/latest', aliasLatestProducts, getAllProducts);

router.get('/top-rated', aliasTopProducts, getAllProducts);

router.route('/').get(getAllProducts);

module.exports = router;
