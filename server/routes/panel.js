const express = require("express");
const { getPanelValues } = require("../controllers/panel");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/panel-values", authMiddleware("student"), getPanelValues);

module.exports = router;
