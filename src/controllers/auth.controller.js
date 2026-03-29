const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService, userService, tokenService } = require("../services");
const { generateAuthTokens } = require("../services/token.service");

/**
 * Perform the following steps:
 * -  Call the userService to create a new user
 * -  Generate auth tokens for the user
 * -  Send back
 * --- "201 Created" status code
 * --- response in the given format
 *
 * Example response:
 *
 * {
 *  "user": {
 *      "_id": "5f71b31888ba6b128ba16205",
 *      "name": "crio-user",
 *      "email": "crio-user@gmail.com",
 *      "password": "$2a$08$bzJ999eS9JLJFLj/oB4he.0UdXxcwf0WS5lbgxFKgFYtA5vV9I3vC",
 *      "createdAt": "2020-09-28T09:55:36.358Z",
 *      "updatedAt": "2020-09-28T09:55:36.358Z",
 *      "__v": 0
 *  },
 *  "tokens": {
 *      "access": {
 *          "token": "eyJhbGciOiJIUz....",
 *          "expires": "2020-10-22T09:29:01.745Z"
 *      }
 *  }
 *}
 *
 */
const register = catchAsync(async (req, res) => {

  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);

  const userSafe = {
    _id: user._id,
    name: user.name,
    email: user.email,
    walletMoney: user.walletMoney,
  };
  
  res.status(httpStatus.CREATED).send({ user: userSafe, tokens });
  

  // res.status(httpStatus.CREATED).send({
  //    user, tokens,
  //   });
});

/**
 * Perform the following steps:
 * -  Call the authservice to verify is password and email is valid
 * -  Generate auth tokens
 * -  Send back
 * --- "200 OK" status code
 * --- response in the given format
 *
 * Example response:
 *
 * {
 *  "user": {
 *      "_id": "5f71b31888ba6b128ba16205",
 *      "name": "crio-user",
 *      "email": "crio-user@gmail.com",
 *      "password": "$2a$08$bzJ999eS9JLJFLj/oB4he.0UdXxcwf0WS5lbgxFKgFYtA5vV9I3vC",
 *      "createdAt": "2020-09-28T09:55:36.358Z",
 *      "updatedAt": "2020-09-28T09:55:36.358Z",
 *      "__v": 0
 *  },
 *  "tokens": {
 *      "access": {
 *          "token": "eyJhbGciOiJIUz....",
 *          "expires": "2020-10-22T09:29:01.745Z"
 *      }
 *  }
 *}
 *
 */
// const login = catchAsync(async (req, res) => {
//   const { email, password } = req.body;

//   const user = await authService.loginUserWithEmailAndPassword(email, password);

//   const tokens = await tokenService.generateAuthTokens(user);

//   res.status(httpStatus.OK).send({
//     user,
//     tokens,
//   });
//   //res.send({ user, tokens });
// });

//----------------------------------chatgpt code----------------
/**
 * Login user
 * - Verify email & password using authService
 * - Generate auth tokens
 * - Send 200 OK response with user + tokens
 */
 const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // Step 1: Validate request body
  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }

  // Step 2: Verify credentials
  const user = await authService.loginUserWithEmailAndPassword(email, password);

  // Step 3: Generate tokens
  const tokens = await tokenService.generateAuthTokens(user);

  // Step 4: Send response
  res.status(httpStatus.OK).send({
    user,
    tokens,
  });
});



module.exports = {
  register,
  login,
};



