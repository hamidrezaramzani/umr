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
const mealTimeRoutes = require("./routes/mealTime");
const extraMealRoutes = require("./routes/extraMeal");
const menuRoutes = require("./routes/menu");
const panelRoutes = require("./routes/panel");
const reserveRoutes = require("./routes/reserve");
const saleRoutes = require("./routes/sale");
const notificationRoutes = require("./routes/notification");
require("./database/connection");
const start = () => {
  const app = express();
  const PORT = process.env.PORT || 5000;
  app.use(bodyParser.json());
  app.use(cors());
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );
  app.use(morgan("dev"));
  app.use(fileUpload());
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/student", studentRoutes);
  app.use("/api/v1/meal", mealRoutes);
  app.use("/api/v1/mealTime", mealTimeRoutes);
  app.use("/api/v1/extraMeal", extraMealRoutes);
  app.use("/api/v1/menu", menuRoutes);
  app.use("/api/v1/panel", panelRoutes);
  app.use("/api/v1/reserve", reserveRoutes);
  app.use("/api/v1/sale", saleRoutes);
  app.use("/api/v1/notification", notificationRoutes);
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log("Server running at port ", PORT);
  });
};

start();
