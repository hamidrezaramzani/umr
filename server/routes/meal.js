const express = require("express");
const { addMeal } = require("../controllers/meal");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add-meal", authMiddleware("admin"), addMeal);

module.exports = router;
