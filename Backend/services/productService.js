const cloudinary = require("../config/cloudinary");
const productModel = require("../models/productModel");

const createProduct = async (product, imagePath) => {
  const result = await cloudinary.uploader.upload(imagePath, {
    folder: "products",
  });

  const productWithImage = {
    ...product,
    imageUrl: result.secure_url,
  };

  return await productModel.createProduct(productWithImage);
};

const getProducts = async (limit, offset) => {
  return await productModel.getProducts(limit, offset);
};
const deleteProduct = async (productId) => {
  return await productModel.deleteProduct(productId);
};

const updateProduct = async (productId, updatedProduct) => {
  return await productModel.updateProduct(productId, updatedProduct);
};

module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
};
