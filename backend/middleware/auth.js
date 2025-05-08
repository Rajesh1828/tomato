const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  const token = authHeader.split(" ")[1]; // ✅ Extract token from "Bearer <token>"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id; // or req.userId = decoded.id (both are valid)
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = { authMiddleware };
