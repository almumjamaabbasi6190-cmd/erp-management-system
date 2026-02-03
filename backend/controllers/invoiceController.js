const Invoice = require("../models/Invoice");

exports.createInvoice = async (req, res) => {
  const invoice = await Invoice.create(req.body);
  res.status(201).json(invoice);
};

exports.getInvoices = async (req, res) => {
  const invoices = await Invoice.find().populate("salesOrder");
  res.json(invoices);
};