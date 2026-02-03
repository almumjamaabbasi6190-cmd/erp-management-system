const express = require("express");
const { createPayment } = require("../controllers/paymentController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, authorize("admin"), createPayment);

module.exports = router;