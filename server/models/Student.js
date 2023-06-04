const mongoose = require("../database/connection");

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  studentNumber: {
    type: String,
    required: true,
    unique: true,
  },
  meliCode: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
});

const StudentModel = mongoose.model("Student", StudentSchema);

module.exports = mongoose.models.Student || StudentModel;
