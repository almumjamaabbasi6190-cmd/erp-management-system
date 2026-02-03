const Inventory = require("../models/Inventory");
const Product = require("../models/Product");

// ===============================
// GET INVENTORY (ALL PRODUCTS)
// ===============================
const getInventory = async (req, res) => {
  try {
    const products = await Product.find();

    res.json({
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ===============================
// STOCK IN / STOCK OUT
// ===============================

    // update stock
    const updateStock = async (req, res) => {
  try {
    const { productId, type, quantity, note } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.stock == null) product.stock = 0;

    if (type === "OUT" && product.stock < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    if (type === "IN") {
      product.stock += quantity;
    } else {
      product.stock -= quantity;
    }

    await product.save();

    const inventory = await Inventory.create({
      product: productId,
      type,
      quantity,
      note,
      createdBy: req.user._id,
    });

    res.json({ success: true, product, inventory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// GET INVENTORY LOGS
// ===============================
const getInventoryLogs = async (req, res) => {
  try {
    const logs = await Inventory.find()
      .populate("product", "name sku category")
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      logs
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInventory,
  updateStock,
  getInventoryLogs
};