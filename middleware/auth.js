const jwt = require("jsonwebtoken");

// Middleware to check the API key
const checkAPIKey = (req, res, next) => {
  const { APIKey } = req.query;
  if (APIKey) {
    if (APIKey === "ABC123") {
      next(); // Proceed to the next middleware if the API key is valid
    } else {
      return res.status(400).json({ message: "Invalid API Key" });
    }
  } else {
    return res.status(400).json({ message: "Missing API Key" });
  }
};

// Middleware to verify token for both user and admin
const verifyTokenUserOrAdmin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json("Token is invalid");
      }

      if (decoded.isAdmin || decoded.id === req.params.userID) {
        next(); // Proceed to the next middleware if the token is valid and the user is either an admin or the authorized user
      } else {
        res.status(403).json("You are not authorized");
      }
    });
  } else {
    res.status(403).json("You are not authenticated");
  }
};

// Middleware to verify token for admin
const verifyTokenAdmin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json("Token is invalid");
      }

      if (decoded.isAdmin) {
        next(); // Proceed to the next middleware if the token is valid and the user is an admin
      } else {
        res.status(403).json("You are not authorized");
      }
    });
  } else {
    res.status(403).json("You are not authenticated");
  }
};

module.exports = { checkAPIKey, verifyTokenUserOrAdmin, verifyTokenAdmin };
