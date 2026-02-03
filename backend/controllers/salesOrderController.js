const SalesOrder = require("../models/SalesOrder");
const Product = require("../models/Product");

// CREATE SALES ORDER
exports.createSalesOrder = async (req, res) => {
  try {
    const { customer, items } = req.body;

    let total = 0;

    for (let item of items) {
      const product = await Product.findById(item.product);

      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
      }

      product.stock -= item.quantity;
      await product.save();

      total += item.quantity * product.price;
    }

    const order = await SalesOrder.create({
      customer,
      items,
      totalAmount: total,
      createdBy: req.user._id,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SALES ORDERS
exports.getSalesOrders = async (req, res) => {
  try {
    const orders = await SalesOrder.find()
      .populate("customer")
      .populate("items.product");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE SALES ORDER  ✅ THIS WAS MISSING
exports.deleteSalesOrder = async (req, res) => {
  try {
    const order = await SalesOrder.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Sales order not found" });
    }

    await order.deleteOne();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};