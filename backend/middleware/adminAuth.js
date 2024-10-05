import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized,try again." });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Unauthorized,try again." });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default adminAuth;
