const productService = require("../services/productService");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const createProduct = async (req, res) => {
  try {
    const { title, description, featured, imageUrl, price } = req.body;
    const imagePath = req.file.path;
    const createdProduct = await productService.createProduct(
      { title, description, featured, imageUrl, price },
      imagePath
    );
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    const products = await productService.getProducts(
      parseInt(limit),
      parseInt(offset)
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
    const updatedProduct = req.body;
    await productService.updateProduct(productId, updatedProduct);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
};
