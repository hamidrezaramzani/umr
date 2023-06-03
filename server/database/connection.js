const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../", ".env"),
});
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URI).then((db) => {
  // eslint-disable-next-line no-console
  console.log("Database connected to " + db.connection.db.databaseName);
});

module.exports = mongoose;
