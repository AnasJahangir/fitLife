const pool = require("../config/db");
const bcrypt = require("bcryptjs");

const findAdminByUsername = async (username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM Admin WHERE Username = ?",
      [username],
      (err, results) => {
        if (err) {
          reject(new Error("Error finding admin by username: " + err.message));
        } else {
          resolve(results[0]);
        }
      }
    );
  });
};

const findAdminById = async (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM Admin WHERE AdminID = ?",
      [id],
      (err, results) => {
        if (err) {
          reject(new Error("Error finding admin by id: " + err.message));
        } else {
          resolve(results[0]);
        }
      }
    );
  });
};

const createAdmin = async (admin) => {
  const hashedPassword = await bcrypt.hash(admin.password, 8);
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO Admin (Username, Password) VALUES (?, ?)",
      [admin.username, hashedPassword],
      (err, results) => {
        if (err) {
          reject(new Error("Error creating admin: " + err.message));
        } else {
          resolve({ message: "Admin created successfully" });
        }
      }
    );
  });
};

module.exports = {
  findAdminByUsername,
  findAdminById,
  createAdmin,
};
