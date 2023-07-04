const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    value: {
      type: Number,
      requird: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enums: ["add", "move", "subtract"],
    },
  },
  { timestamps: true }
);

const TransactionModel = mongoose.model("Transaction", TransactionSchema);

module.exports = mongoose.models.Transaction || TransactionModel;
