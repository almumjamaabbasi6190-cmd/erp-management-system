const sendEmail = async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    // Mock email sending
    res.status(200).json({
      success: true,
      message: "Email sent successfully (mock)",
      to,
      subject,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendEmail };