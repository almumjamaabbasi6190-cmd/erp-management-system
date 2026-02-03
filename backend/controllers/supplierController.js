const Supplier = require("../models/Supplier");

// CREATE SUPPLIER
exports.createSupplier = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const supplier = await Supplier.create({
      name,
      email,
      phone,
      address,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      supplier
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create supplier",
      error: error.message
    });
  }
};

// GET ALL SUPPLIERS
exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      suppliers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch suppliers",
      error: error.message
    });
  }
};
// delete suppliers
exports.deleteSupplier = async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};