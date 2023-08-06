const express = require("express");
const {
  getUserNotifications,
  seenNotification,
} = require("../controllers/notification");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/user", authMiddleware("student"), getUserNotifications);
router.get("/seen/:id", authMiddleware("student"), seenNotification);
module.exports = router;
