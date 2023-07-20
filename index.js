const express = require("express");
// Importing routes
const productRouter = require("./route/product");
const authRouter = require("./route/auth");
const userRouter = require("./route/user");
const homeRouter = require("./route/home");
const errorRouter = require("./route/error");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const connectDatabase = require("./database/connection");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Creating an Express server
const app = express();

// Connecting to the database
connectDatabase();

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Custom middleware for logging
app.use(logger);

// Morgan middleware for logging HTTP requests
app.use(morgan("dev"));

app.use(express.json());

app.use(cookieParser());

// Linking the routes
app.use(homeRouter); // Home route
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter); // Product route
app.use(errorRouter); // Error route
// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server Started At Port ${process.env.PORT}`);
});
