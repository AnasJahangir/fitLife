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

const getProducts = async (limit, offset, categoryId, search) => {
  return await productModel.getProducts(limit, offset, categoryId, search);
};
const deleteProduct = async (productId) => {
  return await productModel.deleteProduct(productId);
};

const updateProduct = async (productId, updatedProduct) => {
  try {
    // Fetch the current product details from the database
    const currentProduct = await productModel.getProductById(productId);

    // If no new image is provided, retain the existing image URL
    if (!updatedProduct.imageUrl) {
      updatedProduct.imageUrl = currentProduct.imageUrl;
    }

    // Pass the updated product to the model for database update
    const result = await productModel.updateProduct(productId, updatedProduct);
    return result;
  } catch (error) {
    console.error("Error in updateProduct service:", error); // Log error details
    throw new Error("Update error: " + error.message);
  }
};


module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
};
