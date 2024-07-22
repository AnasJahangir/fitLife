const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const adminAuth = require("../middleware/adminAuth");
const router = express.Router();

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.delete("/:userId",adminAuth, userController.deleteUser);
router.get("/getUser", authMiddleware, userController.getUser);
router.get("/getAllUsers", adminAuth, userController.getAllUsers);


module.exports = router;
