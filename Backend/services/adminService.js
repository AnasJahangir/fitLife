const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminModel = require("../models/adminModel");

const createDefaultAdmin = async () => {
  const defaultAdmin = {
    username: "admin",
    password: "123456",
  };

  const adminExists = await adminModel.findAdminByUsername(
    defaultAdmin.username
  );
  if (!adminExists) {
    await adminModel.createAdmin(defaultAdmin);
    console.log("Default admin created");
  } else {
    console.log("Default admin already exists");
  }
};

const createAdmin = async (admin, token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const existingAdmin = await adminModel.findAdminById(decoded.id);
  if (!existingAdmin) {
    throw new Error("Invalid admin token");
  }
  return await adminModel.createAdmin(admin);
};

const loginAdmin = async (username, password) => {
  const adminData = await adminModel.findAdminByUsername(username);
  if (!adminData) {
    throw new Error("Admin not found");
  }
  const isMatch = await bcrypt.compare(password, adminData.Password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign({ id: adminData.AdminID }, process.env.JWT_SECRET);

  const admin = {
    adminID: adminData.AdminID,
    username: adminData.Username,
  };
  return { token, admin };
};

module.exports = {
  createDefaultAdmin,
  createAdmin,
  loginAdmin,
};
