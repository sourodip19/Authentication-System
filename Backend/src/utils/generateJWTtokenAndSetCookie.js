import jwt from "jsonwebtoken";
const generateJWTtokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  res.cookie("Token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
  return token;
};

export default generateJWTtokenAndSetCookie;
