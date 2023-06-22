const express = require("express");
const {
  getAllProduct,
  getSingleProduct,
  createProduct,
  replaceProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const { checkAPIKey, verifyTokenAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", checkAPIKey, getAllProduct);

router.get("/:productID", getSingleProduct);

router.post("/", verifyTokenAdmin, createProduct);

router.put("/:productID", verifyTokenAdmin, replaceProduct);

router.patch("/:productID", verifyTokenAdmin, updateProduct);

router.delete("/:productID", verifyTokenAdmin, deleteProduct);

module.exports = router;
