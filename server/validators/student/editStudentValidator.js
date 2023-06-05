const { body } = require("express-validator");

module.exports = [
  body("meliCode").notEmpty().withMessage("meliCode should not be message"),
  body("studentNumber")
    .notEmpty()
    .withMessage("studentNumber should not be message"),
  body("birthday").notEmpty().withMessage("birthday should not be message"),
  body("fullName").notEmpty().withMessage("fullName should not be message"),
];
