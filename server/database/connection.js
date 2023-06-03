require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URI).then((db) => {
  // eslint-disable-next-line no-console
  console.log("Database connected to " + db.connection.db);
});

module.exports = mongoose;
