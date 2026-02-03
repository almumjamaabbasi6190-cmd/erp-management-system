const express = require("express");
const { createSupplier, getSuppliers, deleteSupplier } = require("../controllers/supplierController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE SUPPLIER
router.post("/", protect, authorize("admin"), createSupplier);

// GET SUPPLIERS
router.get("/", protect, authorize("admin"), getSuppliers);

// DELETE SUPPLIER
router.delete("/:id", protect, authorize("admin"), deleteSupplier);

module.exports = router;