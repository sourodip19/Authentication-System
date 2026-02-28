import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import generateJWTtokenAndSetCookie from "../utils/generateJWTtokenAndSetCookie.js";
import {
  resetPasswordSuccessful,
  sendForgotPasswordEmail,
  sendVerificationCodeToEmail,
  sendWelcomeEmail,
} from "../services/email.service.js";
export const signUp = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    if (!email || !password || !name) {
      return res
        .status(401)
        .json({ message: "All fields are required to create an account" });
    }
    const isExist = await userModel.findOne({ email });
    if (isExist) {
      return res
        .status(401)
        .json({ message: "Email already present ! Login Instead" });
    }
    const hash = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      10000 + Math.random() * 90000,
    ).toString();
    const user = await userModel.create({
      email,
      name,
      password: hash,
      verificationToken,
      verificationTokenExpiary: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    await sendVerificationCodeToEmail(verificationToken, user.email);
    return res.status(201).json({
      message: "OTP sent successfully",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Error in signUp controller" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await userModel.findOne({
      email: email,
      verificationToken: code,
      verificationTokenExpiary: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or otp not matched or otp expired " });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiary = undefined;
    user.lastLogin = Date.now();
    await user.save();
    await sendWelcomeEmail(user.name, user.email);
    const token = generateJWTtokenAndSetCookie(res, user._id);
    return res.status(200).json({ message: "Your email is verified", token });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Error in verifyEmail controller" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(401).json({ message: "Password do not match" });
    }
    const token = generateJWTtokenAndSetCookie(res, user._id);
    user.lastLogin = Date.now();
    await user.save();
    return res.status(200).json({ message: "You are logged in", token });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Error in login controller" });
  }
};
export const logOut = async (req, res) => {
  try {
    res.clearCookie("Token");
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Error in logOut controller" });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiary = Date.now() + 1 * 60 * 60 * 1000;
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiary = resetTokenExpiary;
    await user.save();
    await sendForgotPasswordEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`,
    );
    res
      .status(200)
      .json({ message: "Reset password link has been sent to your gmail" });
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ message: "Error in forgot-password controller" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { id: resetToken } = req.params;
    const user = await userModel.findOne({
      resetPasswordToken: resetToken,
      resetPasswordTokenExpiary: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        message: "Token invalid or expired",
      });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiary = undefined;
    await user.save();
    await resetPasswordSuccessful(user.email);
    res.status(200).json({ message: "Password reset and done and email sent" });
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ message: "Error in reset-password controller" });
  }
};

export const checkAuth = async(req,res)=>{
  try {
    const user = await userModel.findById(req.userId).select('-password');
    if(!user)
    {
  return res.status(404).json({ message: "User not found" });     
    }
    return res.status(200).json({user});
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Error in checkAuth controller" });   
  }
};