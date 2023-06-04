const express = require("express");
const { addStudent, allStudents } = require("../controllers/student");
const authMiddleware = require("../middlewares/authMiddleware");
const addStudentValidator = require("../validators/auth/loginValidator");
const router = express.Router();

router.post("/add", addStudentValidator, authMiddleware("admin"), addStudent);
router.get("/all", authMiddleware("admin"), allStudents);

module.exports = router;
