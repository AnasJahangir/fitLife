const cloudinary = require("../config/cloudinary");
const productModel = require("../models/productModel");

const createProduct = async (product, imagePath) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "products",
    });

    const productWithImage = {
      ...product,
      imageUrl: result.secure_url,
    };

    return await productModel.createProduct(productWithImage);
  } catch (error) {
    console.error("Error in createProduct service:", error); // Log error details
    throw new Error("Image upload error: " + error.message);
  }
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
