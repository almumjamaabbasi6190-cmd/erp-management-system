const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const { protect, authorize } = require("../middleware/authMiddleware");
const { productValidation } = require("../middleware/validators/productValidator");
const validate = require("../middleware/validators/validate");

const router = express.Router();

// CREATE PRODUCT
router.post(
  "/",
  protect,
  authorize("admin"),
  productValidation,
  validate,
  createProduct
);

// GET ALL PRODUCTS
router.get("/", protect, authorize("admin"), getProducts);

// GET SINGLE PRODUCT
router.get("/:id", protect, authorize("admin"), getProductById);

// UPDATE PRODUCT
router.put("/:id", protect, authorize("admin"), updateProduct);

// DELETE PRODUCT
router.delete("/:id", protect, authorize("admin"), deleteProduct);

module.exports = router;