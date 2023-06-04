const jwt = require("jsonwebtoken");

function authMiddleware(userType) {
  return function (req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ error: "Not authorized" });
      return;
    }

    // const token = token.split(" ")[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (payload.type !== userType) {
        res.status(403).json({ error: "Forbidden" });
        return;
      }
      req.currentUser = payload;
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };
}

module.exports = authMiddleware;
