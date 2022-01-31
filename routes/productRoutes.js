const express = require('express');

const {
  aliasLatestProducts,
  getAllProducts,
  aliasTopProducts,
  aliasMostValuedProducts,
  getProduct,
  addSearchTerm,
} = require('../controllers/productController');

const router = express.Router();

router.get('/latest', aliasLatestProducts, getAllProducts);

router.get('/top-rated', aliasTopProducts, getAllProducts);

router.get('/value-for-money', aliasMostValuedProducts, getAllProducts);

router.route('/search').get(addSearchTerm, getAllProducts);

router.route('/').get(getAllProducts);

router.route('/:id').get(getProduct);

module.exports = router;
