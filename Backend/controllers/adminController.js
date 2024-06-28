const adminService = require("../services/adminService");

const createAdmin = async (req, res) => {
  try {
    const { admin, token } = req.body;
    const result = await adminService.createAdmin(admin, token);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Received username:", username); 
    console.log("Received password:", password);  
    const result = await adminService.loginAdmin(username, password);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createAdmin,
  loginAdmin,
};
