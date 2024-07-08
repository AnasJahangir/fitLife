const categoryModel = require("../models/categoryModel");

const createCategory = async (category) => {
  return await categoryModel.createCategory(category);
};

const getCategories = async () => {
  return await categoryModel.getCategories();
};

const updateCategory = async (categoryId, updatedCategory) => {
  return await categoryModel.updateCategory(categoryId, updatedCategory);
};

const deleteCategory = async (categoryId) => {
  return await categoryModel.deleteCategory(categoryId);
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
