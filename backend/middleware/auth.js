const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Vérifie si le header Authorization contient "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Récupère le token après "Bearer"
      token = req.headers.authorization.split(" ")[1];
      console.log("Token reçu :", token);

      // Vérifie et décode le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Payload décodé :", decoded);

      // Récupère l'utilisateur (sans le mot de passe) et attache à req.user
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error("Erreur lors de la vérification du token :", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
