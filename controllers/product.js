const ProductModel = require("../models/product");

// Function to get all products
const getAllProduct = async (req, res) => {
  const { category, minprice } = req.query;
  try {
    // Apply filters based on category and minprice
    if (category && minprice) {
      const filteredData = await ProductModel.find({
        category,
        price: minprice,
      });
      res.json(filteredData);
    } else if (category) {
      const filteredData = await ProductModel.find({ category });
      res.json(filteredData);
    } else if (minprice) {
      const filteredData = await ProductModel.find({
        price: { $gte: minprice },
      });
      res.json(filteredData);
    } else {
      const productData = await ProductModel.find();
      res.json(productData);
    }
  } catch (err) {
    console.log("Something went wrong");
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Function to get a single product by ID
const getSingleProduct = async (req, res) => {
  try {
    const { productID } = req.params;
    const product = await ProductModel.findById(productID);
    res.json(product ? product : "Product Not Found");
  } catch (err) {
    console.log("Something went wrong");
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Function to create a product
const createProduct = async (req, res) => {
  console.log(req.body);
  try {
    const product = await ProductModel.create(req.body);
    res.status(201).json(product); // Updated status code to 201 (Created)
  } catch (err) {
    console.log("Something went wrong");
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Function to replace a product
const replaceProduct = async (req, res) => {
  const { productID } = req.params;
  try {
    const product = await ProductModel.findByIdAndUpdate(productID, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (err) {
    console.log("Something went wrong");
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Function to update a product
const updateProduct = async (req, res) => {
  const { productID } = req.params;
  try {
    const product = await ProductModel.findByIdAndUpdate(productID, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (err) {
    console.log("Something went wrong");
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Function to delete a product
const deleteProduct = async (req, res) => {
  const { productID } = req.params;
  try {
    const product = await ProductModel.findByIdAndDelete(productID);
    res.status(200).json(product);
  } catch (err) {
    console.log("Something went wrong");
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Exporting the controller functions
module.exports = {
  getAllProduct,
  getSingleProduct,
  createProduct,
  replaceProduct,
  updateProduct,
  deleteProduct,
};
