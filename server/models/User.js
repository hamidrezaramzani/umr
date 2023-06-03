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
  },
  meliCode: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [ "user", "admin" ],
    required: true,
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = mongoose.models.User || UserModel;
