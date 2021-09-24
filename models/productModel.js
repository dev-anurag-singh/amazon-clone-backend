const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
    maxlength: [300, 'Product name should be less than 100 Characters'],
    minlength: [10, 'Product name should be greater than 10 Character'],
    unique: [true, 'An unique name is required'],
  },
  slug: String,
  category: {
    type: [String],
    required: [true, 'Plese provide a catogory for better search results'],
  },
  created: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  brand: {
    type: String,
    required: [true, 'A product must belong to a brand'],
  },
  price: {
    type: Number,
    required: [true, 'Price is neccessary for a product'],
  },
  color: {
    type: String,
    required: [true, 'Color of product id mandatory'],
  },
  ratingsAverage: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be greater than 5.0'],
  },
  ratingsCount: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 100,
  },
  description: {
    type: String,
    required: [true, 'A product needs a description'],
  },
  coverImage: {
    type: String,
    required: [true, 'A product needs a cover Image'],
  },
  images: [String],
});

productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// REMOVING __v
productSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
