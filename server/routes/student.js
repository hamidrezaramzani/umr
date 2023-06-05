const express = require("express");
const {
  addStudent,
  allStudents,
  deleteStudent,
  getOneStudent,
  editStudent,
} = require("../controllers/student");
const authMiddleware = require("../middlewares/authMiddleware");
const addStudentValidator = require("../validators/student/addStudentValidator");
const editStudentValidator = require("../validators/student/editStudentValidator");
const deleteStudentValidator = require("../validators/student/deleteStudentValidator");
const router = express.Router();

router.post("/add", addStudentValidator, authMiddleware("admin"), addStudent);
router.get("/all", authMiddleware("admin"), allStudents);
router.get("/one/:id", authMiddleware("admin"), getOneStudent);
router.put(
  "/edit/:id",
  editStudentValidator,
  authMiddleware("admin"),
  editStudent
);
router.delete(
  "/delete/:id",
  deleteStudentValidator,
  authMiddleware("admin"),
  deleteStudent
);

module.exports = router;
