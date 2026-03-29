const httpStatus = require("http-status");
const userService = require("./user.service");
const ApiError = require("../utils/ApiError");

/**
 * Login with username and password
 * - Utilize userService method to fetch user object corresponding to the email provided
 * - Use the User schema's "isPasswordMatch" method to check if input password matches the one user registered with (i.e, hash stored in MongoDB)
 * - If user doesn't exist or incorrect password,
 * throw an ApiError with "401 Unauthorized" status code and message, "Incorrect email or password"
 * - Else, return the user object
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {

  //fetch user from the database
  const user = await userService.getUserByEmail(email);//making a database call here
  // console.log("user is ",user);
  // console.log("password", password);
//   console.log(typeof user.isPasswordMatch);
//   if(!user || !(await user.isPasswordMatch(password))) {
//       throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
//   }
//   return user;
// };

//if user not found -> Unauthorized
  if(!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password" );
  }
  //check password match
  const isPasswordValid = await user.isPasswordMatch(password);

  if(!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password" );
  }
  // Return an authenticated user
  return user;
};

module.exports = {
  loginUserWithEmailAndPassword,
};
