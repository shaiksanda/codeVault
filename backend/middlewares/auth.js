const jwt = require("jsonwebtoken");
const BlacklistToken = require("../models/blacklist")

const authenticateUser = async(req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const isBlacklisted = await BlacklistToken.findOne({ token })

    if (isBlacklisted) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticateUser;
