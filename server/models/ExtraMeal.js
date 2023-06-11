const mongoose = require("../database/connection");

const Schema = mongoose.Schema;

const ExtraMealSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

const ExtraMealModel = mongoose.model("ExtraMeal", ExtraMealSchema);

module.exports = mongoose.models.ExtraMeal || ExtraMealModel;
