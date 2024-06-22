const { sql, poolPromise } = require("../config/db");
const bcrypt = require("bcryptjs");

const findUserByEmail = async (email) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Email", sql.NVarChar, email)
      .query("SELECT * FROM Users WHERE Email = @Email");

    return result.recordset[0]; // Return the first matching user if found
  } catch (err) {
    throw new Error("Error finding user by email: " + err.message);
  }
};

const createUser = async (user) => {
  try {
    const pool = await poolPromise;
    const hashedPassword = await bcrypt.hash(user.password, 8);
    await pool
      .request()
      .input("Email", sql.NVarChar, user.email)
      .input("Password", sql.NVarChar, hashedPassword)
      .input("Name", sql.NVarChar, user.name)
      .input("PhoneNumber", sql.NVarChar, user.phoneNumber)
      .query(
        "INSERT INTO Users (Email, Password, Name, PhoneNumber) VALUES (@Email, @Password, @Name, @PhoneNumber)"
      );

    return { message: "User created successfully" };
  } catch (err) {
    throw new Error("Error creating user: " + err.message);
  }
};

module.exports = {
  findUserByEmail,
  createUser,
};
