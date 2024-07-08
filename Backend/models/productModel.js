const pool = require("../config/db");

const createProduct = async (product) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO Products (title, description, featured, imageUrl, price) VALUES (?, ?, ?, ?, ?)",
      [
        product.title,
        product.description,
        product.featured,
        product.imageUrl,
        product.price,
      ],
      (err, results) => {
        if (err) {
          reject(new Error("Database error: " + err.message));
        } else {
          resolve({ id: results.insertId, ...product });
        }
      }
    );
  });
};

const getProducts = async (limit, offset) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM Products LIMIT ? OFFSET ?",
      [limit, offset],
      (err, results) => {
        if (err) {
          reject(new Error("Database error: " + err.message));
        } else {
          resolve(results);
        }
      }
    );
  });
};
const deleteProduct = async (productId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM Products WHERE id = ?",
      [productId],
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

const updateProduct = async (productId, updatedProduct) => {
  const { title, description, featured, imageUrl, price } = updatedProduct;
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE Products SET title = ?, description = ?, featured = ?, imageUrl = ?, price = ? WHERE id = ?",
      [title, description, featured, imageUrl, price, productId],
      (err, results) => {
        if (err) {
          reject(new Error("Database error: " + err.message));
        } else {
          resolve({ id: productId, ...updatedProduct });
        }
      }
    );
  });
};

module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
};
