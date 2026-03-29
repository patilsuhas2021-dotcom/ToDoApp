const express = require("express");
const validate = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const cartValidation = require("../../validations/cart.validation");
const cartController = require("../../controllers/cart.controller");

const router = express.Router();

router.get("/", auth, cartController.getCart);

// router.post("/", auth(), validate(cartValidation.addProductToCart), cartController.addProductToCart);
router.post(
  "/", 
  auth, 
  validate(cartValidation.addProductToCart), 
  cartController.addProductToCart
  );

// router.put("/", auth(), validate(cartValidation.addProductToCart),  cartController.updateProductInCart);
router.put(
  "/", 
  auth, 
  validate(cartValidation.addProductToCart), 
  cartController.updateProductInCart
  );

  // router.delete(
  //   "/", 
  // validate(cartValidation.addProductToCart), 
  // auth, 
  // cartController.deleteProductFromCart);
  
  router.put(
    "/checkout", 
    auth, 
    cartController.checkout
    );

// router.get("/", auth, cartController.getCart);

// router.post(
//   "/",
//   auth,
//   validate(cartValidation.addProductToCart),
//   cartController.addProductToCart
// );

// router.put(
//   "/",
//   auth,
//   validate(cartValidation.addProductToCart),
//   cartController.updateProductInCart
// );


module.exports = router;
