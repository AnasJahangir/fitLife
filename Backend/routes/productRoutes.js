const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const adminAuth = require("../middleware/adminAuth");

router.post("/", adminAuth, productController.createProduct);
router.get("/", productController.getProducts);
router.delete("/:productId", adminAuth, productController.deleteProduct);
router.put("/:productId", adminAuth, productController.updateProduct);

module.exports = router;
