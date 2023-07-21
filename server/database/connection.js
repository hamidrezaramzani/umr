const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../", ".env"),
});
const mongoose = require("mongoose");
const URI =
  process.env.NODE_ENV === "development"
    ? process.env.DEVELOPMENT_DB_URI
    : `mongodb+srv://hamidrezaramzani:${encodeURIComponent(
        process.env.DB_PASSWORD
      )}@cluster0.wmowe.mongodb.net/?retryWrites=true&w=majority;`;
mongoose.connect(URI).then((db) => {
  // eslint-disable-next-line no-console
  console.log("Database connected to " + db.connection.db.databaseName);
});

module.exports = mongoose;
