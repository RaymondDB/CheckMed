const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "clave123";

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ success: false, message: "Token requerido" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Lo puedes usar en tus rutas
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: "Token inválido o expirado" });
  }
}

module.exports = authMiddleware;
