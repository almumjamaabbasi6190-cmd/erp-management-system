const express = require("express");

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  updatePaymentStatus,
  generateInvoice
} = require("../controllers/orderController");

const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// ===============================
// CREATE ORDER (ADMIN)
// ===============================
router.post("/", protect, authorize("admin"), createOrder);

// ===============================
// GET ALL ORDERS (ADMIN)
// ===============================
router.get("/", protect, authorize("admin"), getOrders);

// ===============================
// GET SINGLE ORDER BY ID (ADMIN)
// ===============================
router.get("/:id", protect, authorize("admin"), getOrderById);

// ===============================
// UPDATE ORDER STATUS (ADMIN)
// ===============================
router.put("/:id/status", protect, authorize("admin"), updateOrderStatus);

// ===============================
// CANCEL ORDER (ADMIN)
// ===============================
router.put("/:id/cancel", protect, authorize("admin"), cancelOrder);

// ===============================
// UPDATE PAYMENT STATUS (ADMIN)
// ===============================
router.put("/:id/payment", protect, authorize("admin"), updatePaymentStatus);

// ===============================
// GENERATE INVOICE PDF (ADMIN)
// ===============================
router.get("/:id/invoice", protect, authorize("admin"), generateInvoice);

module.exports = router;