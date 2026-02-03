const SalesOrder = require("../models/SalesOrder");
const Product = require("../models/Product");

exports.salesReport = async (req, res) => {
  const orders = await SalesOrder.find();
  const totalSales = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  res.json({ totalSales, totalOrders: orders.length });
};

exports.stockReport = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};