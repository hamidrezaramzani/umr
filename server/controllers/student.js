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

module.exports = {
  addStudent,
};
