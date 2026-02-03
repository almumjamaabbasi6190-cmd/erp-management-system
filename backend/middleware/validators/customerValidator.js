const { body } = require("express-validator");

exports.customerValidation = [
  body("name").notEmpty().withMessage("Customer name is required"),
  body("email").optional().isEmail().withMessage("Enter a valid email"),
  body("phone").notEmpty().withMessage("Phone is required"),
  body("address").notEmpty().withMessage("Address is required"),
];