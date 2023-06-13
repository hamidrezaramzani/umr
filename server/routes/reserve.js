const express = require("express");
const {
  reserveMenuItem,
  getAllReserved,
  getTodayReserves,
} = require("../controllers/reserve");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/reserve-menu/:id/:mealTimeId", authMiddleware("student"), reserveMenuItem);
router.get("/all", authMiddleware("student"), getAllReserved);
router.get("/today", authMiddleware("student"), getTodayReserves);
module.exports = router;
