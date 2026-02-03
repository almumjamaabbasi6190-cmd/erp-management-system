const express = require("express");
const { createGRN, getGRNs } = require("../controllers/grnController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, authorize("admin"), createGRN);
router.get("/", protect, authorize("admin"), getGRNs);

module.exports = router;