const { query } = require("express-validator");

module.exports = [ query("id").notEmpty().withMessage("id should not be empty") ];
