const PDFDocument = require("pdfkit");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Inventory = require("../models/Inventory");

// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const { customerName, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    let totalAmount = 0;

    // Check stock & calculate total
    for (let item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.quantity < item.quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for ${product.name}` });
      }

      totalAmount += product.price * item.quantity;
    }

    // Reduce stock
    for (let item of items) {
      const product = await Product.findById(item.product);
      product.quantity -= item.quantity;
      await product.save();
    }

    // Create order
    const order = await Order.create({
      customerName,
      items,
      totalAmount,
      createdBy: req.user._id,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all orders
const getOrders = async (req, res) => {
try {
const { status, startDate, endDate, page = 1, limit = 10 } = req.query;


let filter = {};


if (status) {
filter.status = status;
}


if (startDate && endDate) {
filter.createdAt = {
$gte: new Date(startDate),
$lte: new Date(endDate)
};
}


const skip = (page - 1) * limit;


const orders = await Order.find(filter)
.populate("items.product", "name price")
.populate("createdBy", "name email")
.sort({ createdAt: -1 })
.skip(skip)
.limit(Number(limit));


const totalOrders = await Order.countDocuments(filter);


res.status(200).json({
success: true,
totalOrders,
currentPage: Number(page),
totalPages: Math.ceil(totalOrders / limit),
orders
});


} catch (error) {
res.status(500).json({
success: false,
message: "Failed to fetch orders",
error: error.message
});
}
};

// GET SINGLE ORDER BY ID
// ===============================
const getOrderById = async (req, res) => {
try {
const order = await Order.findById(req.params.id)
.populate("items.product", "name price")
.populate("createdBy", "name email");


if (!order) {
return res.status(404).json({
success: false,
message: "Order not found"
});
}


res.status(200).json({
success: true,
order
});
} catch (error) {
res.status(500).json({
success: false,
message: "Failed to fetch order",
error: error.message
});
}
};

// ===============================
// UPDATE ORDER STATUS
// ===============================
// UPDATE ORDER STATUS (WITH AUTO STOCK)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id).populate("items.product");
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // ✅ If marking as SHIPPED → reduce stock
    if (status === "SHIPPED" && order.status !== "SHIPPED") {
      for (let item of order.items) {
        const product = await Product.findById(item.product._id);

        if (!product) {
          return res.status(404).json({
            success: false,
            message: "Product not found",
          });
        }

        if (product.quantity < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `Not enough stock for ${product.name}`,
          });
        }

        product.quantity -= item.quantity;
        await product.save();

        // Inventory log
        await Inventory.create({
          product: product._id,
          type: "OUT",
          quantity: item.quantity,
          note: "Order shipped",
          createdBy: req.user._id,
        });
      }
    }

    // Update order status
    order.status = status;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

// CANCEL ORDER & RESTORE STOCK
// ===============================
const cancelOrder = async (req, res) => {
try {
const order = await Order.findById(req.params.id).populate("items.product");


if (!order) {
return res.status(404).json({
success: false,
message: "Order not found"
});
}


if (order.status === "CANCELLED") {
return res.status(400).json({
success: false,
message: "Order already cancelled"
});
}


// RESTORE STOCK FOR EACH ITEM
for (let item of order.items) {
const product = item.product;
product.stock += item.quantity;
await product.save();
}


// UPDATE ORDER STATUS
order.status = "CANCELLED";
await order.save();


res.status(200).json({
success: true,
message: "Order cancelled and stock restored",
order
});


} catch (error) {
res.status(500).json({
success: false,
message: "Failed to cancel order",
error: error.message
});
}
};

// UPDATE PAYMENT STATUS
// ===============================
const updatePaymentStatus = async (req, res) => {
try {
const { paymentStatus } = req.body;


const order = await Order.findById(req.params.id);


if (!order) {
return res.status(404).json({
success: false,
message: "Order not found"
});
}


order.paymentStatus = paymentStatus;
await order.save();


res.status(200).json({
success: true,
message: "Payment status updated",
order
});


} catch (error) {
res.status(500).json({
success: false,
message: "Failed to update payment status",
error: error.message
});
}
};

// GENERATE INVOICE PDF
// ===============================
const generateInvoice = async (req, res) => {
try {
const order = await Order.findById(req.params.id)
.populate("items.product", "name price")
.populate("createdBy", "name email");


if (!order) {
return res.status(404).json({
success: false,
message: "Order not found"
});
}


const doc = new PDFDocument();


res.setHeader("Content-Type", "application/pdf");
res.setHeader(
"Content-Disposition",
`attachment; filename=invoice-${order._id}.pdf`
);


doc.pipe(res);


// ===============================
// INVOICE HEADER
// ===============================
doc.fontSize(20).text("INVOICE", { align: "center" });
doc.moveDown();


doc.fontSize(12).text(`Order ID: ${order._id}`);
doc.text(`Customer: ${order.customerName}`);
doc.text(`Status: ${order.status}`);
doc.text(`Payment: ${order.paymentStatus}`);
doc.moveDown();


// ===============================
// ITEMS
// ===============================
doc.text("Items:");
doc.moveDown();


order.items.forEach((item, index) => {
doc.text(
`${index + 1}. ${item.product.name} - Qty: ${item.quantity} - Price: ${item.price}`
);
});


doc.moveDown();


// ===============================
// TOTAL
// ===============================
doc.fontSize(14).text(`Total Amount: ₹${order.totalAmount}`, {
align: "right"
});


doc.end();


} catch (error) {
res.status(500).json({
success: false,
message: "Failed to generate invoice",
error: error.message
});
}
};

module.exports = {
createOrder,
getOrders,
getOrderById,
updateOrderStatus,
cancelOrder,
updatePaymentStatus,
generateInvoice
};