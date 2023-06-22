const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title field is required!"],
    unique: true,
    minlength: [10, "Title length should be a minimum of 10 characters"],
    maxlength: [100, "Title length can be a maximum of 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Price field is required"],
    min: 0,
  },
  description: {
    type: String,
    required: [true, "Description field is required"],
  },
  category: {
    type: String,
    required: [true, "Category field is required"],
  },
  brand: {
    type: String,
    required: [true, "Brand field is required"],
  },
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
  quantity: {
    type: Number,
    required: [true, "Quantity field is required"],
    min: 0,
  },
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
