const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async (userData) => {
  try {
    const existingUser = await userModel.findUserByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email already in use");
    }
    await userModel.createUser(userData);
    return { message: "User created successfully" };
  } catch (err) {
    throw new Error(err.message);
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const validPassword = await bcrypt.compare(password, user.Password);
    if (!validPassword) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ id: user.Id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return { token, user: { email: user.Email, name: user.Name } };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  createUser,
  loginUser,
};
