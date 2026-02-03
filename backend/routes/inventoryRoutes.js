const express = require("express");
const router = express.Router();

const {
  getInventory,
  updateStock,
  getInventoryLogs,
} = require("../controllers/inventoryController");

const { protect, authorize } = require("../middleware/authMiddleware");

// ===============================
// GET INVENTORY (PRODUCTS)
// ===============================
router.get("/", protect, authorize("admin"), getInventory);

// ===============================
// STOCK IN / STOCK OUT
// ===============================
router.post("/update", protect, authorize("admin"), updateStock);

// ===============================
// GET INVENTORY LOGS
// ===============================
router.get("/logs", protect, authorize("admin"), getInventoryLogs);

module.exports = router;