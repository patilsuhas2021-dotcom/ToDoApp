const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { tokenTypes } = require("../config/tokens");
const moment = require("moment");

/**
 * Generate jwt token
 * - Payload must contain fields
 * --- "sub": `userId` parameter
 * --- "type": `type` parameter
 *
 * - Token expiration must be set to the value of `expires` parameter
 *
 * @param {ObjectId} userId - Mongo user id
 * @param {Number} expires - Token expiration time in seconds since unix epoch
 * @param {string} type - Access token type eg: Access, Refresh
 * @param {string} [secret] - Secret key to sign the token, defaults to config.jwt.secret
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {

  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000), //changes
    exp: expires,
    type: type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Generate auth token
 * - Generate jwt token
 * - Token type should be "ACCESS"
 * - Return token and expiry date in required format
 *
 * @param {User} user
 * @returns {Promise<Object>}
 *
 * Example response:
 * "access": {
 *          "token": "eyJhbGciOiJIUzI1NiIs...",
 *          "expires": "2021-01-30T13:51:19.036Z"
 * }
 */
// const generateAuthTokens = async (user) => {

//   const accessTokenExpires = 
//   Math.floor(Date.now() / 1000) + config.jwt.accessExpirationMinutes * 60;

//   const accessToken = generateToken(user._id, accessTokenExpires, tokenTypes.ACCESS );

//   return {
//     access: {
//       token: accessToken,
//       expires: new Date(accessTokenExpires * 1000),
//     },
//   };

// };

const generateAuthTokens = async (user) => {

  //ACCESS TOKEN EXPIRY
  const accessTokenExpires = moment()
    .add(config.jwt.accessExpirationMinutes, "minutes");

  const accessToken = generateToken(
    user._id, //changes
    accessTokenExpires.unix(),
    tokenTypes.ACCESS
  );

  return {

    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },

  }
};

module.exports = {
  generateToken,
  generateAuthTokens,
};
