require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const customerRoutes = require("./routes/customerRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const salesOrderRoutes = require("./routes/salesOrderRoutes");
const purchaseOrderRoutes = require("./routes/purchaseOrderRoutes");
const grnRoutes = require("./routes/grnRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const reportRoutes = require("./routes/reportRoutes");

const { protect, authorize } = require("./middleware/authMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= CONNECT DB =================
connectDB();

// ================= ROUTES =====================
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/sales-orders", salesOrderRoutes);
app.use("/api/purchase-orders", purchaseOrderRoutes);
app.use("/api/grn", grnRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/reports", reportRoutes);

// ================= TEST ROUTES =================
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route working",
    user: req.user,
  });
});

app.get("/api/admin", protect, authorize("admin"), (req, res) => {
  res.json({
    message: "Welcome Admin",
    user: req.user,
  });
});

// ================= BASE ROUTE ==================
app.get("/", (req, res) => {
  res.send("ERP backend is running");
});

// ================= ERROR HANDLER =================
app.use(errorHandler);

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//==================PAYMENTS=======================
const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payments", paymentRoutes);
//==================Email===========================
const emailRoutes = require("./routes/emailRoutes");

app.use("/api/email", emailRoutes);