const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SaleSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    menu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
    },
    isSoldOut: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Sale || mongoose.model("Sale", SaleSchema);
