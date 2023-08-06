const Notification = require("../models/Notifications");
const getUserNotifications = async (req, res) => {
  try {
    const userId = req.currentUser.id;
    const notifications = await Notification.find({
      user: userId,
      seen: false,
    });
    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

const seenNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);
    await Notification.findByIdAndUpdate(id, { seen: true });
    return res.status(200).json(notification);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

module.exports = {
  getUserNotifications,
  seenNotification,
};
