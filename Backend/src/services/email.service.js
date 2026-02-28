import nodemailer from "nodemailer";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationCodeToEmail = async (verificationToken, email) => {
  try {
    const response = await transporter.sendMail({
      from: `Authentication team <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Verification Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken,
      ),
      category: "Email Verification",
    });
    console.log("Email sent successfully ", response);
  } catch (error) {
    throw new Error("Error sending verification email: " + error.message);
  }
};

export const sendWelcomeEmail = async (name, email) => {
  try {
    const response = await transporter.sendMail({
      from: `Authentication team <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Welcome 🎉",
      html: WELCOME_EMAIL_TEMPLATE.replace("{{username}}", name).replace(
        "{{username}}",
        name,
      ),
    });
    console.log("Email sent successfully ", response);
  } catch (error) {
    throw new Error("Error sending verification email: " + error.message);
  }
};

export const sendForgotPasswordEmail = async (email, token) => {
  try {
    const response = await transporter.sendMail({
      from: `Authentication team <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Reset Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", token),
    });
    console.log("Forgot Password email sent successfull", response);
  } catch (error) {
    throw new Error("Error sending verification email: " + error.message);
  }
};

export const resetPasswordSuccessful = async (email) => {
  try {
    const response = await transporter.sendMail({
      from: `Authentication team <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Your password reset has been successful 🎉",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });
    console.log("Reset password email sent successfully", response);
  } catch (error) {
    throw new Error("Error sending verification email: " + error.message);
  }
};
