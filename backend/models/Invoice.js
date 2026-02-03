const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  salesOrder: { type: mongoose.Schema.Types.ObjectId, ref: "SalesOrder" },
  amount: Number,
  status: { type: String, enum: ["UNPAID", "PAID"], default: "UNPAID" }
}, { timestamps: true });

module.exports = mongoose.model("Invoice", invoiceSchema);