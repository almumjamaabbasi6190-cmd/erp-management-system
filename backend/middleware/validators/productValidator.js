const { body } = require("express-validator");

exports.productValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("price").isNumeric().withMessage("Price must be number"),
  body("stock").isNumeric().withMessage("Stock must be number"),
];