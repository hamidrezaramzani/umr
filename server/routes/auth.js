const express = require("express");
const { login } = require("../controllers/user");
const loginValidator = require("../validators/auth/loginValidator");

const router = express.Router();

router.post("/login", loginValidator, login);

module.exports = router;
