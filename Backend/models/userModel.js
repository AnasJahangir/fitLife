const pool = require("../config/db");
const bcrypt = require("bcryptjs");

const findUserByEmail = async (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM Users WHERE Email = ?",
      [email],
      (err, results) => {
        if (err) {
          reject(new Error("Error finding user by email: " + err.message));
        } else {
          resolve(results[0]); // Return the first matching user if found
        }
      }
    );
  });
};

const createUser = async (user) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 8);
    return new Promise((resolve, reject) => {
      pool.query(
        "INSERT INTO Users (Email, Password, Name, PhoneNumber) VALUES (?, ?, ?, ?)",
        [user.email, hashedPassword, user.name, user.phoneNumber],
        (err, results) => {
          if (err) {
            reject(new Error("Error creating user: " + err.message));
          } else {
            resolve({ message: "User created successfully" });
          }
        }
      );
    });
  } catch (err) {
    throw new Error("Error creating user: " + err.message);
  }
};

module.exports = {
  findUserByEmail,
  createUser,
};
