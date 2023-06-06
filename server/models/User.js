const mongoose = require("../database/connection");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
  },
  type: {
    type: String,
    enum: ["student", "admin"],
    required: true,
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = mongoose.models.User || UserModel;
