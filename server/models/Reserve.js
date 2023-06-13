const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReserveSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    menu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Reserve || mongoose.model("Reserve", ReserveSchema);
