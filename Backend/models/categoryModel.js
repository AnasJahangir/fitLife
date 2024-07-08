const pool = require("../config/db");

const createCategory = async (category) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO Categories (name) VALUES (?)",
      [category.name],
      (err, results) => {
        if (err) {
          reject(new Error("Database error: " + err.message));
        } else {
          resolve({ id: results.insertId, ...category });
        }
      }
    );
  });
};

const getCategories = async () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM Categories", (err, results) => {
      if (err) {
        reject(new Error("Database error: " + err.message));
      } else {
        resolve(results);
      }
    });
  });
};

const updateCategory = async (categoryId, updatedCategory) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE Categories SET name = ? WHERE id = ?",
      [updatedCategory.name, categoryId],
      (err, results) => {
        if (err) {
          reject(new Error("Database error: " + err.message));
        } else {
          resolve({ id: categoryId, ...updatedCategory });
        }
      }
    );
  });
};

const deleteCategory = async (categoryId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM Categories WHERE id = ?",
      [categoryId],
      (err, results) => {
        if (err) {
          reject(new Error("Database error: " + err.message));
        } else {
          resolve(results.affectedRows > 0);
        }
      }
    );
  });
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
