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
    isMovedToSale: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Reserve || mongoose.model("Reserve", ReserveSchema);
