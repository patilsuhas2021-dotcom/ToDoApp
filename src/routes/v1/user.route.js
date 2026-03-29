const express = require("express");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/user.controller");
const auth = require("../../middlewares/auth")
//const auth = require("../../controllers/user.controller");

const router = express.Router();


// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement a route definition for `/v1/users/:userId`
//we are passing 3 arguments here 1. protected route  2. auth function 3. validator function and finally 
// the controller callback function gets executed when this /:userID api is hit

  //No auth here for GET user  - Removed auth keyword from here
  // router.get("/:userId",  auth(),  //this is the protected route & inside the middleware we have created the auth
  // validate(userValidation.getUser),  userController.getUser);  // validation first &  controller next
  
  // Get user by ID
  router.get(
    "/:userId", 
    auth,
  validate(userValidation.getUser),  //validation runs first, then auth (protected route)
  userController.getUser
  );  // validation first &  controller next


  // Update user address
  router.put(
    "/:userId",
    auth,
   validate(userValidation.setAddress),
   userController.setAddress
  );
  //validation first & controller next

  // Get user address
router.get(
  "/:userId/address",
  auth,
  validate(userValidation.getUser),
  userController.getUserAddress
);

  module.exports = router;


