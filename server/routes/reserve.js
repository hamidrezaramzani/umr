const express = require("express");
const { reserveMenuItem, getAllReserved } = require("../controllers/reserve");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/reserve-menu/:id", authMiddleware("student"), reserveMenuItem);
router.get("/all", authMiddleware("student"), getAllReserved);
module.exports = router;
