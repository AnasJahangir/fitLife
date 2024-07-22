const productService = require("../services/productService");

const cloudinary = require("../config/cloudinary");

const createProduct = async (req, res) => {
  try {
    const { productName, description, price, category_id, featured } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required." });
    }

    console.log("File received:", req.file); // Log file details

    const imagePath = req.file.path;

    const createdProduct = await productService.createProduct(
      { productName, description, price, category_id, featured },
      imagePath
    );

    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error in createProduct:", error); // Log error details
    res.status(500).json({ error: error.message });
  }
};
const getProducts = async (req, res) => {
  try {
    const { limit = 50, offset = 0, categoryId, search } = req.query;
    console.log("Received query params:", {
      limit,
      offset,
      categoryId,
      search,
    });
    const products = await productService.getProducts(
      parseInt(limit),
      parseInt(offset),
      categoryId,
      search
    );
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    await productService.deleteProduct(productId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { productName, description, price, category_id, featured } = req.body;

    let imageUrl = null;

    if (req.file) {
      console.log("File received:", req.file); // Log file details
      const imagePath = req.file.path;

      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: "products"
      });

      imageUrl = result.secure_url;
    }

    const updatedProduct = {
      productName,
      description,
      price,
      category_id,
      featured,
      imageUrl // This will be null if no new image is uploaded
    };

    const updatedProductData = await productService.updateProduct(productId, updatedProduct);

    res.status(200).json(updatedProductData);
  } catch (error) {
    console.error("Error in updateProduct:", error); // Log error details
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
};
