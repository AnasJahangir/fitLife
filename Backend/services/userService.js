const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async (userData) => {
  try {
    const existingUser = await userModel.findUserByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email already in use");
    }

    // Hash the password before creating the user
    const hashedPassword = await bcrypt.hash(userData.password, 8);
    const newUser = { ...userData, password: hashedPassword };

    // Create the user
    await userModel.createUser(newUser);

    // Retrieve the user object after creation
    const createdUser = await userModel.findUserByEmail(userData.email);
    const token = jwt.sign({ id: user.Id }, process.env.JWT_SECRET);

    // Remove the password field from the user object
    if (createdUser) {
      delete createdUser.Password;
      createdUser.token = token;
    }

    return createdUser;
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
    const token = jwt.sign({ id: user.Id }, process.env.JWT_SECRET);

    if (user) {
      delete user.Password;
      user.token = token;
    }
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getUser = async (email) => {
  try {
    const existingUser = await userModel.findUserByEmail(userData.email);
    if (!existingUser) {
      throw new Error("User not exist");
    }
    delete existingUser.Password;
    return existingUser;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  createUser,
  loginUser,
  getUser,
};
