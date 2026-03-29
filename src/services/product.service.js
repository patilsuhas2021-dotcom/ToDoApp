const {Product} = require("../models/");

/**
 * Get Product by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
 const getProductById = async (id) => {
  try {
    return await Product.findById(id);
  } catch (error) {
    throw new Error("Invalid Product ID");
  }
};


/**
 * Fetch all products
 * @returns {Promise<List<Products>>}
 */
const getProducts = async () => {
  return Product.find({});
};

module.exports = {
  getProductById,
  getProducts,
};
