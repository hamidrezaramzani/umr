require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");
const mealRoutes = require("./routes/meal");
const fileUpload = require("express-fileupload");
const path = require("path");
const start = () => {
  const app = express();
  const PORT = process.env.PORT || 5000;
  app.use(bodyParser.json());
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(fileUpload());
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/student", studentRoutes);
  app.use("/api/v1/meal", mealRoutes);
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log("Server running at port ", PORT);
  });
};

start();
