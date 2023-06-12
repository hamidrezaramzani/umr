const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExtraMealSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.ExtraMeal || mongoose.model("ExtraMeal", ExtraMealSchema);
