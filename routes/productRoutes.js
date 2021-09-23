const express = require('express');

const {
  aliasLatestProducts,
  getAllProducts,
  aliasTopProducts,
  aliasMostValuedProducts,
} = require('../controllers/productController');

const router = express.Router();

router.get('/latest', aliasLatestProducts, getAllProducts);

router.get('/top-rated', aliasTopProducts, getAllProducts);

router.get('/value-for-money', aliasMostValuedProducts, getAllProducts);

router.route('/').get(getAllProducts);

module.exports = router;
