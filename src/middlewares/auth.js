const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const passport = require("passport");
//const config = require("../config/config");//changes
//const jwt = require("jsonwebtoken");//changes


/**
 * Custom callback function implementation to verify callback from passport
 * - If authentication failed, reject the promise and send back an ApiError object with
 * --- Response status code - "401 Unauthorized"
 * --- Message - "Please authenticate"
 *
 * - If authentication succeeded,
 * --- set the `req.user` property as the user object corresponding to the authenticated token
 * --- resolve the promise
 */
 const verifyCallback = (req, resolve, reject) => (err, user, info) => {
  if (err || info || !user) {
    return reject(
      new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
      );
  }
  // 🔥 ADD THIS CHECK
  if (info && info.message === "Invalid token type") {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"));
  }
  req.user = user;
  resolve();
  
 };
//---------------------changes here---------------
// const verifyCallback = (req, resolve, reject) => (err, user, info) => {
//   if (err) {
//     return reject(err);
//   }

//   if (!user) {
//     return reject(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"));
//   }

//   req.user = user;
//   resolve();
// };



/**
 * Auth middleware to authenticate using Passport "jwt" strategy with sessions disabled and a custom callback function
 * 
 */
 
//  const auth = (req, res, next) => {
//   return new Promise((resolve, reject) => {
//     passport.authenticate(
//       "jwt",
//       { session: false },
//       verifyCallback(req, resolve, reject)
//     )(req, res, next);
//   })
//     .then(() => next())
//     .catch((err) => next(err));
// };

const auth = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verifyCallback(req, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;
