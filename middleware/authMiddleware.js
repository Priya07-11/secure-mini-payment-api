const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    logger("Missing token attempt");
    return res.status(403).json({ message: "Access denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    logger("Invalid token usage");
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticate;
