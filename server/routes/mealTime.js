const express = require("express");
const {
  addMealTime,
  getAllMealTimes,
  deleteMealTime,
  getSingleMealTime,
  editMealTime
} = require("../controllers/mealTime");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware("admin"), addMealTime);
router.get("/all", authMiddleware("admin"), getAllMealTimes);
router.get("/one/:id", authMiddleware("admin"), getSingleMealTime);
router.put("/edit/:id", authMiddleware("admin"), editMealTime);
router.delete("/delete/:id", authMiddleware("admin"), deleteMealTime);

module.exports = router;
