const GRN = require("../models/GRN");
const Product = require("../models/Product");

const createGRN = async (req, res) => {
  try {
    const { purchaseOrder, items } = req.body;

    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      product.stock += item.quantity;
      await product.save();
    }

    const grn = await GRN.create({
      purchaseOrder,
      items,
      receivedBy: req.user._id,
    });

    res.status(201).json(grn);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGRNs = async (req, res) => {
  try {
    const grns = await GRN.find()
      .populate("purchaseOrder")
      .populate("items.product")
      .populate("receivedBy");

    res.json(grns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createGRN, getGRNs };