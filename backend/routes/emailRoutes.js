const express = require("express");
const { sendEmail } = require("../controllers/emailController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, authorize("admin"), sendEmail);

module.exports = router;