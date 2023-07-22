const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../", ".env"),
});
const mongoose = require("mongoose");
const isProduction =
  process.env.NODE_ENV && process.env.NODE_ENV === "production";
const URI = !isProduction
  ? process.env.DEVELOPMENT_DB_URI
  : `mongodb+srv://hamidrezaramzani:${encodeURIComponent(
      process.env.DB_PASSWORD
    )}@cluster0.wmowe.mongodb.net/${process.env.DB_NAME}?retryWrites=true;`;
mongoose.connect(URI).then((db) => {
  // eslint-disable-next-line no-console
  console.log("Database connected to " + db.connection.db.databaseName);
});

module.exports = mongoose;
