const express = require("express");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const routes = require("./routes/v1");
const { errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const { jwtStrategy } = require("./config/passport");
const helmet = require("helmet");
const passport = require("passport");

const app = express();

// set security HTTP headers - https://helmetjs.github.io/
app.use(helmet());

// ------------------ Request Parsers ------------------

// Parse JSON request body
app.use(express.json());

// Parse URL-encoded request body
app.use(express.urlencoded({ extended: true }));

// ------------------ Middlewares ------------------

// Enable gzip compression
app.use(compression());


// enable cors
app.use(cors());
app.options("*", cors());


//Passport jwt authenticaion config
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// ------------------ Routes ------------------

// Reroute all API requests starting with "/v1" route
// app.use("/v1", routes);
// app.use("/v1",userRoutes);
// console.log("Reached till /v1 Routes!!!!!!");
app.use("/v1", routes);

// ------------------ 404 Handler ------------------

// Send 404 for unknown routes
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found!!!!!!!"));
});

// ------------------ Error Handler ------------------

// Global error handler
app.use(errorHandler);

module.exports = app;
