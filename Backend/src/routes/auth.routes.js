import express from "express";
import {
  signUp,
  login,
  logOut,
  resetPassword,
  verifyEmail,
  forgotPassword,
  checkAuth,
} from "../controllers/auth.controllers.js";
import protectRoute from "../middleware/protectRoute.js";
const authRouter = express.Router();
authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:id", resetPassword);
authRouter.use(protectRoute);
authRouter.get("/verify-user", protectRoute, checkAuth);
authRouter.post("/logout", logOut);

export default authRouter;
