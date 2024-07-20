const pool = require("../config/db");

const createProduct = async (product) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO Products (title, description, featured, imageUrl, price, category_id) VALUES (?, ?, ?, ?, ?, ?)",
      [
        product.productName,
        product.description,
        product.featured,
        product.imageUrl,
        product.price,
        product.category_id,
      ],
      (err, results) => {
        if (err) {
          console.error("Database error:", err); // Log database error
          reject(new Error("Database error: " + err.message));
        } else {
          resolve({ id: results.insertId, ...product });
        }
      }
    );
  });
};
const getProducts = async (limit, offset, categoryId) => {
  let query = "SELECT * FROM Products LIMIT ? OFFSET ?";
  let params = [limit, offset];

  if (categoryId) {
    query = "SELECT * FROM Products WHERE category_id = ? LIMIT ? OFFSET ?";
    params = [categoryId, limit, offset];
  }

  return new Promise((resolve, reject) => {
    pool.query(query, params, (err, results) => {
      if (err) {
        reject(new Error("Database error: " + err.message));
      } else {
        resolve(results);
      }
    });
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
  const { title, description, featured, imageUrl, price, category_id } =
    updatedProduct;
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE Products SET title = ?, description = ?, featured = ?, imageUrl = ?, price = ?, category_id = ? WHERE id = ?",
      [title, description, featured, imageUrl, price, category_id, productId],
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
