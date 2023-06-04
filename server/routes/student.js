const express = require("express");
const { addStudent } = require("../controllers/student");
const authMiddleware = require("../middlewares/authMiddleware");
const addStudentValidator = require("../validators/auth/loginValidator");

const router = express.Router();

router.post("/add", addStudentValidator, authMiddleware("admin"), addStudent);

module.exports = router;
