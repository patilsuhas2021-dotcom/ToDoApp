const mongoose = require("mongoose");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement getUser() function
// TODO: CRIO_TASK_MODULE_CART - Update function to process url with query params
/**
 * Get user details
 *  - Use service layer to get User data
 * 
 *  - If query param, "q" equals "address", return only the address field of the user
 *  - Else,
 *  - Return the whole user object fetched from Mongo

 *  - If data exists for the provided "userId", return 200 status code and the object
 *  - If data doesn't exist, throw an error using `ApiError` class
 *    - Status code should be "404 NOT FOUND"
 *    - Error message, "User not found"
 *  - If the user whose token is provided and user whose data to be fetched don't match, throw `ApiError`
 *    - Status code should be "403 FORBIDDEN"
 *    - Error message, "User not found"
 *
 * 
 * Request url - <workspace-ip>:8082/v1/users/6010008e6c3477697e8eaba3
 * Response - 
 * {
 *     "walletMoney": 500,
 *     "address": "ADDRESS_NOT_SET",
 *     "_id": "6010008e6c3477697e8eaba3",
 *     "name": "crio-users",
 *     "email": "crio-user@gmail.com",
 *     "password": "criouser123",
 *     "createdAt": "2021-01-26T11:44:14.544Z",
 *     "updatedAt": "2021-01-26T11:44:14.544Z",
 *     "__v": 0
 * }
 * 
 *
 * Example response status codes:
 * HTTP 200 - If request successfully completes
 * Request url - <workspace-ip>:8082/v1/users/6010008e6c3477697e8eaba3?q=address
 * Response - 
 * {
 *   "address": "ADDRESS_NOT_SET"
 * }
 * 
 *
 * Example response status codes:
 * HTTP 200 - If request successfully completes
 * HTTP 403 - If request data doesn't match that of authenticated user
 * HTTP 404 - If user entity not found in DB
 * 
 * @returns {User | {address: String}}
 *
 */
//-------------------------changed code herer
/*
 const getUser = catchAsync(async (req, res) => {
  let data;

  if (req.query.q === "address") {
    data = await userService.getUserAddressById(req.params.userId);
  } else {
    data = await userService.getUserById(req.params.userId);
  }

  // If user not found → 404
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  // Send response
  if (req.query.q === "address") {
    res.status(httpStatus.OK).send({ address: data.address });
  } else {
    res.status(httpStatus.OK).json(data);
  }
});
*/
//-------------------------till here--------------

// const getUser = catchAsync(async (req, res) => {
//   const { userId } = req.params;
//   const { q } = req.query;

//   if (q === "address") {
//     const address = await userService.getUserAddressById(userId);
//     console.log("trial11111",address);
//     // return res.send(address);
//     return res.status(httpStatus.OK).json({address: user.address});
//   }

//   // Fetch user
//   const user = await userService.getUserById(userId);

//   // 404 if not found
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, "User not found");
//   }

//   // 🔥 403 check
//   if (req.user.id !== user.id) {
//     throw new ApiError(httpStatus.FORBIDDEN, "User not found");
//   }

//   // If query param is address
//   if (req.query.q === "address") {
//     return res.status(httpStatus.OK).send({
//       address: user.address,
//     });
//   }

//   // Else return full user
//   res.status(httpStatus.OK).json(user);
// });

const getUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { q } = req.query;

  let user;

  
  if (req.user.id !== userId && req.user.role !== "admin") {
    throw new ApiError(httpStatus.FORBIDDEN, "User not found");
  }

  
  if (q === "address") {
    user = await userService.getUserAddressById(userId);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    return res.status(httpStatus.OK).json({
      address: user.address,
    });
  }

  
  user = await userService.getUserById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  res.status(httpStatus.OK).json(user);
});


const setAddress = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  console.log("Before Arun");
  if (user.email != req.user.email) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "User not authorized to access this resource"
    );
  }
  console.log("After Arun");
  user.address = req.body.address;
  await user.save();

  res.status(httpStatus.OK).send({
    address: user.address,
  });
});
  

const getUserAddress = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.userId);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    res.status(httpStatus.OK).json({
      address: user.address,
    });
  } catch (error) {
    next(error);
  }
};

// module.exports = {
//   getUser,setAddress,getUserAddress
//   const address = await userService.setAddress(user, req.body.address);

//   res.send({
//     address: address,
//   });
// });

module.exports = {
  getUser,
  setAddress,
  getUserAddress,
};
