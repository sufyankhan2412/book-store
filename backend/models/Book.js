const mongoose = require('mongoose');
const path = require('path');


const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  category: String,
  genre: String,
  isBestseller: Boolean,
  description: String,
  imagePath: String  // Store the path to the image here
});

module.exports = mongoose.model('Book', BookSchema);
