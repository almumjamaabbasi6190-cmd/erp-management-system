const express = require("express");
const { createPurchaseOrder, getPurchaseOrders } = require("../controllers/purchaseOrderController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, authorize("admin"), createPurchaseOrder);
router.get("/", protect, authorize("admin"), getPurchaseOrders);

module.exports = router;