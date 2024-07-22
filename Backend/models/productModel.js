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
const getProducts = async (limit, offset, categoryId, search) => {
  let query = "SELECT * FROM Products WHERE 1=1";
  let params = [];

  if (categoryId) {
    query += " AND category_id = ?";
    params.push(categoryId);
  }

  if (search) {
    query += " AND (title LIKE ? OR description LIKE ?)";
    const searchParam = `%${search}%`;
    params.push(searchParam, searchParam);
  }

  query += " LIMIT ? OFFSET ?";
  params.push(limit, offset);

  console.log("Constructed query:", query);
  console.log("Query parameters:", params);

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
  const { productName, description, featured, imageUrl, price, category_id } =
    updatedProduct;

  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE Products SET 
        title = COALESCE(?, title), 
        description = COALESCE(?, description), 
        featured = COALESCE(?, featured), 
        imageUrl = COALESCE(?, imageUrl), 
        price = COALESCE(?, price), 
        category_id = COALESCE(?, category_id) 
      WHERE id = ?`,
      [
        productName,
        description,
        featured,
        imageUrl,
        price,
        category_id,
        productId,
      ],
      (err, results) => {
        if (err) {
          reject(new Error("Database error: " + err.message));
        } else {
          resolve({
            id: productId,
            productName,
            description,
            featured,
            imageUrl,
            price,
            category_id,
          });
        }
      }
    );
  });
};

const getProductById = async (productId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM Products WHERE id = ?",
      [productId],
      (err, results) => {
        if (err) {
          reject(new Error("Database error: " + err.message));
        } else {
          resolve(results[0]);
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
  getProductById,
};
