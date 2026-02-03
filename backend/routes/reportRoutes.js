const express = require("express");
const { salesReport, stockReport } = require("../controllers/reportController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/sales", protect, authorize("admin"), salesReport);
router.get("/stock", protect, authorize("admin"), stockReport);

module.exports = router;