const Joi = require("joi");
const { password } = require("./custom.validation");

/**
 * Validation schema for user registration
 * Required fields:
 * - email: valid email format
 * - password: must satisfy custom password validator
 * - name: required string
 */
const register = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
  }),
};

/**
 * Validation schema for login
 * Required fields:
 * - email: valid email format
 * - password: must satisfy custom password validator
 */
const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().custom(password),
  }),
};

/* Check request *body* for fields (all are *required*)
 * - "email" : string and satisyfing email structure
 * - "password": string and satisifes the custom password structure defined in "src/validations/custom.validation.js"
 * - "name": string
 */

/**
 * Check request *body* for fields (all are *required*)
 * - "email" : string and satisyfing email structure
 * - "password": string and satisifes the custom password structure defined in "src/validations/custom.validation.js"
 */

module.exports = {
  register,
  login,
};
