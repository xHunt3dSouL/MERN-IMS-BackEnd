const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.send("Welcome To IMS API");
});

module.exports = router;
