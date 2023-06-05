const express = require("express");
const { addMeal, allMeals, deleteMeal } = require("../controllers/meal");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add-meal", authMiddleware("admin"), addMeal);
router.get("/all", authMiddleware("admin"), allMeals);
router.delete("/delete/:id", authMiddleware("admin"), deleteMeal);

module.exports = router;
