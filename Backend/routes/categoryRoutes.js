const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const adminAuth = require("../middleware/adminAuth");

router.post("/", adminAuth, categoryController.createCategory);
router.get("/", categoryController.getCategories);
router.put("/:categoryId", adminAuth, categoryController.updateCategory);
router.delete("/:categoryId", adminAuth, categoryController.deleteCategory);

module.exports = router;
