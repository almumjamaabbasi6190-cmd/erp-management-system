const express = require("express");
const { createInvoice, getInvoices } = require("../controllers/invoiceController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, authorize("admin"), createInvoice);
router.get("/", protect, authorize("admin"), getInvoices);

module.exports = router;