const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VoteSchema = new Schema(
  {
    meal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
    },
    voter: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const VoteModel = mongoose.model("Vote", VoteSchema);

module.exports = mongoose.models.Vote || VoteModel;
