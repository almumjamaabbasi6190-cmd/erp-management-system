// controllers/paymentController.js

const createPayment = async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    // Fake payment success
    res.status(200).json({
      success: true,
      message: "Payment processed successfully (mock)",
      amount,
      orderId,
      paymentId: "PAY_" + Date.now(),
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPayment };