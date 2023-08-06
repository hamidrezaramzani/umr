const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);
