const express = require("express");
const { registerUser, loginUser,resetAdminPassword } = require("../controllers/authController");

const router = express.Router();

// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);

//RESET ADMIN PASSWORD
router.get("/reset-admin", resetAdminPassword)

module.exports = router;