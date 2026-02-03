const express = require("express");
const {
  createCustomer,
  getCustomers,
  deleteCustomer
} = require("../controllers/customerController");

const { protect, authorize } = require("../middleware/authMiddleware");
const { customerValidation } = require("../middleware/validators/customerValidator");
const validate = require("../middleware/validators/validate");

const router = express.Router();

// CREATE CUSTOMER
router.post(
  "/",
  protect,
  authorize("admin"),
  customerValidation,
  validate,
  createCustomer
);

// GET CUSTOMERS
router.get("/", protect, authorize("admin"), getCustomers);

// DELETE CUSTOMER
router.delete("/:id", protect, authorize("admin"), deleteCustomer);

module.exports = router;