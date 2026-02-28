import jwt from "jsonwebtoken";
const protectRoute = (req, res, next) => {
  try {
    const token = req.cookies.Token;
    if (!token) {
      return res.status(404).json({ message: "Token not found ! Login first" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(404).json({ message: "Invalid Token" });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res
      .status(501)
      .json({ message: "Error in protectRoute middleware" });
  }
};

export default protectRoute;
