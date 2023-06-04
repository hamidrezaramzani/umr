const { body } = require("express-validator");

module.exports = [
  body("meliCode")
    .notEmpty()
    .withMessage("meliCode should not be message"),
  body("password").notEmpty().withMessage("password should not be message"),
];
