const Student = require("../models/Student");
const generateHashedPassword = require("../helpers/generateHashedPassword");
const addStudent = async (req, res) => {
  try {
    const body = req.body;
    body.password = await generateHashedPassword(body.meliCode);
    await Student.create(body);
    return res.status(201).json({
      message: "student created",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const allStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    await Student.deleteOne({ _id: id });
    return res.status(200).json({
      message: "student deleted",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getOneStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findOne({ _id: id });
    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const editStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    await Student.updateOne({ _id: id }, body);
    return res.status(200).json({
      message: "student updated",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  addStudent,
  allStudents,
  deleteStudent,
  getOneStudent,
  editStudent,
};
