const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateHashedPassword = require("../helpers/generateHashedPassword");
const Transaction = require("../models/Transaction");
const { getPanelValues } = require("./panel");

const login = async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findOne({ meliCode: body.meliCode });
    if (!user) {
      return res.status(401).json({
        message: "meliCode or password is invalid",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "meliCode or password is invalid",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        type: user.type,
      },
      process.env.JWT_SECRET
    );
    return res.status(200).json({
      message: "login successfully",
      user: {
        id: user._id,
        type: user.type,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const addStudent = async (req, res) => {
  try {
    const body = req.body;
    body.password = await generateHashedPassword(body.meliCode);
    body.type = "student";
    await User.create(body);
    return res.status(201).json({
      message: "student created",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const allStudents = async (req, res) => {
  try {
    const students = await User.find({ type: "student" });
    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({
      message: "user deleted",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getOneStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await User.findOne({ _id: id });
    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const editStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    await User.updateOne({ _id: id }, body);
    return res.status(200).json({
      message: "user updated",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const addBalance = async (req, res) => {
  try {
    const value = req.params.value;
    const userId = req.currentUser.id;
    await Transaction.create({
      value,
      user: userId,
      type: "add",
      date: new Date(),
    });
    const user = await User.findOne({ _id: userId });
    await User.findByIdAndUpdate(userId, {
      $set: {
        balance: user.balance + Number(value),
      },
    });
    return getPanelValues(req, res);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  login,
  addStudent,
  allStudents,
  deleteStudent,
  getOneStudent,
  editStudent,
  addBalance,
};
