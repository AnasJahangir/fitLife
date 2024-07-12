const productService = require("../services/productService");
const createProduct = async (req, res) => {
  try {
    const { productName, price, category, featured } = req.body;

    // Ensure the file is present
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required." });
    }

    // Access the uploaded file path
    const imagePath = req.file.path;

    // Create the product with the provided details and image path
    const createdProduct = await productService.createProduct(
      { productName, price, category, featured },
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
