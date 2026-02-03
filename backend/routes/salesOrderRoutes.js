const express = require("express");
const router = express.Router();

const {
  createSalesOrder,
  getSalesOrders,
  deleteSalesOrder
} = require("../controllers/salesOrderController");

const { protect, authorize } = require("../middleware/authMiddleware");

router.post("/", protect, authorize("admin"), createSalesOrder);
router.get("/", protect, authorize("admin"), getSalesOrders);
router.delete("/:id", protect, authorize("admin"), deleteSalesOrder);

module.exports = router;