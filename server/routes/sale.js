const express = require("express");
const { toggleSale, buySaleItem } = require("../controllers/sale");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/toggle/:reserveId", authMiddleware("student"), toggleSale);
router.get("/buy/:saleId", authMiddleware("student"), buySaleItem);
module.exports = router;
