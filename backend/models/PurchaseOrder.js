const mongoose = require("mongoose");

const purchaseOrderSchema = new mongoose.Schema({
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      cost: Number
    }
  ],
  status: { type: String, enum: ["CREATED", "RECEIVED"], default: "CREATED" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("PurchaseOrder", purchaseOrderSchema);