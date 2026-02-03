const PurchaseOrder = require("../models/PurchaseOrder");

exports.createPurchaseOrder = async (req, res) => {
  const po = await PurchaseOrder.create({
    ...req.body,
    createdBy: req.user._id
  });
  res.status(201).json(po);
};

exports.getPurchaseOrders = async (req, res) => {
  const pos = await PurchaseOrder.find()
    .populate("supplier")
    .populate("items.product");
  res.json(pos);
};