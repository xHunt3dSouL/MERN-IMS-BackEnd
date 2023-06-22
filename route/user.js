const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const {
  verifyTokenUserOrAdmin,
  verifyTokenAdmin,
} = require("../middleware/auth");

const router = express.Router();

router.get("/", verifyTokenAdmin, getAllUsers);

router.get("/:userID", verifyTokenUserOrAdmin, getSingleUser);

router.patch("/:userID", verifyTokenUserOrAdmin, updateUser);

router.delete("/:userID", verifyTokenUserOrAdmin, deleteUser);

module.exports = router;
