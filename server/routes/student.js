const express = require("express");
const {
  addStudent,
  allStudents,
  deleteStudent,
} = require("../controllers/student");
const authMiddleware = require("../middlewares/authMiddleware");
const addStudentValidator = require("../validators/student/addStudentValidator");
const deleteStudentValidator = require("../validators/student/deleteStudentValidator");
const router = express.Router();

router.post("/add", addStudentValidator, authMiddleware("admin"), addStudent);
router.get("/all", authMiddleware("admin"), allStudents);
router.delete(
  "/delete/:id",
  deleteStudentValidator,
  authMiddleware("admin"),
  deleteStudent,
);

module.exports = router;
