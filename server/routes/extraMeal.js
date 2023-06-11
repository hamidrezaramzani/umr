const express = require("express");
const { addExtraMeal, getAllExtraMeals } = require("../controllers/extraMeal");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware("admin"), addExtraMeal);
router.get("/all", authMiddleware("admin"), getAllExtraMeals);

module.exports = router;
