const mongoose = require("mongoose");
const app = require("./app"); // use the express app from app.js
const config = require("./config/config");
//const express = require('express');

let server;

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Create Mongo connection and get the express app to listen on config.port
// index.js
//const app1 = express();

// Middleware to parse JSON
//app1.use(express.json());

// ------------------ MongoDB Connection ------------------
mongoose
  .connect(config.mongoose.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully");

    // ------------------ Start Server ------------------
    if (process.env.NODE_ENV !== "test") {
      server = app.listen(config.port, () => {
        console.log(`Server is Listening to port ${config.port}`);
      });
    }
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });

module.exports = server;
